export class AreaExistsException extends Error {
    getResponse: any;
    constructor() {
        super('Área inválida');
    }
}