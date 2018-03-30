import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';
import { HomePage } from '../home/home';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  todo = {
    todo: "",
    date: "",
    time: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public todoService: TodoProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  btnAdd(){
    let loader = this.loadingCtrl.create({
      content: "Create loading..."
    })

    let toast = this.toastCtrl.create({
      message: "Create success",
      duration: 3000
    })

    let alert = this.alertCtrl.create({
      buttons: ["Dismiss"]
    })

    loader.present();
    this.todoService.createTodo(this.todo).then((res: any) =>{
      if(res.sucess){
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
