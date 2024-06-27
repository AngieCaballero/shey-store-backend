import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { ReportService } from './report.service';

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
}