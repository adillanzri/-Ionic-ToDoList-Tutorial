import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  login = {
    email: "",
    password: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController, public authService: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  btnSignup(){
    this.navCtrl.push(SignupPage);
  }

  btnSignin(){
    let loader = this.loadingCtrl.create({
      content: "Signin loading..."
    })

    let toast = this.toastCtrl.create({
      message: "Signin success",
      duration: 3000
    })

    let alert = this.alertCtrl.create({
      buttons: ["Dismiss"]
    })

    loader.present();
    this.authService.signin(this.login).then((res: any) =>{
      if(res.success){
        loader.dismiss();
        toast.present();
        this.navCtrl.setRoot(HomePage);
      }
      else{
        loader.dismiss();
        alert.setMessage(res);
        alert.present();
      }
    })
  }

}
