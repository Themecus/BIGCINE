import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eliminar-pelicula',
  templateUrl: '../view/eliminar-pelicula.html',
  styleUrls: ['../view/eliminar-pelicula.css'],
  standalone: true,
  imports: [CommonModule]
})
export class EliminarPeliculaComponent implements OnInit {
  peliculas: any[] = [];

  mostrarConfirmacion = false;
  mostrarExito = false;
  peliculaAEliminar: any = null;
  mensajeExito = '';

  ngOnInit() {
    this.cargarPeliculasDesdeLocalStorage();
  }

  cargarPeliculasDesdeLocalStorage() {
    const peliculasGuardadas = localStorage.getItem('carteleraPeliculas');
    if (peliculasGuardadas) {
      this.peliculas = JSON.parse(peliculasGuardadas);
    }
  }

  guardarPeliculasEnLocalStorage() {
    localStorage.setItem('carteleraPeliculas', JSON.stringify(this.peliculas));
  }

  confirmarEliminacion(pelicula: any, event: Event) {
    event.preventDefault();
    this.peliculaAEliminar = pelicula;
    this.mostrarConfirmacion = true;
  }

  eliminarPeliculaConfirmada() {
    if (this.peliculaAEliminar) {
      const card = document.querySelector(`[data-pelicula-id="${this.peliculaAEliminar.id}"]`);
      if (card) {
        card.classList.add('exploding');
        
        
        setTimeout(() => {
          this.peliculas = this.peliculas.filter(p => p.id !== this.peliculaAEliminar.id);
          this.guardarPeliculasEnLocalStorage();
          
         
          this.mensajeExito = `"${this.peliculaAEliminar.nombre}" ha sido eliminada correctamente`;
          this.mostrarExito = true;
          
         
          this.mostrarConfirmacion = false;
          this.peliculaAEliminar = null;
        }, 500);
      }
    }
  }

  
  cancelarEliminacion() {
    this.mostrarConfirmacion = false;
    this.peliculaAEliminar = null;
  }

 
  cerrarExito() {
    this.mostrarExito = false;
    this.mensajeExito = '';
  }

  
  confirmarEliminarTodas() {
    if (this.peliculas.length > 0) {
      this.mostrarConfirmacion = true;
      this.peliculaAEliminar = { nombre: 'todas las películas', id: 'all' };
    }
  }

 
  eliminarTodasConfirmadas() {
    
    const cards = document.querySelectorAll('.pelicula-card');
    cards.forEach(card => {
      card.classList.add('exploding');
    });
    
    
    setTimeout(() => {
      this.peliculas = [];
      this.guardarPeliculasEnLocalStorage();
      
      
      this.mensajeExito = 'Todas las películas han sido eliminadas correctamente';
      this.mostrarExito = true;
      
      
      this.mostrarConfirmacion = false;
      this.peliculaAEliminar = null;
    }, 600);
  }
}