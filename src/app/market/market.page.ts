import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { InterfazFood } from '../services/interfaz-food';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {
  API_URL="https://api.edamam.com/api/food-database/v2/parser?app_id=3a3718f3";
  API_KEY=" 57b3e5dbd0e5d2db79046b4af775f81f";

  tipo_cocina = "";
  imagen = "";
  shareAS =""; //url de la receta
  nombre = ""; //label

  arregloFood: any = [
    {
      tipo_cocina:'',
      shareAS:'',
      nombre:''
    }
  ]

  constructor(public  httpClient : HttpClient) { 
    this.buscar()
    this.loadData()
  }

  ngOnInit(){}

  getApi(){
    const endpoint = `https://api.edamam.com/api/recipes/v2?type=public&app_id=3a3718f3&app_key=%2057b3e5dbd0e5d2db79046b4af775f81f&diet=balanced&imageSize=REGULAR`;
    console.log("get api" + this.httpClient.get<InterfazFood>(endpoint));
    return this.httpClient.get<InterfazFood>(endpoint);
  }

  loadData(){
    this.httpClient.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=3a3718f3&app_key=%2057b3e5dbd0e5d2db79046b4af775f81f&diet=balanced&imageSize=REGULAR`).subscribe((results) => {
      console.log(results);
    })
  }

  buscar(){
    this.obtenerReceta();
  }

  obtenerReceta():void{
    this.getApi().subscribe((data: InterfazFood)=>{
      console.log("obtener receta inicio" + data.hits[0].recipe.label);
      for(let i = 0; i < data.hits.length; i++){
        this.arregloFood.push(data.hits[0].recipe.cuisineType[0]);
        this.arregloFood.push(data.hits[0].recipe.shareAs);
        this.arregloFood.push(data.hits[0].recipe.label);
        console.log("obtener receta" + this.arregloFood[0].nombre);
      }
    });
    
  }

}

