import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AtelieApiService } from '../../core/atelie-api.service';
import { AtelieFormComponent } from './atelie-form.component';

describe('AtelieFormComponent', () => {
  let fixture: ComponentFixture<AtelieFormComponent>;
  let component: AtelieFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtelieFormComponent],
      providers: [
        provideRouter([]),
        {
          provide: AtelieApiService,
          useValue: {
            getById: jasmine.createSpy().and.returnValue(of(null)),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null,
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AtelieFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('mantém a mensagem genérica e destaca os campos inválidos no submit', () => {
    component.submit();

    expect(component.errorMessage()).toBe('Corrija os campos inválidos.');
    expect(component.fieldErrors()['especialidadeEra']).toBe(
      'A especialidade / era é obrigatória.',
    );
    expect(component.fieldErrors()['dataFundacao']).toBe(
      'A data de fundação é obrigatória.',
    );
  });
});
