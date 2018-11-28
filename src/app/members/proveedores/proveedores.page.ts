import { Component, OnInit } from '@angular/core';
import {Proveedor,FiredbService} from '../../services/firedb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {

  proveedores: Proveedor[];

  constructor(private firedbservice:FiredbService,private router:Router) { }

  ngOnInit() {
    this.firedbservice.getProveedores().subscribe(res => {
      this.proveedores = res;
    });
  }
  remove(item) {
    this.firedbservice.removeProveedor(item.id);
  }
  gotoDetail(){
    this.router.navigateByUrl('/members/tabs/(proveedores:proveedores-detalle)');
  }
}
