import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { InterfazFood } from '../services/interfaz-food';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {

  tipo_cocina1: any = "";
  shareAS1 =""; 
  nombre1 = ""; 

  constructor(public  httpClient : HttpClient) { 
    this.loadData()
    this.obtenerReceta()
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

  obtenerReceta():void{
    this.getApi().subscribe((data: InterfazFood)=>{
      this.nombre1 = data.hits[0].recipe.label;
      this.shareAS1 = data.hits[0].recipe.shareAs;
      this.tipo_cocina1 = data.hits[0].recipe.cuisineType;
      console.log("obtener receta inicio" + data.hits[0].recipe.label);
      for(let i = 0; i < data.hits.length; i++){
        console.log("titulos de recetas: " + data.hits[i].recipe.label);
        console.log("tipo de cocina de recetas: " + data.hits[i].recipe.cuisineType);
        console.log("url de recetas: " + data.hits[i].recipe.shareAs);
      }
    });
  }

}

