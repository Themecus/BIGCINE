import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anadir-cine',
  templateUrl: '../../front/view/anadir-cine.html',
  styleUrls: ['../../front/view/anadir-cine.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AnadirCineComponent implements OnInit {
  // Datos del nuevo cine
  nuevoCine = {
    nombre: '',
    ubicacion: '',
    peliculasSeleccionadas: [] as number[]
  };

  // Lista de cines existentes
  cines: any[] = [];

  // Lista de películas disponibles (desde localStorage)
  peliculasDisponibles: any[] = [];

  ngOnInit() {
    this.cargarCines();
    this.cargarPeliculasDisponibles();
  }

  // Cargar cines desde localStorage
  cargarCines() {
    const cinesGuardados = localStorage.getItem('cines');
    if (cinesGuardados) {
      this.cines = JSON.parse(cinesGuardados);
    }
  }

  // Cargar películas disponibles desde localStorage
  cargarPeliculasDisponibles() {
    const peliculasGuardadas = localStorage.getItem('carteleraPeliculas');
    if (peliculasGuardadas) {
      this.peliculasDisponibles = JSON.parse(peliculasGuardadas);
    }
  }

  // Guardar cines en localStorage
  guardarCines() {
    localStorage.setItem('cines', JSON.stringify(this.cines));
  }

  // Función para agregar nuevo cine
  agregarCine() {
    if (this.nuevoCine.nombre.trim() && this.nuevoCine.ubicacion.trim()) {
      const cine = {
        id: Date.now(),
        nombre: this.nuevoCine.nombre,
        ubicacion: this.nuevoCine.ubicacion,
        peliculas: this.peliculasDisponibles.filter(pelicula => 
          this.nuevoCine.peliculasSeleccionadas.includes(pelicula.id)
        ),
        fechaCreacion: new Date().toLocaleDateString()
      };

      this.cines.push(cine);
      this.guardarCines();

      // Limpiar formulario
      this.nuevoCine = {
        nombre: '',
        ubicacion: '',
        peliculasSeleccionadas: []
      };

      alert('¡Cine agregado correctamente!');
    }
  }

  // Función para manejar selección/deselección de películas
  togglePeliculaSeleccionada(peliculaId: number) {
    const index = this.nuevoCine.peliculasSeleccionadas.indexOf(peliculaId);
    if (index > -1) {
      this.nuevoCine.peliculasSeleccionadas.splice(index, 1);
    } else {
      this.nuevoCine.peliculasSeleccionadas.push(peliculaId);
    }
  }

  // Verificar si una película está seleccionada
  estaSeleccionada(peliculaId: number): boolean {
    return this.nuevoCine.peliculasSeleccionadas.includes(peliculaId);
  }



  // Función para manejar Enter en los inputs
  manejarEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.agregarCine();
    }
  }
}