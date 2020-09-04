import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import * as haversine from 'haversine';
const start = {
  latitude: 30.849635,
  longitude: -83.24559,
};

const end = {
  latitude: 27.950575,
  longitude: -82.457178,
};

console.log(haversine(start, end, { unit: 'kilometer' }));
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.use(cookieParser());
  dotenv.config();
  await cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  await app.listen(process.env.PORT || 5000, () => {
    console.log('listening to port', process.env.PORT || 5000);
  });
}
bootstrap();
