import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from './producto';
import { Tarea } from './tarea';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class BdserviceService {
  public database!: SQLiteObject;

  tablaProducto: string = "CREATE TABLE IF NOT EXISTS producto("+
                         "id INTEGER PRIMARY KEY AUTOINCREMENT,"+
                         "nombre VARCHAR(40) NOT NULL,"+
                         "detalle VARCHAR(60) NOT NULL,"+
                         "cantidad NUMBER NOT NULL);";
  
  tablaTarea: string = "CREATE TABLE IF NOT EXISTS tarea("+
                         "id INTEGER PRIMARY KEY AUTOINCREMENT,"+
                         "titulo VARCHAR(40) NOT NULL,"+
                         "detalle VARCHAR(60) NOT NULL);";
  
  tablaUsuario: string = " CREATE TABLE IF NOT EXISTS USUARIO( "+
                         "ID_USER    INTEGER PRIMARY KEY AUTOINCREMENT,"+
                         "NOMBRE		  VARCHAR(40) NOT NULL, "+
                         "APELLIDO	  VARCHAR(40) NOT NULL, "+
                         "MAIL		    VARCHAR(100) NOT NULL, "+
                         "CLAVE      VARCHAR(15) NOT NULL,"+
                         "USER       VARCHAR(15) NOT NULL);";
                         
  registroProducto: string = "INSERT OR IGNORE INTO PRODUCTO (id, nombre, detalle, cantidad) VALUES(1, 'BEBIDA', 'BEBIDA DE FANTASIA SABOR COLA', 4);";
  registroTarea: string = "INSERT OR IGNORE INTO TAREA (id, titulo, detalle) VALUES(1, 'Compras', 'hacer lista supermercado');";
  registrarUsuario: string = "INSERT OR IGNORE INTO USUARIO(ID_USER, NOMBRE, APELLIDO, MAIL, NIVEL_EDUC, CLAVE, USER) VALUES(0,'Felix','Donoso', 'fe.donoso@duocuc.cl', 'universitaria', '12345', 'fdonoso');" ;

  listaProducto = new BehaviorSubject([]);
  listaTarea = new BehaviorSubject([]);
  listaUsuarios = new BehaviorSubject([]);

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(private toastController: ToastController, private sqlite: SQLite, private platform: Platform) {
    this.crearBD();
  }

    async presentToast(msj:string) {
      const toast = await this.toastController.create({
        message: msj,
        duration: 1500,
        position: 'bottom',
        icon: 'globe',
      });
      await toast.present();
    }

    dbState(){
      return this.isDBReady.asObservable();
    }

    fetchProducto(): Observable<Producto[]>{
      return this.listaProducto.asObservable();
    }

    fetchTarea(): Observable<Tarea[]>{
      return this.listaTarea.asObservable();
    }

    fetchUsuario(): Observable<Usuario[]>{
      return this.listaUsuarios.asObservable();
    }

    crearBD(){
      this.platform.ready().then(()=>{
        this.sqlite.create({
          name:'bdproducto.db',
          location: 'default'
        }).then((db: SQLiteObject)=>{
          this.database = db;
          this.crearTablas();
          this.crearTablaTarea();
          this.crearTablaUsuario();
        }).catch(e=>{
          this.presentToast("Error en la creación de la BD" + e);
        })
      })
    }

    async crearTablas(){
      try{
        await this.database.executeSql(this.tablaProducto,[]);
        await this.database.executeSql(this.registroProducto,[]);
        await this.database.executeSql(this.registrarUsuario, []);
        this.buscarProducto()
        this.isDBReady.next(true);
      
      }catch(e){
        this.presentToast("Error en la creación de las tablas" + e);
      }
    }

    async crearTablaTarea(){
      try{
        await this.database.executeSql(this.tablaTarea,[]);
        await this.database.executeSql(this.registroTarea,[]);
        this.buscarTarea()
        this.isDBReady.next(true);
      
      }catch(e){
        this.presentToast("Error en la creación de las tablas" + e);
      }
    }

    async crearTablaUsuario(){
      try{
        await this.database.executeSql(this.tablaUsuario, []);
        await this.database.executeSql(this.registrarUsuario, []);
        this.buscarUsuario();
        this.isDBReady.next(true);
      }
      catch(e){
        this.presentToast("Error en tabla de db: " + e);
        console.log("error pesado de crear tabla usuario "+ e);
      }
  }

    buscarProducto(){
      return this.database.executeSql('SELECT * FROM producto;',[]).then(res=>{
        let items: Producto[] = [];
        if(res.rows.length > 0){
          for(var i= 0; i<res.rows.length; i++){
            items.push({
              id: res.rows.item(i).id,
              nombre: res.rows.item(i).nombre,
              detalle: res.rows.item(i).detalle,
              cantidad: res.rows.item(i).cantidad,
            })
          }
        }
        this.listaProducto.next(items as any);
      })
    }

    buscarTarea(){
      return this.database.executeSql('SELECT * FROM tarea;',[]).then(res=>{
        let items: Tarea[] = [];
        if(res.rows.length > 0){
          for(var i= 0; i<res.rows.length; i++){
            items.push({
              id: res.rows.item(i).id,
              titulo: res.rows.item(i).titulo,
              detalle: res.rows.item(i).detalle
            })
          }
        }
        this.listaTarea.next(items as any);
      })
    }

    buscarUsuario(){
      return this.database.executeSql('SELECT * FROM USUARIO',[]).then(res=>{
        let items: Usuario[] = [];
        if(res.rows.length > 0){
          for(var i= 0; i<res.rows.length; i++){
            items.push({
              id: res.rows.item(i).ID_USER,
              nombre: res.rows.item(i).NOMBRE,
              apellido: res.rows.item(i).APELLIDO,
              mail: res.rows.item(i).MAIL,
              clave: res.rows.item(i).CLAVE,
              usuario: res.rows.item(i).USER
            })
          }
        }
        this.listaUsuarios.next(items as any);
      })
    }

    insertarProducto(nombre: any, detalle: any, cantidad: any){
      let data = [nombre,detalle,cantidad];
      return this.database.executeSql('INSERT INTO producto(nombre,detalle,cantidad) VALUES (?,?,?)',data).then(res=>{
        this.buscarProducto();
      });
    }

    insertarTarea(titulo: any, detalle: any){
      let data = [titulo,detalle];
      return this.database.executeSql('INSERT INTO tarea(titulo,detalle) VALUES (?,?)',data).then(res=>{
        this.buscarTarea();
      });
    }

    insertarUsuario(nombre: any, apellido:any, mail:any, clave:any, user:any){
      let data = [nombre, apellido, mail, clave, user];
      return this.database.executeSql('INSERT INTO USUARIO(NOMBRE, APELLIDO, MAIL, CLAVE, USER) VALUES(?,?,?,?,?)', data).then(res=>{
        this.buscarUsuario();
      })
    }
  
    modificarProducto(id: any,nombre: any,detalle: any,cantidad: any){
        let data = [nombre,detalle,cantidad,id];
        return this.database.executeSql('UPDATE producto SET nombre = ?, detalle = ?, cantidad = ? WHERE id = ?', data).then(data2=>{
          this.buscarProducto();
        })
    }

    modificarTarea(id: any,titulo: any,detalle: any){
      let data = [titulo,detalle,id];
      return this.database.executeSql('UPDATE tarea SET titulo = ?, detalle = ? WHERE id = ?', data).then(data2=>{
        this.buscarTarea();
      })
    }

    modificarUsuario(id:any, nombre: any, apellido:any, mail:any, nivel_educ:any, clave:any, user:any){
      let data = [id, nombre, apellido, mail, nivel_educ, clave, user];
      return this.database.executeSql('UPDATE USUARIO SET NOMBRE=?, APELLIDO=?, MAIL=? WHERE USER=? AND ID_USER=?', data).then(data2=>{
        this.buscarUsuario();
      })
    }
  
    eliminarProducto(id: any){
        return this.database.executeSql('DELETE FROM producto WHERE id = ?',[id]).then(a=>{
          this.buscarProducto();
        })
    }

    eliminarTarea(id: any){
      return this.database.executeSql('DELETE FROM tarea WHERE id = ?',[id]).then(a=>{
        this.buscarTarea();
      })
    }

  }
