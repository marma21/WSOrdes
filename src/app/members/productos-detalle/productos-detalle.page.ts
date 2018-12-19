import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Listaprecios, Producto,Proveedor,FiredbService} from '../../services/firedb.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-productos-detalle',
  templateUrl: './productos-detalle.page.html',
  styleUrls: ['./productos-detalle.page.scss'],
})
export class ProductosDetallePage implements OnInit {
  
  producto: Producto = {
    createdAt: new Date().getTime(),
    nombre: "",
    ubicacion:"",
    listaprecios: [],
    proveedores:[]
};
   
  productos: Producto[];
  proveedores: any;

  productoId = null;

  constructor( public route: ActivatedRoute, 
    private nav: NavController, 
    private firedbService: FiredbService, 
    private loadingController: LoadingController,
    private alertController:AlertController) { }

  ngOnInit() {
    
    this.productoId = this.route.snapshot.params.id;
  
    if (this.productoId)  {
      this.loadPedido();
    }
    this.firedbService.getProveedores().subscribe(res => {
      this.proveedores = res.map(res => ({id:res.id,nombre:res.nombre}));
    });
  }
  async loadPedido() {
    const loading = await this.loadingController.create({
      message: 'Cargando ..'
    });
    await loading.present();
 
    this.firedbService.getProducto(this.productoId).subscribe(res => {
      loading.dismiss();
      this.producto = res;
    });
  }
 
  async saveProducto() {
 
    const loading = await this.loadingController.create({
      message: 'Grabando ..'
    });
    await loading.present();
 
    if (this.productoId) {
      this.firedbService.updateProducto(this.producto, this.productoId).then(() => {
        loading.dismiss();
        this.nav.goBack();
      });
    } else {
      this.firedbService.addProducto(this.producto).then(() => {
        loading.dismiss();
        this.nav.goBack();
      });
    }
  }

  proveedorChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
  }
}