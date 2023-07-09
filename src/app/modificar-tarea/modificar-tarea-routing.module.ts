import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarTareaPage } from './modificar-tarea.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarTareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarTareaPageRoutingModule {}
