import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Header, Param, Res } from '@nestjs/common';
import { ReportService } from './report.service';
import { Users } from '../users/entities/users.entity';
import { Response } from 'express';

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get('sale-quantity-by-day/user/:user_id')
  async getSalesStatisticsByDay(@Param('user_id') user_id: string) {
    return await this.reportService.getSalesStatisticsByDay(+user_id)
  }

  @Get('sale-income-by-day/user/:user_id')
  async getSalesStatisticsByUser(@Param('user_id') user_id: string) {
    return await this.reportService.getSalesStatisticsByDayForUser(+user_id)
  }

  @Get('top-categories-by-user/user/:user_id')
  async getTopCategoriesByUser(@Param('user_id') user_id: string) {
    return await this.reportService.getTopCategoriesByUser(+user_id)
  }

  @Get('product-sold-count-by-user/user/:user_id')
  async getProductSoldCountByUser(@Param('user_id') user_id: string) {
    return await this.reportService.getProductsSoldByUser(+user_id)
  }

  @Get('product-sold-global')
  async getProductSold() {
    return await this.reportService.getProductsSoldGlobal()
  }

  @ApiOkResponse({
    type: Users,
    isArray: true
  })
  @Get('users-report')
  async usersReport() {
    console.log('Seller')
    return await this.reportService.usersReport()
  }

  @Get('download-top-categories-report/user/:user_id')
  @Header('Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
  @Header('Content-Disposition', 'attachment; filename=top-categories-statistics.xlsx')
  async downloadTopCategories(@Param('user_id') user_id: string, @Res() res: Response) {
    let result = await this.reportService.generateTopCategoriesExcel(+user_id)
    return res.send(result)
  }

  @Get('download-products-sold-quantity-report/user/:user_id')
  @Header('Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
  @Header('Content-Disposition', 'attachment; filename=product-sold-statistics.xlsx')
  async downloadProductsSoldQuantity(@Param('user_id') user_id: string, @Res() res: Response) {
    let result = await this.reportService.generateProductsSoldQuantity(+user_id)
    return res.send(result)
  }

  @Get('download-income-report/user/:user_id')
  @Header('Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
  @Header('Content-Disposition', 'attachment; filename=income-statistics.xlsx')
  async downloadIncome(@Param('user_id') user_id: string, @Res() res: Response) {
    let result = await this.reportService.generateIncome(+user_id)
    return res.send(result)
  }
}