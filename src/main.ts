import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  dotenv.config({
    path: '/Users/mohamedibrahim/Nest js/simple-api/src/config.env',
  });
  app.use(morgan('dev'));
  await app.listen(process.env.PORT, () =>
    console.log('The server is running'),
  );
}
bootstrap();
