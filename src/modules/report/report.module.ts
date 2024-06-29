import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ProductModule } from '../product/product.module';
import { Users } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report, Users]), ProductModule],
  exports: [ReportService],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}