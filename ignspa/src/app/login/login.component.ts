import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  InicioSesion = {
    correo: '',
    password: ''
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ){}

  login(){

  this.authService.login(this.InicioSesion)
  .subscribe({
    next:(res:any)=>{

      alert("Login correcto");

      this.authService.guardarCliente(res.cliente);

    },
    error:()=>{

      alert("Correo o contraseña incorrectos");

    }
  });
}
verPassword = false;
}
