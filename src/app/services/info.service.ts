import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  info: InfoPagina = {};
  load = false;
  equipo: any[] = [];
  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json')
        .subscribe( (resp: InfoPagina) => {
          this.load = true;
          this.info = resp;
        });
  }

  private cargarEquipo() {
    this.http.get('https://curso-angular-ca01.firebaseio.com/equipo.json')
        .subscribe( (resp: any) => {
          this.equipo = resp;
        });

  }
}
