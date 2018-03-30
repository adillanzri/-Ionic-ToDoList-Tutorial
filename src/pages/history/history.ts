import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';
import { HomePage } from '../home/home';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  todos = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public todoService: TodoProvider, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    let loader = this.loadingCtrl.create({
      content: "History loading..."
    })

    loader.present();
    this.todoService.getHistory().then((res: any) =>{
      loader.dismiss();
      this.todos = res;
    })
  }

  confirmDelete(id){
    let loader = this.loadingCtrl.create({
      content: "Delete loading..."
    })

    let toast = this.toastCtrl.create({
      message: "Delete success",
      duration: 3000
    })

    let alert = this.alertCtrl.create({
      buttons: ["Dismiss"]
    })

    loader.present();
    this.todoService.deleteTodo(id).then((res: any) =>{
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

  btnDelete(id){
    let confirm = this.alertCtrl.create({
      message: 'Are your agree to delete this todo?',
      buttons: [
        {
          text: 'Disagree'
        },
        {
          text: 'Agree',
          handler: () => {
            this.confirmDelete(id);
          }
        }
      ]
    });
    confirm.present();
  }

  btnUndone(id){
    let loader = this.loadingCtrl.create({
      content: "Status Loading..."
    })

    let toast = this.toastCtrl.create({
      message: "Status change",
      duration: 3000
    })

    let alert = this.alertCtrl.create({
      buttons: ["Dismiss"]
    })

    loader.present();
    this.todoService.undoneTodo(id).then((res: any) =>{
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
