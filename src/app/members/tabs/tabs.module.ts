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

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    PedidosPageModule,
    ListapreciosPageModule,
    ProveedoresPageModule,
    ProveedoresDetallePageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
