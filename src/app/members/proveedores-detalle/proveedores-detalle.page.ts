import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import {Producto,Proveedor,FiredbService} from '../../services/firedb.service';
import { IonicSelectableComponent } from 'ionic-selectable'

@Component({
  selector: 'app-proveedores-detalle',
  templateUrl: './proveedores-detalle.page.html',
  styleUrls: ['./proveedores-detalle.page.scss'],
})
export class ProveedoresDetallePage implements OnInit {
  proveedor: Proveedor = {
    task: 'test',
    createdAt: new Date().getTime(),
    priority: 2,
    nombre:'',
    email:'',
    telefono:'',
    productos:[]
  };
 
  interface 
  proveeedorId = null;
  productos:any ;
  productosfiltrados:any; 
  buscaproducto:string;
  
  constructor( public route: ActivatedRoute, private nav: NavController, private firedbService: FiredbService, private loadingController: LoadingController) { 
  }
  

  ngOnInit() {
    
    this.proveeedorId = this.route.snapshot.params.id;
  
    if (this.proveeedorId)  {
      this.loadProveedor();
    }
  }
  async loadProveedor() {
    const loading = await this.loadingController.create({
      message: 'Cargando ..'
    });
    await loading.present();
 
    this.firedbService.getProveedor(this.proveeedorId).subscribe(res => {
      loading.dismiss();
      this.proveedor = res;
   /*   res.productos.forEach(element => {
        this.productos.push(element);
      });*/
      this.productos=res.productos;
      this.productosfiltrados=res.productos;
    });
    
/*     this.firedbService.getProductos().subscribe(res => {
      
      this.productos = res.map(res => ({id:res.id,nombre:res.nombre,ubicacion:res.ubicacion}));
    }); */
  }
 
  async saveProveedor() {
 
    const loading = await this.loadingController.create({
      message: 'Grabando ..'
    });
    await loading.present();
 
    if (this.proveeedorId) {
      this.firedbService.updateProveedor(this.proveedor, this.proveeedorId).then(() => {
        loading.dismiss();
        this.nav.goBack();
      });
    } else {
      this.firedbService.addProveedor(this.proveedor).then(() => {
        loading.dismiss();
        this.nav.goBack();
      });
    }
  }

  productoChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
  }

  formatPorts(ports: Producto[]) {
    return ports.map(port => port.nombre).join(', ');
  }
  ionChange (){
    
    this.productosfiltrados = this.productos.filter((item) => {
      return item.nombre.toLowerCase().indexOf(this.buscaproducto.toLowerCase())>-1;
    });
  }
}
