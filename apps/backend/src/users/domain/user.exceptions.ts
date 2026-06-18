export class UserNotFoundException extends Error {
  constructor(message = 'Usuário não encontrado') {
    super(message);
    this.name = 'UserNotFoundException';
  }
}

export class EmailAlreadyExistsException extends Error {
  constructor(message = 'E-mail já cadastrado') {
    super(message);
    this.name = 'EmailAlreadyExistsException';
  }
}

export class InvalidUserRoleException extends Error {
  constructor(message = 'Role inválida') {
    super(message);
    this.name = 'InvalidUserRoleException';
  }
}

export class LastAdminException extends Error {
  constructor(
    message = 'Não é possível rebaixar ou remover o único administrador do sistema',
  ) {
    super(message);
    this.name = 'LastAdminException';
  }
}
