import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';
import { HomePage } from '../home/home';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  result;
  data = {
    id: "",
    owner: "",
    note: "",
    date: "",
    time: "",
    status: ""
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, public todoService: TodoProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    let id = this.navParams.get("editID");

    let loader = this.loadingCtrl.create({
      content: "Signup loading..."
    })

    loader.present();
    this.todoService.editTodo(id).then((res: any) =>{
      loader.dismiss();
      this.result = res;

      this.data = {
        id: this.result.todoID,
        owner: this.result.todoOwner,
        note: this.result.todoNote,
        date: this.result.todoDate,
        time: this.result.todoTime,
        status: this.result.todoStatus
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  btnUpdate(){
    let loader = this.loadingCtrl.create({
      content: "Update loading..."
    })

    let toast = this.toastCtrl.create({
      message: "Update success",
      duration: 3000
    })

    let alert = this.alertCtrl.create({
      buttons: ["Dismiss"]
    })

    loader.present();
    this.todoService.updateTodo(this.data).then((res: any) =>{
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
