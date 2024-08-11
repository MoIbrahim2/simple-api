import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('addUser')
export class AddUserConsumer extends WorkerHost {
  async process(job: Job, token?: string): Promise<any> {
    setTimeout(() => {
      console.log(job.data);
    }, 5000);
  }
}
