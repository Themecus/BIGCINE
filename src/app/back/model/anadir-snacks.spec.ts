import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirSnacksComponent } from '../controller/anadir-snacks';

describe('AnadirSnacks', () => {
  let component: AnadirSnacksComponent;
  let fixture: ComponentFixture<AnadirSnacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnadirSnacksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirSnacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
