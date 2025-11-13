import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modificar-pelicula',
  templateUrl: '../../front/view/modificar-pelicula.html',
  styleUrls: ['../../front/view/modificar-pelicula.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ModificarPeliculaComponent implements OnInit {
  peliculas: any[] = [];
  
  peliculaSeleccionada: any = null;
  
  peliculaEditada = {
    nombre: '',
    imagenUrl: '',
    duracion: '',
    genero: ''
  };

  generos = [
    'Acción', 'Aventura', 'Comedia', 'Drama', 'Ciencia Ficción',
    'Fantasía', 'Terror', 'Romance', 'Suspenso', 'Animación',
    'Documental', 'Crimen', 'Misterio', 'Musical', 'Bélico',
    'Histórico', 'Western', 'Biografía', 'Deporte', 'Familia'
  ];

  mostrarConfirmacion = false;
  mostrarExito = false;
  mensajeExito = '';

  ngOnInit() {
    this.cargarPeliculasDesdeLocalStorage();
  }

  cargarPeliculasDesdeLocalStorage() {
    const peliculasGuardadas = localStorage.getItem('carteleraPeliculas');
    if (peliculasGuardadas) {
      this.peliculas = JSON.parse(peliculasGuardadas);
      this.peliculas = this.peliculas.map(pelicula => ({
        ...pelicula,
        duracion: pelicula.duracion || 'No especificada',
        genero: pelicula.genero || 'No especificado'
      }));
      this.guardarPeliculasEnLocalStorage();
    }
  }

  guardarPeliculasEnLocalStorage() {
    localStorage.setItem('carteleraPeliculas', JSON.stringify(this.peliculas));
  }

  seleccionarPelicula(pelicula: any) {
    this.peliculaSeleccionada = pelicula;
    this.peliculaEditada = {
      nombre: pelicula.nombre,
      imagenUrl: pelicula.imagenUrl,
      duracion: pelicula.duracion || '',
      genero: pelicula.genero || ''
    };
  }

  cancelarEdicion() {
    this.peliculaSeleccionada = null;
    this.peliculaEditada = { 
      nombre: '', 
      imagenUrl: '', 
      duracion: '', 
      genero: '' 
    };
  }

  confirmarModificacion() {
    if (this.peliculaEditada.nombre.trim() && this.peliculaEditada.imagenUrl.trim()) {
      this.mostrarConfirmacion = true;
    }
  }

  modificarPeliculaConfirmada() {
    if (this.peliculaSeleccionada) {
      const index = this.peliculas.findIndex(p => p.id === this.peliculaSeleccionada.id);
      if (index !== -1) {
        this.peliculas[index] = {
          ...this.peliculas[index],
          nombre: this.peliculaEditada.nombre,
          imagenUrl: this.peliculaEditada.imagenUrl,
          duracion: this.peliculaEditada.duracion || 'No especificada',
          genero: this.peliculaEditada.genero || 'No especificado'
        };
        
        this.guardarPeliculasEnLocalStorage();
        
        this.mensajeExito = `"${this.peliculaSeleccionada.nombre}" ha sido modificada correctamente`;
        this.mostrarExito = true;
        
        this.cancelarEdicion();
        this.mostrarConfirmacion = false;
      }
    }
  }

  cancelarModificacion() {
    this.mostrarConfirmacion = false;
  }

  cerrarExito() {
    this.mostrarExito = false;
    this.mensajeExito = '';
  }

  formatearDuracion(duracion: string): string {
    if (!duracion || duracion === 'No especificada') return 'Duración no especificada';
    return `${duracion}`;
  }
}