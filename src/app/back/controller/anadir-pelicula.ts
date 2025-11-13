import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anadir-pelicula',
  templateUrl: '../../front/view/anadir-pelicula.html',  
  styleUrls: ['../../front/view/anadir-pelicula.css'],   
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AnadirPeliculaComponent {
 
  nuevaPelicula = {
    nombre: '',
    imagenUrl: '',
    genero: '',
    duracion: ''
  };

 
  peliculas: any[] = [];


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


  agregarPelicula() {
    if (this.nuevaPelicula.nombre.trim() && this.nuevaPelicula.imagenUrl.trim()) {
      this.peliculas.push({
        nombre: this.nuevaPelicula.nombre,
        imagenUrl: this.nuevaPelicula.imagenUrl,
        genero: this.nuevaPelicula.genero || 'Sin género',
        duracion: this.nuevaPelicula.duracion || '—',
        id: Date.now() 
      });


      this.guardarPeliculasEnLocalStorage();


      this.nuevaPelicula = {
        nombre: '',
        imagenUrl: '',
        genero: '',
        duracion: ''
      };


      alert('¡Película agregada correctamente!');
    }
  }


  manejarEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.agregarPelicula();
    }
  }
}