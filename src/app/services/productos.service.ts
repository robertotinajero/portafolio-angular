import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/productos.interface';
import { timeout, reject } from 'q';
import { promise } from 'protractor';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];


  constructor(private http: HttpClient) {

    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise( (resolve, reject) => {
      this.http.get('https://curso-angular-ca01.firebaseio.com/productos_idx.json')
              .subscribe( (res:  Producto[]) => {
                this.productos = res;
                // this.cargando = false;
                setTimeout(() => {
                  this.cargando = false;
                }, 1000);
                resolve();
              });
    });
  }

  getProducto( id: String ) {
    return this.http.get(`https://curso-angular-ca01.firebaseio.com/productos/${ id }.json`);

  }

  buscarProducto(termino: string) {

    if (this.productos.length === 0) {
      // Cargar productos
      this.cargarProductos().then( ( ) => {
        // ejercutar despues de tener los productos
        // Aplicar filtro a producrtos
        this.filtrarProductos(termino);
      });
    } else  {
      // Aplicar filtro
      this.filtrarProductos(termino);

    }
    // console.log(this.productosFiltrado);
    // this.productosFiltrado = this.productos.filter( producto => {
    //   return true;
    // });

  }

  private filtrarProductos(termino: string) {

    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    // console.log(this.productos);

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
