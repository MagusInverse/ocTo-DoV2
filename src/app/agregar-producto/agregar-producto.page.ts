import { Component, OnInit } from '@angular/core';
import { BdserviceService } from '../services/bdservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {

  nombre = "";
  detalle = "";
  cantidad = 0;

  constructor(private servicioBD: BdserviceService, public router: Router) { }

  agregar(){
    this.servicioBD.insertarProducto(this.nombre, this.detalle, this.cantidad);
    this.servicioBD.presentToast("Producto agregado correctamente");
    this.router.navigate(['/listado']);
  }

  ngOnInit() {
  }

}
