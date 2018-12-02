import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { PedidosPage } from '../pedidos/pedidos.page';
import { ProveedoresPage } from '../proveedores/proveedores.page';
import { ProveedoresDetallePage } from '../proveedores-detalle/proveedores-detalle.page';
import { ListapreciosPage } from '../listaprecios/listaprecios.page';
import { PedidosDetallePage } from '../pedidos-detalle/pedidos-detalle.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/members/tabs/(pedidos:pedidos)',
        pathMatch: 'full',
      },
      {
        path: 'pedidos',
        outlet: 'pedidos',
        component: PedidosPage
      },
      {
        path: 'pedidos-detalle/:id',
        outlet: 'pedidos',
        component: PedidosDetallePage
      },
      {
        path: 'proveedores',
        outlet: 'proveedores',
        component: ProveedoresPage
      },
      {
        path: 'proveedores-detalle/:id',
        outlet: 'proveedores',
        component: ProveedoresDetallePage
      },
      {
        path: 'listaprecios',
        outlet: 'listaprecios',
        component: ListapreciosPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/members/tabs/(pedidos:pedidos)',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
