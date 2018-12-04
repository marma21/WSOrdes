import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Proveedor,Listaprecios,FiredbService} from '../../services/firedb.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listaprecios-detalle',
  templateUrl: './listaprecios-detalle.page.html',
  styleUrls: ['./listaprecios-detalle.page.scss'],
})
export class ListapreciosDetallePage implements OnInit {
  listaprecios: Listaprecios = {
    createdAt: new Date().getTime(),
    nombre:"",
    productos: [{nombre:"",unidad:"",cantidad:0,precio:0}],
    proveedor:[]
  };
  proveedores: Proveedor[];
  listapreciosId = null;
  constructor() { }

  ngOnInit() {
  }

}
