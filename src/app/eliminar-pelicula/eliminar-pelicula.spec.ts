import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPelicula } from './eliminar-pelicula';

describe('EliminarPelicula', () => {
  let component: EliminarPelicula;
  let fixture: ComponentFixture<EliminarPelicula>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarPelicula]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarPelicula);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
