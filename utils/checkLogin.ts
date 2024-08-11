import { CronJob } from 'cron';
import { JwtService } from '@nestjs/jwt';
import { SchedulerRegistry } from '@nestjs/schedule';

export async function createCheckStayingLoginCronJob(
  token: string,
  jwtService: JwtService,
  schedulerRegistry: SchedulerRegistry,
  jobName: string = 'checkStayingLogin',
) {
  const job = new CronJob(
    '* * 1 * * *',
    async () =>
      await checkStayingLogin(
        token,
        job,
        jwtService,
        schedulerRegistry,
        jobName,
      ),
  );
  schedulerRegistry.addCronJob(jobName, job);
  job.start();
}

export async function checkStayingLogin(
  token: string,
  job: CronJob,
  jwtService: JwtService,
  schedulerRegistry: SchedulerRegistry,
  jobName: string,
) {
  try {
    await jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    console.log('stay logged in');
  } catch (error) {
    job.stop();
    schedulerRegistry.deleteCronJob(jobName);
    console.log('The user not logged in, logging out...', error.message);
  }
}
