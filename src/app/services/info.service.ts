import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  info: InfoPagina = {};
  load = false;

  constructor(private http: HttpClient) {

    this.http.get('assets/data/data-pagina.json')
        .subscribe( (resp: InfoPagina) => {
          this.load = true;
          this.info = resp;

        });
  }
}
