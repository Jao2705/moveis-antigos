import { BadRequestException } from "@nestjs/common";

export class AreaExistsException extends BadRequestException {
    constructor() {
        super('Área inválida');
    }
}