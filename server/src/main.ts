import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.use(cookieParser());
  await app.listen(process.env.PORT || 5005, () => {
    console.log('listening to port', process.env.PORT || 5005);
  });
}
bootstrap();
