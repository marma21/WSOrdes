import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { ProveedoresPage } from '../proveedores/proveedores.page';
import {ListapreciosPage} from '../listaprecios/listaprecios.page';
import {PedidosPage} from '../pedidos/pedidos.page';

//const routes: Routes = [
//  {
//    path: '',
//    component: DashboardPage
//  }
//];

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/(proveedores:proveedores)',
        pathMatch: 'full',
      },
      {
        path: 'proveedores',
        outlet: 'proveedores',
        component: ProveedoresPage
      },
      {
        path: 'about',
        outlet: 'about',
        component: PedidosPage
      },
      {
        path: 'contact',
        outlet: 'contact',
        component: ListapreciosPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard/(proveedores:proveedores)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [DashboardPage,ProveedoresPage,ListapreciosPage,PedidosPage]
})
export class DashboardPageModule {}
