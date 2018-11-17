import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

const TOKEN_KEY = 'auth-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
 
  constructor(private storage: Storage, private plt: Platform,private afAuth :  AngularFireAuth) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
    // Registro de usuario
    registerUser(email:string, password:string){
      return this.afAuth.auth.createUserWithEmailAndPassword( email, password)
      .then((res)=>{
       // El usuario se ha creado correctamente.
      })
      .catch(err=>Promise.reject(err))
   }

    // Login de usuario
 loginUser(email:string, password:string){
  return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(user=>{Promise.resolve(user)
      this.authenticationState.next(true);
    console.log("login");})
    .catch(err=>Promise.reject(err))
}

 // Logout de usuario
 logout(){
  this.afAuth.auth.signOut().then(()=>{
    // hemos salido
  })
}

// Devuelve la session
get Session(){
  return this.afAuth.authState;
 }

checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
 
  login() {
    return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
      this.authenticationState.next(true);
    });
  }
 
  logout_old() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
}