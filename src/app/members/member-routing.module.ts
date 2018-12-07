import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [ 
  //{ path: '', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  //{ path: 'proveedores', loadChildren: './proveedores/proveedores.module#ProveedoresPageModule' },
  //{ path: 'pedidos', loadChildren: './pedidos/pedidos.module#PedidosPageModule' },
  //{ path: 'listaprecios', loadChildren: './listaprecios/listaprecios.module#ListapreciosPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
  { path: 'productos', loadChildren: './productos/productos.module#ProductosPageModule' },
  { path: 'productos-detalle', loadChildren: './productos-detalle/productos-detalle.module#ProductosDetallePageModule' },
 // { path: 'pedidos-detalle', loadChildren: './pedidos-detalle/pedidos-detalle.module#PedidosDetallePageModule' },
 // { path: 'listaprecios-detalle', loadChildren: './listaprecios-detalle/listaprecios-detalle.module#ListapreciosDetallePageModule' },
  //{ path: 'proveedoresDetalle', loadChildren: './proveedores-detalle/proveedores-detalle.module#ProveedoresDetallePageModule' },
];
 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }