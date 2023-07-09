import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from './producto';
import { Tarea } from './tarea';

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
                         
  registroProducto: string = "INSERT OR IGNORE INTO PRODUCTO (id, nombre, detalle, cantidad) VALUES(1, 'BEBIDA', 'BEBIDA DE FANTASIA SABOR COLA', 4);";
  registroTarea: string = "INSERT OR IGNORE INTO TAREA (id, titulo, detalle) VALUES(1, 'Compras', 'hacer lista supermercado');";

  listaProducto = new BehaviorSubject([]);
  listaTarea = new BehaviorSubject([]);

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

    crearBD(){
      this.platform.ready().then(()=>{
        this.sqlite.create({
          name:'bdproducto.db',
          location: 'default'
        }).then((db: SQLiteObject)=>{
          this.database = db;
          this.crearTablas();
          this.crearTablaTarea();
        }).catch(e=>{
          this.presentToast("Error en la creación de la BD" + e);
        })
      })
    }

    async crearTablas(){
      try{
        await this.database.executeSql(this.tablaProducto,[]);
        await this.database.executeSql(this.registroProducto,[]);
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
