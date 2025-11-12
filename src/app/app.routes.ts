import { Routes } from '@angular/router';
import { AnadirPeliculaComponent } from './anadir-pelicula/controller/anadir-pelicula';
import { CarteleraComponent } from './cartelera/controller/cartelera';
import { EliminarPeliculaComponent } from './eliminar-pelicula/controller/eliminar-pelicula';
import { EliminarCineComponent } from './eliminar-cine/eliminar-cine';

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
    path: 'eliminar-cine',
    component: EliminarCineComponent,
    title: 'Eliminar Cine'
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