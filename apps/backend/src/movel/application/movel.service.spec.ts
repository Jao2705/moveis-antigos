import type { AtelieRepositoryPort } from 'src/atelie/application/ports/atelie.repository.port';
import { Atelie } from 'src/atelie/domain/atelie';
import { AtelieNaoEncontradoParaMovelException } from '../domain/movel.exceptions';
import { MovelTipoMovelInvalidoException } from '../domain/movel-type.exceptions';
import { MovelService } from './movel.service';
import type { MovelRepositoryPort } from './ports/movel.repository.port';

describe('MovelService', () => {
  let service: MovelService;
  let movelRepo: jest.Mocked<MovelRepositoryPort>;
  let atelieRepo: jest.Mocked<AtelieRepositoryPort>;

  beforeEach(() => {
    movelRepo = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      existsOpenByAtelieAndTipo: jest.fn(),
    };

    atelieRepo = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByIdWithMoveis: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    service = new MovelService(movelRepo, atelieRepo);
    movelRepo.create.mockImplementation(async (movel) => movel);
  });

  it('aceita um tipo de móvel comum com complemento de descrição', async () => {
    atelieRepo.findById.mockResolvedValue({
      id: 1,
      especialidadeEra: 'Restauro clássico',
      dataFundacao: '2020-01-01',
    } as Atelie);
    movelRepo.existsOpenByAtelieAndTipo.mockResolvedValue(false);

    const result = await service.create(
      'Sofá retrátil',
      '2024-01-10',
      false,
      50,
      1,
      99,
    );

    expect(movelRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({ tipoMovel: 'Sofá retrátil' }),
    );
    expect(result.tipoMovel).toBe('Sofá retrátil');
  });

  it('rejeita tipo de móvel com apenas caracteres especiais', async () => {
    atelieRepo.findById.mockResolvedValue({
      id: 1,
      especialidadeEra: 'Restauro clássico',
      dataFundacao: '2020-01-01',
    } as Atelie);

    await expect(
      service.create('*&%@', '2024-01-10', false, 50, 1, 99),
    ).rejects.toBeInstanceOf(MovelTipoMovelInvalidoException);
  });

  it('rejeita tipo de móvel fora da lista permitida', async () => {
    atelieRepo.findById.mockResolvedValue({
      id: 1,
      especialidadeEra: 'Restauro clássico',
      dataFundacao: '2020-01-01',
    } as Atelie);

    await expect(
      service.create('Cadeira antiga', '2024-01-10', false, 50, 1, 99),
    ).rejects.toBeInstanceOf(MovelTipoMovelInvalidoException);
  });

  it('mantém as demais validações intactas', async () => {
    atelieRepo.findById.mockResolvedValue(null);

    await expect(
      service.create('Mesa', '2024-01-10', false, 50, 1, 99),
    ).rejects.toBeInstanceOf(AtelieNaoEncontradoParaMovelException);
  });
});
