"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const all_exceptions_filter_1 = require("./shared/filters/all-exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.CORS_ORIGIN ?? 'http://localhost:4200',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        exceptionFactory: (validationErrors) => {
            const errors = {};
            for (const error of validationErrors) {
                const messages = error.constraints
                    ? Object.values(error.constraints)
                    : ['Valor inválido.'];
                errors[error.property] = messages[0];
            }
            return new common_1.BadRequestException({
                message: 'Existem campos inválidos no formulário.',
                errors,
            });
        },
    }));
    app.useGlobalFilters(new all_exceptions_filter_1.AppExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Relicário System')
        .setDescription('API de gerenciamento de ateliês e móveis antigos')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Auth')
        .addTag('Users')
        .addTag('atelie')
        .addTag('movel')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger-ui', app, document, {
        jsonDocumentUrl: 'swagger/json',
    });
    await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
//# sourceMappingURL=main.js.map