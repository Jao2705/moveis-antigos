import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { AppExceptionFilter } from "./shared/filters/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AppExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle("moveisantigosv2")
    .setDescription("API de gerenciamento de atelies e moveis")
    .setVersion("1.0")
    .addTag("atelie")
    .addTag("movel")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger-ui", app, document, {
    jsonDocumentUrl: "swagger/json",
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
