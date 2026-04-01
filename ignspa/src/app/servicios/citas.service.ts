import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CitasService {

  private api = 'http://localhost:4001/api/citas';

  constructor(private http: HttpClient) {}

  agendarCita(cita: any) {
    return this.http.post(this.api, cita);
  }
}
