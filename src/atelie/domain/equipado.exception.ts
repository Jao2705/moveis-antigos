import { BadRequestException } from "@nestjs/common";

export class EquipadoExistsExcepiton extends BadRequestException {
    constructor() {
        super('Campo equipado inválido');
    }
}