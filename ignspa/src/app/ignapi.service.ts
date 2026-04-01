import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IGNapiService {
 private apiUrl = 'http://localhost:4001';

 constructor(private http: HttpClient) { }

  obtenerMensaje(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
