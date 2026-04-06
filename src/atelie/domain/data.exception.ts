import { BadRequestException } from "@nestjs/common";

export class DataException extends BadRequestException {
    constructor(data: Date) {
        super(`A data ${data} é inválida`);
    }
}