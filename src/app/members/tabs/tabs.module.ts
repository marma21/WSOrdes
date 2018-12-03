import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { ProveedoresPageModule } from '../proveedores/proveedores.module';
import { ListapreciosPageModule } from '../listaprecios/listaprecios.module';
import { PedidosPageModule } from '../pedidos/pedidos.module';
import { ProveedoresDetallePageModule } from '../proveedores-detalle/proveedores-detalle.module';
import { PedidosDetallePageModule } from '../pedidos-detalle/pedidos-detalle.module';
import { ListapreciosDetallePageModule } from '../listaprecios-detalle/listaprecios-detalle.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    PedidosPageModule,
    ListapreciosPageModule,
    ProveedoresPageModule,
    ProveedoresDetallePageModule,
    PedidosDetallePageModule,
    ListapreciosDetallePageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
