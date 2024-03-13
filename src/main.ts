import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //9.Setup Swagger
  //9.1 Setup Document cho Swagger
  const config = new DocumentBuilder()
  .setTitle("Node38_Capstone_Movie_NestJS")
  .setDescription("List Movie APIs")
  .setVersion("1.0")
  .addBearerAuth()
  .build()

  const swagger = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("swagger",app,swagger);

  await app.listen(3000);
}
bootstrap();
