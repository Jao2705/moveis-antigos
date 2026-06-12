"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const all_exceptions_filter_1 = require("./shared/filters/all-exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.useGlobalFilters(new all_exceptions_filter_1.AppExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Relicário System")
        .setDescription("API de gerenciamento de atelies e moveis")
        .setVersion("1.0")
        .addTag("atelie")
        .addTag("movel")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("swagger-ui", app, document, {
        jsonDocumentUrl: "swagger/json",
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map