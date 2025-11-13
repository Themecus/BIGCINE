import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modificar-cine',
  templateUrl: '../../front/view/modificar-cine.html',
  styleUrls: ['../../front/view/modificar-cine.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ModificarCineComponent implements OnInit {
  cines: any[] = [];
  cineSeleccionado: any = null;
  
  cineEditado = {
    nombre: '',
    ubicacion: '',
    peliculasSeleccionadas: [] as number[]
  };

  peliculasDisponibles: any[] = [];

  mostrarConfirmacion = false;
  mostrarExito = false;
  mensajeExito = '';

  ngOnInit() {
    this.cargarCinesDesdeLocalStorage();
    this.cargarPeliculasDisponibles();
  }

  cargarCinesDesdeLocalStorage() {
    const cinesGuardados = localStorage.getItem('cines');
    if (cinesGuardados) {
      this.cines = JSON.parse(cinesGuardados);
    }
  }

  cargarPeliculasDisponibles() {
    const peliculasGuardadas = localStorage.getItem('carteleraPeliculas');
    if (peliculasGuardadas) {
      this.peliculasDisponibles = JSON.parse(peliculasGuardadas);
    }
  }

  guardarCinesEnLocalStorage() {
    localStorage.setItem('cines', JSON.stringify(this.cines));
  }

  seleccionarCine(cine: any) {
    this.cineSeleccionado = cine;
    this.cineEditado = {
      nombre: cine.nombre,
      ubicacion: cine.ubicacion,
      peliculasSeleccionadas: cine.peliculas ? cine.peliculas.map((p: any) => p.id) : []
    };
  }

  cancelarEdicion() {
    this.cineSeleccionado = null;
    this.cineEditado = { 
      nombre: '', 
      ubicacion: '', 
      peliculasSeleccionadas: [] 
    };
  }

  confirmarModificacion() {
    if (this.cineEditado.nombre.trim() && this.cineEditado.ubicacion.trim()) {
      this.mostrarConfirmacion = true;
    }
  }

  modificarCineConfirmado() {
    if (this.cineSeleccionado) {
      const index = this.cines.findIndex(c => c.id === this.cineSeleccionado.id);
      if (index !== -1) {
        const peliculasSeleccionadas = this.peliculasDisponibles.filter(pelicula => 
          this.cineEditado.peliculasSeleccionadas.includes(pelicula.id)
        );

        this.cines[index] = {
          ...this.cines[index],
          nombre: this.cineEditado.nombre,
          ubicacion: this.cineEditado.ubicacion,
          peliculas: peliculasSeleccionadas,
          fechaModificacion: new Date().toLocaleDateString()
        };
        
        this.guardarCinesEnLocalStorage();
        
        this.mensajeExito = `"${this.cineSeleccionado.nombre}" ha sido modificado correctamente`;
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

  togglePeliculaSeleccionada(peliculaId: number) {
    const index = this.cineEditado.peliculasSeleccionadas.indexOf(peliculaId);
    if (index > -1) {
      this.cineEditado.peliculasSeleccionadas.splice(index, 1);
    } else {
      this.cineEditado.peliculasSeleccionadas.push(peliculaId);
    }
  }

  estaSeleccionada(peliculaId: number): boolean {
    return this.cineEditado.peliculasSeleccionadas.includes(peliculaId);
  }

  getPeliculasSeleccionadasCount(): number {
    return this.cineEditado.peliculasSeleccionadas.length;
  }

  getPeliculasCineCount(): number {
    return this.cineSeleccionado?.peliculas?.length || 0;
  }
}
