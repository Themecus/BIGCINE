import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPeliculaComponent } from '../back/controller/eliminar-pelicula';

describe('EliminarPelicula', () => {
  let component: EliminarPeliculaComponent;
  let fixture: ComponentFixture<EliminarPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarPeliculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
