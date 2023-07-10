import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { InterfazClima } from '../services/interfaz-clima';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
})
export class ClimaPage implements OnInit {
  //variables para la API
  API_URL = "https://api.openweathermap.org/data/2.5/";
  API_KEY = "469987063c14287d9e978a608a18465c";
  ciudad = "";

  //variables de la APP
  clima: string = "";
  descripcion: string = "";
  tempmax: number = 0;
  tempmin: number = 0;
  humedad: number = 0;
  velviento: number = 0;
  msnm: number = 0;

  constructor(public httpClient: HttpClient) {
    this.loadData();
  }
    
  getClima(ciudad:string): Observable<InterfazClima>{
    const endpoint = `${this.API_URL}/weather?q=${ciudad}&appid=${this.API_KEY}&units=metric&lang=es`;
    console.log(this.httpClient.get<InterfazClima>(endpoint));
    return this.httpClient.get<InterfazClima>(endpoint);
  }

  obtenerClima(ciudad: string){
    this.getClima(ciudad).subscribe((data: InterfazClima)=>{
      this.clima = data.weather[0].main;
      this.descripcion = data.weather[0].description;
      this.tempmax = data.main.temp_max;
      this.tempmin = data.main.temp_min;
      this.humedad = data.main.humidity;
      this.velviento = data.wind.speed;
      this.msnm = data.main.sea_level;
    })
  }

  ngOnInit() {
  }


  buscar(){
    this.getClima(this.ciudad);
    this.obtenerClima(this.ciudad);
  }

  loadData(){
    this.obtenerClima("Santiago");
  }

}