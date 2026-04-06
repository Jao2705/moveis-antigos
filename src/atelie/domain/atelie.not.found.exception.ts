import { NotFoundException } from "@nestjs/common";

export class AtelieNotFoundException extends NotFoundException {
    constructor(id: number) {
        super(`Atelie com id ${id} nao encontrado`);
    }
}
