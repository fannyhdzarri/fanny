import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
const API = 'https://fanny-production.up.railway.app';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  clientes: any[] = [];

  NuevoCliente = {
    nombre: '',
    tel: '',
    correo: '',
    edad: null,
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  registrar() {
    console.log("Datos enviados", this.NuevoCliente);
    

    this.http.post(`${API}/api/auth/registro`, this.NuevoCliente)
      .subscribe({
        next: () => {

          alert("Usuario registrado correctamente");
          this.router.navigate(['/login']);

          this.NuevoCliente = {
            nombre: '',
            tel: '',
            correo: '',
            edad: null,
            password: ''
            
          };

          },
        error: () => {
          alert("Error al registrarse.");
        }
      });

        }
      };

