import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from '../services/bdservice.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {
  arregloProductos: any =[
    {
      id: '',
      nombre: '',
      detalle: '',
      cantidad: ''
  }]
  constructor(private router: Router, private servicioBD: BdserviceService) { }

  eliminar(x: any){
    this.servicioBD.eliminarProducto(x.id);
    this.servicioBD.presentToast("Producto Eliminado");
  }

  modificar(x: any){
    let productoEnviar: NavigationExtras = {
      state: {
        idEnviado: x.id,
        nombreEnviado: x.nombre,
        detalleEnviado: x.detalle,
        cantidadEnviado: x.cantidad
      }
    }
    this.router.navigate(['/modificar-producto'], productoEnviar);
  }

  ngOnInit() {
    
    this.servicioBD.dbState().subscribe(respuestaBD =>{
      if(respuestaBD){
        this.servicioBD.fetchProducto().subscribe(itemBD=>{
          this.arregloProductos = itemBD;
        })
      }
    })
  }
}
