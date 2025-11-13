import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visualizar-cine',
  templateUrl: '../../front/view/visualizacion-cine.html',
  styleUrls: ['../../front/view/visualizacion-cine.css'],
  standalone: true,
  imports: [CommonModule]
})
export class VisualizacionCineComponent implements OnInit {
  // Array para almacenar los cines
  cines: any[] = [];
  
  // Cine seleccionado para ver detalles
  cineSeleccionado: any = null;

  ngOnInit() {
    this.cargarCinesDesdeLocalStorage();
  }

  cargarCinesDesdeLocalStorage() {
    const cinesGuardados = localStorage.getItem('cines');
    if (cinesGuardados) {
      this.cines = JSON.parse(cinesGuardados);
    }
  }

  seleccionarCine(cine: any) {
    this.cineSeleccionado = cine;
    // Scroll suave hacia los detalles
    setTimeout(() => {
      document.querySelector('.card-shadow-lg')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  }

  cerrarDetalles() {
    this.cineSeleccionado = null;
  }

  // Obtener géneros únicos para estadísticas
  getGenerosUnicos(): string[] {
    if (!this.cineSeleccionado?.peliculas) return [];
    
    const generos = this.cineSeleccionado.peliculas
      .map((p: any) => p.genero)
      .filter((genero: string) => genero && genero !== 'No especificado');
    
    return [...new Set(generos)] as string[];
  }

  // Formatear duración
  formatearDuracion(duracion: string): string {
    if (!duracion || duracion === 'No especificada') return 'No especificada';
    return duracion;
  }
}
