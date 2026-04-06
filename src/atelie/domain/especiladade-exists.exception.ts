import { BadRequestException } from "@nestjs/common";

export class EspecialidadeExistsException extends BadRequestException {
    constructor() {
        super('Especialidade inválida ou excede o limite de caracteres');
    }
}