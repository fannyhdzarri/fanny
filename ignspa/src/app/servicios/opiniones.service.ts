import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OpinionesService {

  private api = 'http://localhost:4001/api/opiniones';

  constructor(private http: HttpClient) {}
  
  agregarOpinion(opinion: any) {
  return this.http.post('http://localhost:4001/api/opiniones', opinion);
}
obtenerOpiniones() {
  return this.http.get<any[]>(this.api);
}
}
