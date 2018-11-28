import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import {Proveedor,FiredbService} from '../../services/firedb.service';

@Component({
  selector: 'app-proveedores-detalle',
  templateUrl: './proveedores-detalle.page.html',
  styleUrls: ['./proveedores-detalle.page.scss'],
})
export class ProveedoresDetallePage implements OnInit {
  proveedor: Proveedor = {
    task: 'test',
    createdAt: new Date().getTime(),
    priority: 2
  };
 
  proveeedorId = null;

  constructor( public route: ActivatedRoute, private nav: NavController, private firedbService: FiredbService, private loadingController: LoadingController) { }

  ngOnInit() {
    
    this.proveeedorId = this.route.snapshot.params.id;
    if (this.proveeedorId)  {
      this.loadProveedor();
    }
  }
  async loadProveedor() {
    const loading = await this.loadingController.create({
      message: 'Loading ..'
    });
    await loading.present();
 
    this.firedbService.getProveedor(this.proveeedorId).subscribe(res => {
      loading.dismiss();
      this.proveedor = res;
    });
  }
 
  async saveProveedor() {
 
    const loading = await this.loadingController.create({
      message: 'Saving ..'
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
}
