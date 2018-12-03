import { Component, OnInit } from '@angular/core';
import {Listaprecios,FiredbService} from '../../services/firedb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listaprecios',
  templateUrl: './listaprecios.page.html',
  styleUrls: ['./listaprecios.page.scss'],
})
export class ListapreciosPage implements OnInit {
  listaprecios:Listaprecios[];
  constructor(private firedbservice:FiredbService,private router:Router) { }

  ngOnInit() {
    this.firedbservice.getListaprecios().subscribe(res => {
      this.listaprecios = res;
    });
  }
  remove(item) {
    this.firedbservice.removeListaprecio(item.id);
  }
  gotoDetail(id?){
    if (id==null){
      this.router.navigateByUrl('/members/tabs/(listaprecios:listaprecios-detalle/)');
    }
    else{
      this.router.navigateByUrl('/members/tabs/(listaprecios:listaprecios-detalle/'+id+')');
    }
    
  }

}
