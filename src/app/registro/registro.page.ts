import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from '../services/bdservice.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public alertButtons = ['OK'];

  clave2: string="";
  nombre: string="";
  apellido: string="";
  mail: string="";
  nivel_educ: string="";
  clave: string="";
  usuario: string="";


  constructor(private activerouter: ActivatedRoute, private router: Router, private alertController: AlertController , private servicioBD: BdserviceService) { }
  arregloUsuario: any = [
    {
      nombre:'',
      apellido:'',
      mail:'',
      clave:'',
      usuario:''
    }
  ]

  registrar(){
    let navigationExtras: NavigationExtras ={
      state: {
        nombre: this.nombre,
        apellido:this.apellido,
        mail:this.mail,
        clave:this.clave,
        usuario:this.usuario    
      }
    }
    this.router.navigate(['/login'], navigationExtras);
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Saludos!',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
  ngOnInit() {
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.servicioBD.fetchUsuario().subscribe(item=>{
          this.arregloUsuario = item;
        })
      }
    })
  }

  insertar(){    
    this.servicioBD.insertarUsuario(this.nombre, this.apellido, this.mail, this.nivel_educ, this.clave);
    this.registrar();
    this.servicioBD.presentToast("Usuario Creado");
  }

}
