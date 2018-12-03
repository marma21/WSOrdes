import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Proveedor {
  id?: string;
  task: string;
  priority: number;
  createdAt: number;
  nombre: string;
  email: string;
  telefono: string;
}
export interface Pedido {
  id?: string;
  createdAt: number;
  numero: number;
  proveedor:any;
}

export interface Listaprecios {
  id?: string;
  createdAt: number;
  nombre: string;
  productos: [{nombre:string,precio:number}];
  proveedor:any;
}

@Injectable({
  providedIn: 'root'
})
export class FiredbService {
  private proveedoresCollection: AngularFirestoreCollection<Proveedor>;
  private proveedores: Observable<Proveedor[]>;
  private pedidosCollection: AngularFirestoreCollection<Pedido>;
  private pedidos: Observable<Pedido[]>;
  private listapreciosCollection: AngularFirestoreCollection<Listaprecios>;
  private listaprecios: Observable<Listaprecios[]>;

  
  constructor(db: AngularFirestore) { 
  
    this.pedidosCollection = db.collection<Pedido>('pedido', ref => ref.orderBy("numero","desc"));
    this.proveedoresCollection = db.collection<Proveedor>('proveedor', ref => ref.orderBy("nombre"));
    this.listapreciosCollection = db.collection<Listaprecios>('listaprecios', ref => ref.orderBy("nombre"));
  }
/*************PROVEEDORES */
   getProveedores() {
    this.proveedores = this.proveedoresCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.proveedores;
  }
 
  getProveedor(id) {
    return this.proveedoresCollection.doc<Proveedor>(id).valueChanges();
  }
 
  updateProveedor(proveedor: Proveedor, id: string) {
    return this.proveedoresCollection.doc(id).update(proveedor);
  }
 
  addProveedor(proveedor: Proveedor) {
    return this.proveedoresCollection.add(proveedor);
  }
 
  removeProveedor(id) {
    return this.proveedoresCollection.doc(id).delete();
  }
  
/*************PEDIDOS */
getPedidos() {
  
  this.pedidos = this.pedidosCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
  return this.pedidos;
}

getPedido(id) {
  return this.pedidosCollection.doc<Pedido>(id).valueChanges();
}

updatePedido(pedido: Pedido, id: string) {
  return this.pedidosCollection.doc(id).update(pedido);
}

addPedido(pedido: Pedido) {
  return this.pedidosCollection.add(pedido);
}

removePedido(id) {
  return this.pedidosCollection.doc(id).delete();
}

/*************LISTAPRECIOS */
getListaprecios() {
  this.listaprecios = this.listapreciosCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
  return this.listaprecios;
}

getListaprecio(id) {
  return this.listapreciosCollection.doc<Listaprecios>(id).valueChanges();
}

updateListaprecio(listaprecios: Listaprecios, id: string) {
  return this.listapreciosCollection.doc(id).update(listaprecios);
}

addListaprecio(listaprecios: Listaprecios) {
  return this.listapreciosCollection.add(listaprecios);
}

removeListaprecio(id) {
  return this.listapreciosCollection.doc(id).delete();
}
}
