import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import {Pedido,Proveedor,FiredbService} from '../../services/firedb.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pedidos-detalle',
  templateUrl: './pedidos-detalle.page.html',
  styleUrls: ['./pedidos-detalle.page.scss'],
})
export class PedidosDetallePage implements OnInit {
  pedido: Pedido = {
    createdAt: new Date().getTime(),
    numero:new Date().getTime(),
    proveedor: []
  };
  proveedores: Proveedor[];
  pedidoId = null;

  constructor( public route: ActivatedRoute, 
    private nav: NavController, 
    private firedbService: FiredbService, 
    private loadingController: LoadingController,
    private socialSharing: SocialSharing,
    private alertController:AlertController) { }

  ngOnInit() {
    
    this.pedidoId = this.route.snapshot.params.id;
  
    if (this.pedidoId)  {
      this.loadPedido();
    }
    this.firedbService.getProveedores().subscribe(res => {
      this.proveedores = res;
    });
  }
  async loadPedido() {
    const loading = await this.loadingController.create({
      message: 'Cargando ..'
    });
    await loading.present();
 
    this.firedbService.getPedido(this.pedidoId).subscribe(res => {
      loading.dismiss();
      this.pedido = res;
    });
  }
 
  async savePedido() {
 
    const loading = await this.loadingController.create({
      message: 'Grabando ..'
    });
    await loading.present();
 
    if (this.pedidoId) {
      this.firedbService.updatePedido(this.pedido, this.pedidoId).then(() => {
        loading.dismiss();
        this.nav.goBack();
      });
    } else {
      this.firedbService.addPedido(this.pedido).then(() => {
        loading.dismiss();
        this.nav.goBack();
      });
    }
  }
  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
  }

  sendWS(){
    this.socialSharing.shareViaWhatsAppToReceiver(this.pedido.proveedor.telefono,"hola mundo").then( async a=>{
      let alert = await this.alertController.create({
        header: 'Exito',
        message: 'Se envio el mensaje al teléfono:' +this.pedido.proveedor.telefono,
        buttons: ['Aceptar']
      });
      await alert.present();
    }).catch(async err=>{
      let alert = await this.alertController.create({
        header: 'Error',
        message: 'No se puede enviar el mensaje al teléfono:' +this.pedido.proveedor.telefono,
        buttons: ['Aceptar']
      });
      await alert.present();
    })
  }
}
