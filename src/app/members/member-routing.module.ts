import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [ 
  //{ path: '', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  //{ path: 'proveedores', loadChildren: './proveedores/proveedores.module#ProveedoresPageModule' },
  //{ path: 'pedidos', loadChildren: './pedidos/pedidos.module#PedidosPageModule' },
  //{ path: 'listaprecios', loadChildren: './listaprecios/listaprecios.module#ListapreciosPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
  //{ path: 'proveedoresDetalle', loadChildren: './proveedores-detalle/proveedores-detalle.module#ProveedoresDetallePageModule' },
];
 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }