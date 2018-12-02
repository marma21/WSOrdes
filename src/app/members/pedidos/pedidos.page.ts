import { Component, OnInit } from '@angular/core';
import {Pedido,FiredbService} from '../../services/firedb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  pedidos:Pedido[];
  constructor(private firedbservice:FiredbService,private router:Router) { }

  ngOnInit() {
    this.firedbservice.getPedidos().subscribe(res => {
      this.pedidos = res;
    });
  }
  remove(item) {
    this.firedbservice.removePedido(item.id);
  }
  gotoDetail(id?){
    if (id==null){
      this.router.navigateByUrl('/members/tabs/(pedidos:pedidos-detalle/)');
    }
    else{
      this.router.navigateByUrl('/members/tabs/(pedidos:pedidos-detalle/'+id+')');
    }
    
  }

}
