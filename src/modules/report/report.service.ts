import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private readonly reportRepository: Repository<Report>
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
}