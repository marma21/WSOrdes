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
  priority: number;
  createdAt: number;
  numero: number;
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
  constructor(db: AngularFirestore) {
    this.proveedoresCollection = db.collection<Proveedor>('proveedor');
    this.pedidosCollection = db.collection<Pedido>('pedido');
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
}
