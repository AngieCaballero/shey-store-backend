import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, MoreThanOrEqual, Repository } from 'typeorm'
import { Report } from './entities/report.entity';
import { Role } from '../users/enums/role.enum';
import { Users } from '../users/entities/users.entity';
import  * as tmp from 'tmp'
import * as XlsxPopulate from 'xlsx-populate'


@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private readonly reportRepository: Repository<Report>,
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
    @Inject(forwardRef(() => ProductService)) private readonly productService: ProductService,
  ) {
  }

  async getSalesStatisticsByDay(user_id: number) {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const sales = await this.reportRepository.find({
      where: {
        user_id: user_id,
        sold_at: MoreThanOrEqual(sevenDaysAgo)
      },
      select: {
        sold_at: true,
        quantity: true
      }
    });

    const salesMap = new Map();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      salesMap.set(dateString, { date: dateString, total_quantity: 0 });
    }

    sales.forEach(sale => {
      const dateString = sale.sold_at.toISOString().split('T')[0];
      if (salesMap.has(dateString)) {
        salesMap.get(dateString).total_quantity += sale.quantity;
      } else {
        salesMap.set(dateString, { date: dateString, total_quantity: sale.quantity });
      }
    });

    const result = Array.from(salesMap.values());

    result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return result;
  }

  async getSalesStatisticsByDayForUser(userId: number): Promise<any> {

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const sales = await this.reportRepository.find({
      where: {
        user_id: userId,
        sold_at: MoreThanOrEqual(sevenDaysAgo)
      },
      select: {
        sold_at: true,
        total_price: true,
        product_id: true
      }
    });

    const salesMap = new Map();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      salesMap.set(dateString, { date: dateString, total_price: 0 });
    }

    sales.forEach(sale => {
      const dateString = sale.sold_at.toISOString().split('T')[0];
      if (salesMap.has(dateString)) {
        salesMap.get(dateString).total_price += sale.total_price;
      } else {
        salesMap.set(dateString, { date: dateString, total_price: sale.total_price });
      }
    });

    const result = Array.from(salesMap.values());

    result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return result;
  }

  async getTopCategoriesByUser(userId: number): Promise<any> {
    const sales = await this.reportRepository.find({
      where: {
        user_id: userId,
      },
      select: {
        product_id: true,
        quantity: true,
        category_id: true
      },
    });

    const productSalesMap = new Map<string, number>();

    for (const sale of sales) {
      const product = await this.productService.findByIdWithoutCheck(sale.product_id)
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

  async getProductsSoldByUser(userId: number): Promise<any[]> {
    const sales = await this.reportRepository.find({
      where: { user_id: userId },
      select: ['product_id', 'quantity'],
    });

    const productSalesMap = await this.getProductSales(sales)

    const result = Object.keys(productSalesMap).map(productId => ({
      product_id: parseInt(productId),
      total_quantity: productSalesMap[productId],
    }));

    result.sort((a, b) => b.total_quantity - a.total_quantity);

    return result;
  }

  async getProductSales(sales: Report[]) {
    return sales.reduce((acc, sale) => {
      if (acc[sale.product_id]) {
        acc[sale.product_id] += sale.quantity;
      } else {
        acc[sale.product_id] = sale.quantity;
      }
      return acc;
    }, {});
  }

  async generateProductSoldGlobalExcel() {
    const data = await this.getProductsSoldGlobal()

    const workbook= await XlsxPopulate.fromBlankAsync()
    const sheet = workbook.sheet(0);

    data.forEach((item: any, index: number) => {
      const row = index + 2;
      sheet.cell(`B${row}`).value(item.date);
      sheet.cell(`C${row}`).value(item.count);
    });

    sheet.cell('B1').value('Fecha');
    sheet.cell('C1').value('Cantidad');

    return workbook.outputAsync()
  }

  async getProductsSoldGlobal(): Promise<any[]> {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const sales = await this.reportRepository.find({
      where: {
        sold_at: MoreThanOrEqual(sevenDaysAgo)
      },
      select: {
        sold_at: true,
        quantity: true
      }
    });

    const salesMap = new Map();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      salesMap.set(dateString, { date: dateString, total_quantity: 0 });
    }

    sales.forEach(sale => {
      const dateString = sale.sold_at.toISOString().split('T')[0];
      if (salesMap.has(dateString)) {
        salesMap.get(dateString).total_quantity += sale.quantity;
      } else {
        salesMap.set(dateString, { date: dateString, total_quantity: sale.quantity });
      }
    });

    const result = Array.from(salesMap.values());

    result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return result;
  }

  async generateTopCategoriesExcel(user_id: number) {
    const data = await this.getTopCategoriesByUser(user_id)

    const workbook= await XlsxPopulate.fromBlankAsync()
    const sheet = workbook.sheet(0);

    data.forEach((item: any, index: number) => {
      const row = index + 2;
      sheet.cell(`B${row}`).value(item.category);
      sheet.cell(`C${row}`).value(item.totalQuantity);
    });

    sheet.cell('B1').value('Categoría');
    sheet.cell('C1').value('Cantidad');

    return workbook.outputAsync()
  }

  async generateProductsSoldQuantity(user_id: number) {
    const data = await this.getSalesStatisticsByDay(user_id)

    const workbook= await XlsxPopulate.fromBlankAsync()
    const sheet = workbook.sheet(0);

    data.forEach((item: any, index: number) => {
      const row = index + 2;
      sheet.cell(`B${row}`).value(item.date);
      sheet.cell(`C${row}`).value(item.total_quantity);
    });

    sheet.cell('B1').value('Fecha');
    sheet.cell('C1').value('Cantidad');

    return workbook.outputAsync()
  }

  async generateIncome(user_id: number) {
    const data = await this.getSalesStatisticsByDayForUser(user_id)

    const workbook= await XlsxPopulate.fromBlankAsync()
    const sheet = workbook.sheet(0);

    data.forEach((item: any, index: number) => {
      const row = index + 2;
      sheet.cell(`B${row}`).value(item.date);
      sheet.cell(`C${row}`).value(`$${item.total_price.toFixed(2)}`);
    });

    sheet.cell('B1').value('Fecha');
    sheet.cell('C1').value('Ingresos');

    return workbook.outputAsync()
  }

  async generateUsersReportExcel() {
    const data = await this.usersReport()

    const workbook= await XlsxPopulate.fromBlankAsync()
    const sheet = workbook.sheet(0);

    data.forEach((item: any, index: number) => {
      const row = index + 2;
      sheet.cell(`B${row}`).value(item.date);
      sheet.cell(`C${row}`).value(item.count);
    });

    sheet.cell('B1').value('Fecha');
    sheet.cell('C1').value('Cantidad');

    return workbook.outputAsync()
  }

  async usersReport() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // 7 days ago

    const users = await this.usersRepository.find({
      where: {
        created_at: MoreThanOrEqual(sevenDaysAgo),
      },
      select: ['created_at'],
    });

    const countsMap = users.reduce((acc, user) => {
      const date = user.created_at.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {});

    const result = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo);
      date.setDate(sevenDaysAgo.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      result.push({
        date: dateString,
        count: countsMap[dateString] || 0,
      });
    }

    return result;
  }
}