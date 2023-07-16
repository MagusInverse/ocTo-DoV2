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
    console.log("entre al log shushetumare");
    for(let i = 0; i < this.arregloUsuarios.length; i++) {
      console.log("for "+ i);
      console.log(this.arregloUsuarios.length);
      console.log(this.arregloUsuarios);
      if(this.arregloUsuarios[i].usuario === this.usuario && this.arregloUsuarios[i].clave === this.clave) {
        console.log(this.arregloUsuarios[i].usuario + "--" + this.arregloUsuarios[i].clave);
        this.router.navigate(['/home']);
        break;
      }
      else{
        this.presentAlert("Usuario Incorrecto, reintentar");
      }      
    }
  }

}
