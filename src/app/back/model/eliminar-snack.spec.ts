import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarSnackComponent } from '../controller/eliminar-snack';

describe('EliminarSnack', () => {
  let component: EliminarSnackComponent;
  let fixture: ComponentFixture<EliminarSnackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarSnackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
