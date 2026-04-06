import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API = 'https://fanny-production.up.railway.app';
@Injectable({ providedIn: 'root' })
export class ServiciosService {

  private api = `${API}/api/servicios`;

  constructor(private http: HttpClient) {}

  obtenerServicios() {
     return this.http.get<any[]>(this.api);
  }
}
