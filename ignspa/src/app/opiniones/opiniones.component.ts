import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 
import { OpinionesService } from '../servicios/opiniones.service';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.css'],
  imports: [FormsModule, CommonModule]
})

export class OpinionesComponent implements OnInit {
  servicios: any[] = [];
  nuevaOpinion = {
    calificacion: 5,
    opinion: '',
    ID_SERVICIO: null
  };
  constructor(
    private opinionesService: OpinionesService,
    private http: HttpClient
  ) {}
  opiniones: any[] = [];
  ngOnInit() {
  this.http.get<any[]>('http://localhost:4001/api/servicios')
    .subscribe(data => {
      console.log("Servicios recibidos:", data);
      this.servicios = data;
      this.cargarOpiniones();
    });
}
cargarOpiniones() {
  this.opinionesService.obtenerOpiniones()
    .subscribe(data => {
      this.opiniones = data;
    });
}
  enviarOpinion() {
  console.log("Enviando:", this.nuevaOpinion);
    this.opinionesService.agregarOpinion(this.nuevaOpinion)
      .subscribe({
        next: () => {
          alert("Opinión enviada correctamente");
          this.nuevaOpinion = {
            calificacion: 5,
            opinion: '',
            ID_SERVICIO: null
          };
          this.cargarOpiniones();
        },
        error: (err) => {
          console.error("Error:", err);
          alert("Hubo un error al enviar la opinión");
        }
      });
  }
}

