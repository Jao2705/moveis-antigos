import { BadRequestException } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from '../application/users.service';
import { User } from '../domain/user';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: jest.Mocked<Pick<UsersService, 'setRole'>>;

  beforeEach(() => {
    usersService = {
      setRole: jest.fn(),
    };

    controller = new UsersController(usersService as unknown as UsersService);
  });

  it('bloqueia alteração da própria role', async () => {
    await expect(
      controller.updateRole({ user: { id: 10 } }, 10, { role: 'user' }),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(usersService.setRole).not.toHaveBeenCalled();
  });

  it('encaminha a atualização de role para o service', async () => {
    const user = new User(11, 'Admin', 'admin@exemplo.com', 'hash', 'admin', true);
    usersService.setRole.mockResolvedValue(user);

    const result = await controller.updateRole({ user: { id: 1 } }, 11, {
      role: 'admin',
    });

    expect(usersService.setRole).toHaveBeenCalledWith(11, 'admin');
    expect(result.role).toBe('admin');
    expect(result.id).toBe(11);
  });
});
