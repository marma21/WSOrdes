import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user= { email : '', password : ''};
  constructor(private authService: AuthenticationService,public alertController: AlertController) { }
 
  ngOnInit() {
  }
 
  login()
  {
      this.authService.loginUser(this.user.email,this.user.password ).then((user) => {
        }
      )
       .catch(async err=>{
        let alert = await this.alertController.create({
          header: 'Error',
          message: err.message,
          buttons: ['Aceptar']
        });
        await alert.present();
      })
    }


  signin(){
    this.authService.registerUser(this.user.email,this.user.password)
    .then((user) => {
      // El usuario se ha creado correctamente
    })
    .catch(async err=>{
      const alert =   await this.alertController.create({
        header: 'Error',
        message: err.message,
        buttons: ['Aceptar']
      });
      await alert.present();
    })
  }
  
}