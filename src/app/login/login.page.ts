import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BdserviceService } from '../services/bdservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = "";
  clave: string = "";

  arregloUsuarios: any = [
    {
      id: '',
      nombre:'',
      apellido: '',
      mail: '',
      clave: '',
      usuario: ''
    }
  ]

  constructor(private router: Router, private alertController: AlertController, private servicioBD: BdserviceService) {}

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  
  ngOnInit() {
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.servicioBD.fetchUsuario().subscribe(item=>{
          this.arregloUsuarios = item;
        })
      }
    })
  }
  
  logeado(){
    for(let i = 0; i < this.arregloUsuarios.length; i++) {
      if(this.arregloUsuarios[i].usuario === this.usuario && this.arregloUsuarios[i].clave === this.clave) {
        this.router.navigate(['/home']);
        break;
      }
      else{
        this.presentAlert("Usuario Incorrecto, reintentar");
      }      
    }
  }

}
