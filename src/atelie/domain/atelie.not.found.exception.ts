export class AtelieNotFoundException extends Error {
    constructor(id: number) {
        super(`Atelie com id ${id} nao encontrado`);
    }
}
