import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPeliculaComponent } from './controller/modificar-pelicula';

describe('ModificarPelicula', () => {
  let component: ModificarPeliculaComponent;
  let fixture: ComponentFixture<ModificarPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarPeliculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
