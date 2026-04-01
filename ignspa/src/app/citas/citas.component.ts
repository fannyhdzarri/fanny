import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute } from '@angular/router';
import { CitasService } from '../servicios/citas.service';

@Component({
  standalone: true,
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CitasComponent implements OnInit {

  citas: any[] = [];
  servicios: any[] = [];
  archivo: File | null = null;

onFileSelected(event: any) {
  this.archivo = event.target.files[0];
}
esFutura(cita: any): boolean {

  const fecha = cita.fecha.split('T')[0];
  const fechaCita = new Date(`${fecha} ${cita.hora}`);
  const ahora = new Date();

  return fechaCita >= ahora;
}
  nuevaCita = {
    fecha: '',
    hora: '',
    ID_CLIE: 0,     // temporal
    ID_SERVICIO:0 ,
    ID_SUCURSAL: 8453,     // temporal
    pagado:false
  };
  horarios:string[]= [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00"
  ];
  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private citasService: CitasService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

    const cliente = JSON.parse(localStorage.getItem("cliente") || "{}");

    if (cliente.ID_CLIE) {
      this.nuevaCita.ID_CLIE = cliente.ID_CLIE;
    }
  }
    //cargar servicios
    this.http.get<any[]>('http://localhost:4001/api/servicios')
    .subscribe(data => {
      this.servicios = data;
    });
    //si se dio click en agendar desde servicios
    this.route.queryParams.subscribe(params => {
      if (params['servicio']){
        this.nuevaCita.ID_SERVICIO = Number(params['servicio']);
      }
    });
    this.cargarCitas();
    this.http.get<any[]>('http://localhost:4001/api/servicios')
      .subscribe(data => {
        this.servicios = data;
      });
  }

  cargarCitas(){

if (!isPlatformBrowser(this.platformId)) {
  return;
}

const cliente = JSON.parse(localStorage.getItem("cliente") || "{}");

if(cliente.rol === "admin"){

  this.http.get<any[]>('http://localhost:4001/api/citas')
  .subscribe(data=>{
    this.citas = data.filter(c => this.esFutura(c));
  });

}else{

  this.http.get<any[]>(`http://localhost:4001/api/citas/${cliente.ID_CLIE}`)
  .subscribe(data=>{
    this.citas = data;
  });

}
}

  agendar() {
     if (!this.nuevaCita.pagado) {
    alert("Debes realizar el depósito de $200 para continuar");
    return;
  }

  if(!this.nuevaCita.ID_CLIE){
    alert("Debes iniciar sesión para agendar una cita");
    return;
  }  
  const formData = new FormData();

  formData.append('fecha', this.nuevaCita.fecha);
  formData.append('hora', this.nuevaCita.hora);
  formData.append('ID_CLIE', this.nuevaCita.ID_CLIE.toString());
  formData.append('ID_SERVICIO', this.nuevaCita.ID_SERVICIO.toString());
  formData.append('ID_SUCURSAL', this.nuevaCita.ID_SUCURSAL.toString());
  formData.append('pagado', 'true');

  if (this.archivo) {
    formData.append('comprobante', this.archivo);
  }

  this.http.post('http://localhost:4001/api/citas', formData)
    .subscribe({
      next: () => {
        alert("Cita agendada correctamente");
        this.cargarCitas();
      },
      error: () => {
        alert("Error al agendar");
      }
    });
}
cancelar(id:number){

  if(!confirm("¿Deseas cancelar esta cita?")){
    return;
  }

  this.http.delete(`http://localhost:4001/api/citas/${id}`)
  .subscribe({
    next:()=>{

      alert("Cita cancelada");

      this.cargarCitas();

    },
    error:()=>{

      alert("Error al cancelar la cita");

    }
  });
}
citaSeleccionada: any = null;

reagendarData = {
  fecha: '',
  hora: ''
};
abrirReagendar(cita: any) {
  this.citaSeleccionada = cita;

  this.reagendarData.fecha = cita.fecha.split('T')[0];
  this.reagendarData.hora = cita.hora;
}
guardarReagendar() {

  if (!this.citaSeleccionada) return;

  this.http.put(
    `http://localhost:4001/api/citas/${this.citaSeleccionada.NO_CITA}`,
    this.reagendarData
  ).subscribe({
    next: () => {
      alert("Cita reagendada correctamente");
      this.citaSeleccionada = null;
      this.cargarCitas();
    },
    error: (err) => {
      alert(err.error?.mensaje || "Error al reagendar");
    }
  });
}
puedeCancelar(cita: any): boolean {

  // Separar fecha correctamente (solo YYYY-MM-DD)
  const fecha = cita.fecha.split('T')[0];

  // Crear fecha completa
  const fechaCita = new Date(`${fecha} ${cita.hora}`);

  const ahora = new Date();

  const diferencia = (fechaCita.getTime() - ahora.getTime()) / (1000 * 60 * 60);

  console.log("Diferencia horas:", diferencia);

  return diferencia >= 24;
}
}

