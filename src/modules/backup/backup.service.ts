import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class BackupService {
  private readonly dbUser = process.env.POSTGRES_USER;
  private readonly dbHost = process.env.POSTGRES_HOST ;
  private readonly dbName = process.env.POSTGRES_DB;
  private readonly dbPassword = process.env.POSTGRES_PASSWORD;
  private readonly dbPort = process.env.POSTGRES_PORT;

  async createBackup(): Promise<string> {
    console.log(this.dbUser)
    return new Promise((resolve, reject) => {
      const backupFile = path.join(__dirname, `../../backup-${Date.now()}.sql`);
      const dumpCommand = 'pg_dump';
      const dumpArgs = ['-U', this.dbUser, '-h', this.dbHost, '-p', this.dbPort, '-d', this.dbName, '-F', 'c', '-b', '-v', '-f', backupFile];
      const env = { ...process.env, PGPASSWORD: this.dbPassword };

      const child = spawn(dumpCommand, dumpArgs, { env });

      child.stdout.on('data', (data) => {
        console.log(`pg_dump stdout: ${data}`);
      });

      child.stderr.on('data', (data) => {
        console.error(`pg_dump stderr: ${data}`);
      });

      child.on('error', (error) => {
        console.error(`Error executing pg_dump: ${error}`);
        reject(`Error executing pg_dump: ${error}`);
      });

      child.on('close', (code) => {
        if (code === 0) {
          console.log(`Backup created successfully: ${backupFile}`);
          resolve(backupFile);
        } else {
          console.error(`pg_dump process exited with code ${code}`);
          reject(`pg_dump process exited with code ${code}`);
        }
      });
    });
  }

  downloadBackup(backupFile: string): Buffer {
    return fs.readFileSync(backupFile);
  }
}
