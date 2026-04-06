import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const API = 'https://fanny-production.up.railway.app';
@Injectable({ providedIn: 'root' })
export class CitasService {

  private api = `${API}/api/citas`;

  constructor(private http: HttpClient) {}

  agendarCita(cita: any) {
    return this.http.post(this.api, cita);
  }
}
