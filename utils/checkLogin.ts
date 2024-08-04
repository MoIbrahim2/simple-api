import { CronJob } from 'cron';
import { JwtService } from '@nestjs/jwt';
import { SchedulerRegistry } from '@nestjs/schedule';

const jwtService = new JwtService();
const schedulerRegistry = new SchedulerRegistry();
export async function checkStayingLogin(token, job) {
  try {
    await jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    console.log('stay loged in');
  } catch (error) {
    job.stop();
    schedulerRegistry.deleteCronJob('checkStayingLogin');
    console.log('The user not logged in, logging out...');
  }
}
export async function createCheckStayingLoginCronJob(token) {
  const job = new CronJob(
    '*/10 * * * * *',
    async () => await checkStayingLogin(token, job),
  );
  schedulerRegistry.addCronJob('checkStayingLogin', job);
  job.start();
}
