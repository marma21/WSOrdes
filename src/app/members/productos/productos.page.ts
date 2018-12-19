import { Component, OnInit } from '@angular/core';
import {Producto,FiredbService} from '../../services/firedb.service';
import { Router } from '@angular/router';
import { TabDelegate } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productos: Producto[];

  constructor(private firedbservice:FiredbService,private router:Router) { }

  ngOnInit() {
    this.firedbservice.getProductos().subscribe(res => {
      this.productos = res;
    });
    
  }
  remove(item) {
    this.firedbservice.removeProducto(item.id);
  }
  gotoDetail(id?){
    if (id==null){
      this.router.navigateByUrl('/members/tabs/(productos:productos-detalle/)');
    }
    else{
      this.router.navigateByUrl('/members/tabs/(productos:productos-detalle/'+id+')');
    }
    
  }
}
