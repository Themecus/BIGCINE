import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacionCineComponent } from '../controller/visualizacion-cine';

describe('VisualizacionCine', () => {
  let component: VisualizacionCineComponent;
  let fixture: ComponentFixture<VisualizacionCineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizacionCineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizacionCineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
