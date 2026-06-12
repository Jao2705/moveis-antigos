"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EspecialidadeExistsException = void 0;
class EspecialidadeExistsException extends Error {
    getResponse;
    constructor() {
        super('Especialidade inválida ou excede o limite de caracteres');
    }
}
exports.EspecialidadeExistsException = EspecialidadeExistsException;
//# sourceMappingURL=especiladade-exists.exception.js.map