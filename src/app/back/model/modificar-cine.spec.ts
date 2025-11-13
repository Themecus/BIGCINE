import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCineComponent } from '../controller/modificar-cine';

describe('ModificarCine', () => {
  let component: ModificarCineComponent;
  let fixture: ComponentFixture<ModificarCineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarCineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarCineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
