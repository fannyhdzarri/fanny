import { Routes } from '@angular/router';
import { OpinionesComponent } from './opiniones/opiniones.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { CitasComponent } from './citas/citas.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [
  { path: 'opiniones', component: OpinionesComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path:'inicio', component: InicioComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'citas', component: CitasComponent },
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent}
];

