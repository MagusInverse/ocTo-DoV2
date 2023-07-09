import { Component, OnInit } from '@angular/core';
import { BdserviceService } from '../services/bdservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.page.html',
  styleUrls: ['./modificar-producto.page.scss'],
})
export class ModificarProductoPage implements OnInit {
  nombre = "";
  detalle = "";
  cantidad = 0;
  id = 0;

  constructor(private servicioBD: BdserviceService, private receptor: ActivatedRoute, private router: Router) {
    this.receptor.queryParams.subscribe(paquete=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.id = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];
        this.nombre = this.router.getCurrentNavigation()?.extras?.state?.['nombreEnviado'];
        this.detalle = this.router.getCurrentNavigation()?.extras?.state?.['detalleEnviado'];
        this.cantidad = this.router.getCurrentNavigation()?.extras?.state?.['cantidadEnviado'];
      }
    })
   }

   modificar(){
    this.servicioBD.modificarProducto(this.id,this.nombre, this.detalle, this.cantidad);
    this.servicioBD.presentToast("Producto modificado correctamente");
    this.router.navigate(['/listado-productos']);
  }


  ngOnInit() {
  }

}
