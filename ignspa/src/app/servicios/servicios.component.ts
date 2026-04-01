import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CitasService } from '../servicios/citas.service';
import {Router} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ServiciosComponent implements OnInit {

  servicios: any[] = [];

  mostrarFormulario = false;
  servicioSeleccionado: any = null;

  nuevaCita = {
    fecha: '',
    hora: '',
    ID_CLIE: 1,   // temporal
    ID_SERVICIO: null,
    ID_SUCURSAL: 8453   // temporal
  };

  constructor(
    private http: HttpClient,
    private citasService: CitasService,
    private router: Router
  ) {}

  ngOnInit() {
  this.http.get<any[]>('http://localhost:4001/api/servicios')
    .subscribe(data => {
      this.servicios = data;
      this.resultados = data; // mostrar todos al inicio
    });
}
busqueda: string = '';
resultados: any[] = [];

buscarServicios() {

  if (!this.busqueda) {
    this.resultados = this.servicios;
    return;
  }

 const texto = this.busqueda.toLowerCase();

  this.resultados = this.servicios.filter(servicio =>
    servicio.nombre.toLowerCase().includes(texto) ||
    servicio.descripcion.toLowerCase().includes(texto)
  );

}
limpiarBusqueda() {

  this.busqueda = '';

  this.resultados = this.servicios;

}
irACitas(servicio: any) {

  this.router.navigate(['/citas'], {
    queryParams: {
      servicio: servicio.ID_SERVICIO
    }
  });

}
}