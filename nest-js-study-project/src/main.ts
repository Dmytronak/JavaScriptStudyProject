import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('NestJs study project')
    .setDescription('The NestJs study project API description')
    .setVersion('1.0')
    .addBearerAuth()
    .setBasePath('api')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());


  await app.listen(3000);
}
bootstrap();
