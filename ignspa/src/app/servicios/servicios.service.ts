import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ServiciosService {

  private api = 'http://localhost:4001/api/servicios';

  constructor(private http: HttpClient) {}

  obtenerServicios() {
    return this.http.get(this.api);
  }
}
