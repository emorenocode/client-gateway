import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from 'src/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from 'src/common';

async function bootstrap() {
  const logger = new Logger('Client Gateway: Main');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new RpcCustomExceptionFilter());
  await app.listen(envs.port);
  console.log('Hola mundo 2')
  logger.log(`Server is running on ${envs.port}`);
}
bootstrap();
