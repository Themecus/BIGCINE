import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPelicula } from './modificar-pelicula';

describe('ModificarPelicula', () => {
  let component: ModificarPelicula;
  let fixture: ComponentFixture<ModificarPelicula>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarPelicula]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarPelicula);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
