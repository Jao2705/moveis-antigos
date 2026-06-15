"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LastAdminException = exports.InvalidUserRoleException = exports.EmailAlreadyExistsException = exports.UserNotFoundException = void 0;
class UserNotFoundException extends Error {
    constructor(message = 'Usuário não encontrado') {
        super(message);
        this.name = 'UserNotFoundException';
    }
}
exports.UserNotFoundException = UserNotFoundException;
class EmailAlreadyExistsException extends Error {
    constructor(message = 'E-mail já cadastrado') {
        super(message);
        this.name = 'EmailAlreadyExistsException';
    }
}
exports.EmailAlreadyExistsException = EmailAlreadyExistsException;
class InvalidUserRoleException extends Error {
    constructor(message = 'Role inválida') {
        super(message);
        this.name = 'InvalidUserRoleException';
    }
}
exports.InvalidUserRoleException = InvalidUserRoleException;
class LastAdminException extends Error {
    constructor(message = 'Não é possível rebaixar ou remover o único administrador do sistema') {
        super(message);
        this.name = 'LastAdminException';
    }
}
exports.LastAdminException = LastAdminException;
//# sourceMappingURL=user.exceptions.js.map