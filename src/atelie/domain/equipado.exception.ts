export class EquipadoExistsExcepiton extends Error {
    getResponse: any;
    constructor() {
        super('Campo equipado inválido');
    }
}