import { Controller, Get, Res } from '@nestjs/common';
import { BackupService } from './backup.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Backup')
@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Get()
  async createBackup(@Res() res: Response): Promise<void> {
    try {
      const backupFile = await this.backupService.createBackup();
      const fileBuffer = this.backupService.downloadBackup(backupFile);

      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="backup-${Date.now()}.sql"`,
      });

      res.send(fileBuffer);
    } catch (error) {
      res.status(500).send(`Error creating backup: ${error}`);
    }
  }
}
