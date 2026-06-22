import { HttpErrorResponse } from '@angular/common/http';
import { signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { AuthUser, AppUser } from '../../core/models';
import { UsersApiService } from '../../core/users-api.service';
import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let fixture: ComponentFixture<UsersListComponent>;
  let component: UsersListComponent;
  let apiSpy: jasmine.SpyObj<UsersApiService>;
  let authUserSignal: WritableSignal<AuthUser | null>;

  beforeEach(async () => {
    apiSpy = jasmine.createSpyObj<UsersApiService>('UsersApiService', [
      'list',
      'setActive',
      'setRole',
    ]);
    authUserSignal = signal<AuthUser | null>({
      id: 99,
      nome: 'Admin',
      email: 'admin@exemplo.com',
      role: 'admin',
      ativo: true,
    });

    apiSpy.list.and.returnValue(
      of([
        {
          id: 1,
          nome: 'Maria',
          email: 'maria@exemplo.com',
          role: 'user',
          ativo: true,
        } satisfies AppUser,
      ]),
    );
    apiSpy.setActive.and.callFake((id, ativo) =>
      of({
        id,
        nome: 'Maria',
        email: 'maria@exemplo.com',
        role: 'user',
        ativo,
      } satisfies AppUser),
    );
    apiSpy.setRole.and.callFake((id, role) =>
      of({
        id,
        nome: 'Maria',
        email: 'maria@exemplo.com',
        role,
        ativo: true,
      } satisfies AppUser),
    );

    await TestBed.configureTestingModule({
      imports: [UsersListComponent],
      providers: [
        { provide: UsersApiService, useValue: apiSpy },
        { provide: AuthService, useValue: { user: authUserSignal } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('abre a confirmação visual para alterar a role', () => {
    component.toggleRole(component.items()[0]);
    fixture.detectChanges();

    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll('button'),
    ) as HTMLButtonElement[];

    expect(
      fixture.nativeElement.textContent.includes('Confirmar permissão'),
    ).toBeTrue();
    expect(
      buttons.some((button) => button.textContent?.includes('Confirmar')),
    ).toBeTrue();
  });

  it('renderiza a ação para promover ou remover admin', () => {
    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll('button'),
    ) as HTMLButtonElement[];

    expect(buttons.some((button) => button.textContent?.includes('Tornar admin'))).toBeTrue();
    expect(buttons.some((button) => button.textContent?.includes('Desativar'))).toBeTrue();
  });

  it('chama a API para alternar a role e atualiza a lista', () => {
    const user = component.items()[0];

    component.toggleRole(user);
    component.confirmRoleChange();

    expect(apiSpy.setRole).toHaveBeenCalledWith(1, 'admin');
    expect(component.items()[0].role).toBe('admin');
    expect(component.actionMessage()).toBe(
      'Usuário promovido a administrador com sucesso.',
    );
  });

  it('exibe erro quando a alteração de role falha', () => {
    apiSpy.setRole.and.returnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: {
              statusCode: 400,
              message: 'Não é possível desativar a role de administrador.',
              timestamp: new Date().toISOString(),
            },
          }),
      ),
    );

    component.toggleRole(component.items()[0]);
    component.confirmRoleChange();

    expect(component.actionError()).toBe(
      'Não é possível desativar a role de administrador.',
    );
  });
});
