import { Component, OnInit } from '@angular/core';
import { BdserviceService } from '../services/bdservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-tarea',
  templateUrl: './modificar-tarea.page.html',
  styleUrls: ['./modificar-tarea.page.scss'],
})
export class ModificarTareaPage implements OnInit {
  titulo = "";
  detalle = "";
  id = 0;

  constructor(private servicioBD: BdserviceService, private receptor: ActivatedRoute, private router: Router) {
    this.receptor.queryParams.subscribe(paquete=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.id = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];
        this.titulo = this.router.getCurrentNavigation()?.extras?.state?.['tituloEnviado'];
        this.detalle = this.router.getCurrentNavigation()?.extras?.state?.['detalleEnviado'];
      }
    })
   }

   modificar(){
    this.servicioBD.modificarTarea(this.id,this.titulo, this.detalle);
    this.servicioBD.presentToast("Tarea modificada correctamente");
    this.router.navigate(['/pendientes']);
  }
  
  ngOnInit() {
  }
}
