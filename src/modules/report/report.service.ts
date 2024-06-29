import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { Role } from '../users/enums/role.enum';
import { Users } from '../users/entities/users.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private readonly reportRepository: Repository<Report>,
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
    @Inject(forwardRef(() => ProductService)) private readonly productService: ProductService,
  ) {
  }

  async getSalesStatisticsByDay(user_id: number) {
    const sales = await this.reportRepository.find({
      where: {
        user_id: user_id
      },
      select: {
        sold_at: true,
        quantity: true
      }
    });

    const groupedSales = sales.reduce((acc, sale) => {
      const date = sale.sold_at.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += sale.quantity;
      return acc;
    }, {});

    return Object.entries(groupedSales).map(([date, total_quantity]) => ({ date, total_quantity }));
  }

  async getSalesStatisticsByDayForUser(userId: number): Promise<any> {
    const sales = await this.reportRepository.find({
      where: {
        user_id: userId
      },
      select: {
        sold_at: true,
        total_price: true
      }
    });

    const groupedSales = sales.reduce((acc, sale) => {
      const date = sale.sold_at.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += sale.total_price;
      return acc;
    }, {});

    return Object.entries(groupedSales).map(([date, total_price]) => ({ date, total_price }));
  }

  async getTopCategoriesByUser(userId: number): Promise<any> {
    const sales = await this.reportRepository.find({
      where: {
        user_id: userId,
      },
      select: {
        product_id: true,
        quantity: true,
      },
    });

    const productSalesMap = new Map<string, number>();

    for (const sale of sales) {
      const product = await this.productService.findById(sale.product_id)
      if (product) {
        const category = product.category.name;
        if (!productSalesMap.has(category)) {
          productSalesMap.set(category, 0);
        }
        productSalesMap.set(category, productSalesMap.get(category) + sale.quantity);
      }
    }

    const result = Array.from(productSalesMap.entries()).map(([category, totalQuantity]) => ({
      category,
      totalQuantity,
    }));

    result.sort((a, b) => b.totalQuantity - a.totalQuantity);

    return result;
  }

  async usersReport() {
    return await this.usersRepository.find({
      where: [
        { role: Role.BUYER },
        { role: Role.SELLER }
      ],
      order: {
        role: 'DESC'
      }
    })
  }
}