import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  dotenv.config({
    path: '/Users/mohamedibrahim/Nest js/simple-api/src/config.env',
  });
  app.use(compression());
  // app.use(cookieParser());
  app.setGlobalPrefix('api/v1');
  app.use(morgan('dev'));
  await app.listen(process.env.PORT, () =>
    console.log('The server is running'),
  );
}
bootstrap();
