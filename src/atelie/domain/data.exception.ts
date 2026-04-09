export class DataException extends Error {
    getResponse: any;
    constructor(data: Date) {
        super(`A data ${data} é inválida`);
    }
}