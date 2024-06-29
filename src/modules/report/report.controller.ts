import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { ReportService } from './report.service';
import { Users } from '../users/entities/users.entity';

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

  @Get('product-sold-count-by-user/:user_id')
  async getProductSoldCountByUser(@Param('user_id') user_id: string) {
    return await this.reportService.getProductsSoldByUser(+user_id)
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
}