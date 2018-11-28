import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Proveedor {
  id?: string;
  task: string;
  priority: number;
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class FiredbService {
  private proveedoresCollection: AngularFirestoreCollection<Proveedor>;
 
  private proveedores: Observable<Proveedor[]>;
  constructor(db: AngularFirestore) {
    this.proveedoresCollection = db.collection<Proveedor>('proveedor');
 
    this.proveedores = this.proveedoresCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }
   getProveedores() {
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
}
