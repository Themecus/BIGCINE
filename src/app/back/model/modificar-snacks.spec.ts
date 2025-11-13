import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarSnacksComponent } from '../controller/modificar-snacks';

describe('modificar-snacks', () => {
  let component: ModificarSnacksComponent;
  let fixture: ComponentFixture<ModificarSnacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarSnacksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarSnacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
