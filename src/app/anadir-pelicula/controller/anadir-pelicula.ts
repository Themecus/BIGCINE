import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anadir-pelicula',
 templateUrl: '../view/anadir-pelicula.html',  
  styleUrls: ['../view/anadir-pelicula.css'],   
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AnadirPeliculaComponent {
 
  nuevaPelicula = {
    nombre: '',
    imagenUrl: ''
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
        id: Date.now() 
      });


      this.guardarPeliculasEnLocalStorage();


      this.nuevaPelicula = {
        nombre: '',
        imagenUrl: ''
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
