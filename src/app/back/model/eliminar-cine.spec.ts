import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCineComponent } from '../controller/eliminar-cine';

describe('EliminarCine', () => {
  let component: EliminarCineComponent;
  let fixture: ComponentFixture<EliminarCineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarCineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarCineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
