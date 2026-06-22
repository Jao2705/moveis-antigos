import { LastAdminException } from '../domain/user.exceptions';
import { User } from '../domain/user';
import { UsersService } from './users.service';
import { UserRepositoryPort } from './ports/user.repository.port';

describe('UsersService', () => {
  let service: UsersService;
  let userRepo: jest.Mocked<UserRepositoryPort>;

  beforeEach(() => {
    userRepo = {
      create: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      countAdmins: jest.fn(),
    };

    service = new UsersService(userRepo);
    userRepo.update.mockImplementation(async (user) => user);
  });

  it('promove um usuário comum a administrador', async () => {
    const user = new User(1, 'Maria', 'maria@exemplo.com', 'hash', 'user', true);
    userRepo.findById.mockResolvedValue(user);

    const result = await service.setRole(1, 'admin');

    expect(userRepo.findById).toHaveBeenCalledWith(1);
    expect(userRepo.countAdmins).not.toHaveBeenCalled();
    expect(userRepo.update).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, role: 'admin' }),
    );
    expect(result.role).toBe('admin');
  });

  it('rebaixa um administrador quando ainda existe outro admin', async () => {
    const user = new User(2, 'João', 'joao@exemplo.com', 'hash', 'admin', true);
    userRepo.findById.mockResolvedValue(user);
    userRepo.countAdmins.mockResolvedValue(2);

    const result = await service.setRole(2, 'user');

    expect(userRepo.countAdmins).toHaveBeenCalledTimes(1);
    expect(userRepo.update).toHaveBeenCalledWith(
      expect.objectContaining({ id: 2, role: 'user' }),
    );
    expect(result.role).toBe('user');
  });

  it('impede remover a role do único administrador', async () => {
    const user = new User(3, 'Admin', 'admin@exemplo.com', 'hash', 'admin', true);
    userRepo.findById.mockResolvedValue(user);
    userRepo.countAdmins.mockResolvedValue(1);

    await expect(service.setRole(3, 'user')).rejects.toThrow(LastAdminException);
    expect(userRepo.update).not.toHaveBeenCalled();
  });
});
