import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { IGNapiService } from './ignapi.service';
import { OpinionesComponent } from './opiniones/opiniones.component';
import { CommonModule, isPlatformBrowser} from '@angular/common';
import { AuthService } from './servicios/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OpinionesComponent, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ignspa';
  mensaje: string = '';
  cliente: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

 ngOnInit(){

  this.authService.cliente$
  .subscribe(cliente => {

    this.cliente = cliente;

  });
  }
  logout(){

  this.authService.logout();
  this.router.navigate (['/registro']);
  alert("Sesión cerrada");

}
}
