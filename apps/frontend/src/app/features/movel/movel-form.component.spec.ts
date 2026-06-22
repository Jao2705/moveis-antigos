import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { AtelieApiService } from '../../core/atelie-api.service';
import { MovelApiService } from '../../core/movel-api.service';
import { MovelFormComponent } from './movel-form.component';

describe('MovelFormComponent', () => {
  let fixture: ComponentFixture<MovelFormComponent>;
  let component: MovelFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovelFormComponent],
      providers: [
        provideRouter([]),
        {
          provide: AtelieApiService,
          useValue: {
            getById: jasmine.createSpy().and.returnValue(
              of({
                id: 1,
                especialidadeEra: 'Restauro clássico',
                dataFundacao: '2020-01-01',
                equipadoCompleto: true,
                areaOficinaM2: 100,
              }),
            ),
          },
        },
        {
          provide: MovelApiService,
          useValue: {
            getById: jasmine.createSpy().and.returnValue(of(null)),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            user: signal(null),
            isAdmin: signal(false),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'atelieId' ? '1' : null),
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovelFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('aceita um tipo de móvel comum com complemento de texto', () => {
    const control = component.form.get('tipoMovel');
    control?.setValue('Mesa de centro redonda');
    control?.markAsTouched();

    expect(component.fieldError('tipoMovel')).toBeNull();
  });

  it('rejeita um tipo de móvel formado apenas por caracteres especiais', () => {
    const control = component.form.get('tipoMovel');
    control?.setValue('*&%@');
    control?.markAsTouched();

    expect(component.fieldError('tipoMovel')).toBe(
      'Informe um tipo de móvel comum, como Sofá, Mesa de centro, Rack, Estante ou Cama.',
    );
  });

  it('rejeita um tipo sem item comum na descrição', () => {
    const control = component.form.get('tipoMovel');
    control?.setValue('Cadeira antiga');
    control?.markAsTouched();

    expect(component.fieldError('tipoMovel')).toBe(
      'Informe um tipo de móvel comum, como Sofá, Mesa de centro, Rack, Estante ou Cama.',
    );
  });

  it('mantém a mensagem genérica e destaca os campos inválidos no submit', () => {
    component.submit();

    expect(component.errorMessage()).toBe('Corrija os campos inválidos.');
    expect(component.fieldErrors()['tipoMovel']).toBe(
      'O tipo do móvel é obrigatório.',
    );
    expect(component.fieldErrors()['dataInicioTrab']).toBe(
      'A data de início é obrigatória.',
    );
  });

  it('exibe ao mesmo tempo o erro de data anterior e horas-homem inválidas', () => {
    component.form.patchValue({
      tipoMovel: 'Mesa',
      dataInicioTrab: '1975-07-21',
      horasHomem: 0,
    });
    component.submit();

    expect(component.errorMessage()).toBe('Corrija os campos inválidos.');
    expect(component.fieldErrors()['dataInicioTrab']).toBe(
      'A data de início do trabalho não pode ser anterior à data de fundação do ateliê.',
    );
    expect(component.fieldErrors()['horasHomem']).toBe(
      'As horas-homem devem ter no mínimo 10 horas.',
    );
  });
});
