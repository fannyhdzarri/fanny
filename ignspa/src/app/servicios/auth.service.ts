import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private api = 'http://localhost:4001/api/auth';

  private clienteSubject = new BehaviorSubject<any>(null);
  cliente$ = this.clienteSubject.asObservable();

  constructor(
    private http: HttpClient,
  @Inject(PLATFORM_ID) private platformId: Object
) {
  if(isPlatformBrowser(this.platformId)){
    const cliente = localStorage.getItem("cliente");

    if(cliente){
      this.clienteSubject.next(JSON.parse(cliente));
    }
  }
}

  registrar(usuario:any){
    return this.http.post(`${this.api}/registro`, usuario);
  }

  login(datos:any){
    return this.http.post(`${this.api}/login`, datos);
  }
guardarCliente(cliente:any){

    if(isPlatformBrowser(this.platformId)){
      localStorage.setItem("cliente", JSON.stringify(cliente));
    }

    this.clienteSubject.next(cliente);

  }

  logout(){
    if(isPlatformBrowser(this.platformId)){
      localStorage.removeItem("cliente");
    }
    this.clienteSubject.next(null);
  }
}
