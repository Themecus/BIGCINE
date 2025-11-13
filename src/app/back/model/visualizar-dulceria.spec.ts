import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarDulceriaComponent } from '../controller/visualizar-dulceria';  

describe('VisualizarDulceria', () => {
  let component: VisualizarDulceriaComponent;
  let fixture: ComponentFixture<VisualizarDulceriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarDulceriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarDulceriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
