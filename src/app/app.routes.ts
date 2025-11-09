import { Routes } from '@angular/router';
import { AnadirPeliculaComponent } from './anadir-pelicula/anadir-pelicula';
import { CarteleraComponent } from './cartelera/cartelera';
import { EliminarPeliculaComponent } from './eliminar-pelicula/eliminar-pelicula';

export const routes: Routes = [
  {
    path: 'anadir-pelicula',  
    component: AnadirPeliculaComponent,
    title: 'Agregar Película'
  },
  {
    path: 'cartelera',  
    component: CarteleraComponent,
    title: 'Cartelera'
  },
  {
    path: 'eliminar-pelicula',  
    component: EliminarPeliculaComponent,
    title: 'Eliminar Película'
  },
  {
    path: '',
    redirectTo: 'cartelera',  
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'cartelera' 
  }
];