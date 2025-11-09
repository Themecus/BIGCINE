import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app').then(m => m.AppComponent),
    title: 'Cartelera - Agregar Películas'
  },
  {
    path: 'borrar-peliculas',
    loadComponent: () => import('./borrar-peliculas/borrar-peliculas').then(m => m.BorrarPeliculasComponent),
    title: 'Cartelera - Borrar Películas'
  },
  {
    path: '**',
    redirectTo: ''
  }
];