import { Injectable } from '@angular/core';

export interface Pelicula {
  nombre: string;
  imagenUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private peliculas: Pelicula[] = [];

  constructor() {
    this.cargarDesdeLocalStorage();
  }

  agregarPelicula(pelicula: Pelicula): void {
    this.peliculas.push(pelicula);
    this.guardarEnLocalStorage();
  }

  obtenerPeliculas(): Pelicula[] {
    return [...this.peliculas];
  }

  eliminarPelicula(index: number): void {
    if (index >= 0 && index < this.peliculas.length) {
      this.peliculas.splice(index, 1);
      this.guardarEnLocalStorage();
    }
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem('peliculas', JSON.stringify(this.peliculas));
  }

  private cargarDesdeLocalStorage(): void {
    const peliculasGuardadas = localStorage.getItem('peliculas');
    if (peliculasGuardadas) {
      this.peliculas = JSON.parse(peliculasGuardadas);
    }
  }
}
