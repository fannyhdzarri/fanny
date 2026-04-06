import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = 'https://fanny-production.up.railway.app';

@Injectable({ providedIn: 'root' })
export class OpinionesService {

  private api = `${API}/api/opiniones`;

  constructor(private http: HttpClient) {}

  agregarOpinion(opinion: any) {
    return this.http.post(this.api, opinion);
  }

  obtenerOpiniones() {
    return this.http.get<any[]>(this.api);
  }
}