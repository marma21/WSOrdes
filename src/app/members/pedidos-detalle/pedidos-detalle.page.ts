import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Producto, Pedido,Proveedor,FiredbService} from '../../services/firedb.service';
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
    proveedor: [],
    estado:"Iniciado",
    listaprecios:"",
    productos:[] 
   };

  proveedores: any;
  productos: any;
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
      //this.proveedores = res.map(res => ({id:res.id,nombre:res.nombre,telefono:res.telefono,}));
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
      this.loadProductos();
    });
  }
 
  async loadProductos() {
    const loading = await this.loadingController.create({
      message: 'Cargando ..'
    });
    await loading.present();
 
    this.firedbService.getProveedor(this.pedido.proveedor.id).subscribe(res => {
      loading.dismiss();
      this.productos = res.productos;
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
  proveedorChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {console.log(event.value)
    if (event.value){
      this.productos=event.value.productos;
    }
    
  }

  productoChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
  }

  
  formatPorts(ports: Producto[]) {
    return ports.map(port => port.nombre).join(',');
  }

  sendWS(){
    this.savePedido();

    let mensaje = "*Pedido:*\r\n"+this.pedido.productos.map(port => port.nombre + ": " + port.cantidad + port.unidad).join('\r\n');
    this.pedido.estado="Enviado";
    this.socialSharing.shareViaWhatsAppToReceiver(this.pedido.proveedor.telefono,mensaje).then( async a=>{
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


  sendEmail(){
    let mensaje = "*Pedido:*\r\n"+this.pedido.productos.map(port => port.nombre + ": " + port.cantidad + port.unidad).join('\r\n');
    this.pedido.estado="Enviado";
    this.socialSharing.shareViaEmail(mensaje, 'Pedido:'+this.pedido.numero, [this.pedido.proveedor.email]).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
}
