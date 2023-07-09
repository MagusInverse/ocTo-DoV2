import { Component, OnInit } from '@angular/core';
import { BdserviceService } from '../services/bdservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.page.html',
  styleUrls: ['./agregar-tarea.page.scss'],
})
export class AgregarTareaPage implements OnInit {

  titulo = "";
  detalle = "";

  constructor(private servicioBD: BdserviceService, public router: Router) { }

  agregar(){
    this.servicioBD.insertarTarea(this.titulo, this.detalle);
    this.servicioBD.presentToast("Tarea ingresada correctamente");
    this.router.navigate(['/pendiente']);
  }

  ngOnInit() {
  }
}
