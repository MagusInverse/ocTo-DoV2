import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from '../services/bdservice.service';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
})
export class PendientesPage implements OnInit {
  arregloTareas: any =[
    {
      id: '',
      titlulo: '',
      detalle: ''
  }]
  constructor(private router: Router, private servicioBD: BdserviceService) { }

  eliminar(x: any){
    this.servicioBD.eliminarTarea(x.id);
    this.servicioBD.presentToast("Tarea Eliminada");
  }

  modificar(x: any){
    let tareaEnviar: NavigationExtras = {
      state: {
        idEnviado: x.id,
        tituloEnviado: x.titulo,
        detalleEnviado: x.detalle
      }
    }
    this.router.navigate(['/modificar-tarea'], tareaEnviar);
  }

  ngOnInit() {
    
    this.servicioBD.dbState().subscribe(respuestaBD =>{
      if(respuestaBD){
        this.servicioBD.fetchTarea().subscribe(itemBD=>{
          this.arregloTareas = itemBD;
        })
      }
    })
    
  }
}
