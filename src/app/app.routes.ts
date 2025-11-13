import { Routes } from '@angular/router';
import { AnadirPeliculaComponent } from './back/controller/anadir-pelicula';
import { CarteleraComponent } from './back/controller/cartelera';
import { EliminarPeliculaComponent } from './back/controller/eliminar-pelicula';
import { EliminarCineComponent } from './back/controller/eliminar-cine';
import { AnadirSnacksComponent } from './back/controller/anadir-snacks';
import { ModificarPeliculaComponent } from './back/controller/modificar-pelicula';
import { ModificarSnacksComponent } from './back/controller/modificar-snacks';



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
    path: 'agregar-snacks', 
    component: AnadirSnacksComponent,
    title: 'Agregar Snacks'
  },
  { 
    path: 'modificar-pelicula',
    component: ModificarPeliculaComponent,
    title: 'Modificar Pelicula'
  },
  { 
    path: 'modificar-snack',
    component: ModificarSnacksComponent,
    title: 'Modificar Snack'
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