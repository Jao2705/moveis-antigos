export class EspecialidadeExistsException extends Error {
    getResponse: any;
    constructor() {
        super('Especialidade inválida ou excede o limite de caracteres');
    }
}