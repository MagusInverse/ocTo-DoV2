import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarTareaPageRoutingModule } from './modificar-tarea-routing.module';

import { ModificarTareaPage } from './modificar-tarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarTareaPageRoutingModule
  ],
  declarations: [ModificarTareaPage]
})
export class ModificarTareaPageModule {}
