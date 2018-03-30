import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {

  todoData = firebase.database().ref('todo');

  constructor(public afireauth: AngularFireAuth) {
    
  }

  createTodo(todo){
    var promise = new Promise((resolve, reject) =>{
      let id = this.todoData.child('todo').push().key;

      this.todoData.child(id).set({
        todoID: id,
        todoNote: todo.todo,
        todoDate: todo.date,
        todoTime: todo.time,
        todoStatus: "Undone",
        todoOwner: this.afireauth.auth.currentUser.uid
      }).then(() =>{
        resolve({sucess: true});
      }).catch((err) =>{
        resolve(err);
      })
    })

    return promise;
  }

  getTodo(){
    let data = [];
    let result = [];
    var promise = new Promise((resolve, reject) =>{
      this.todoData.orderByChild('todoDate').once('value', (snapshot) =>{
        data = snapshot.val();

        for(var list in data){
          if(data[list].todoOwner == this.afireauth.auth.currentUser.uid && data[list].todoStatus == "Undone"){
            result.push(data[list]);
          }
        }
      }).then(() =>{
        resolve(result);
      }).catch((err) =>{
        resolve(err);
      })
    })

    return promise;
  }

  getHistory(){
    let data = [];
    let result = [];
    var promise = new Promise((resolve, reject) =>{
      this.todoData.orderByChild('todoDate').once('value', (snapshot) =>{
        data = snapshot.val();

        for(var list in data){
          if(data[list].todoOwner == this.afireauth.auth.currentUser.uid && data[list].todoStatus == "Done"){
            result.push(data[list]);
          }
        }
      }).then(() =>{
        resolve(result);
      }).catch((err) =>{
        resolve(err);
      })
    })

    return promise;
  }

  editTodo(id){
    let data = [];
    var promise = new Promise((resolve, reject) =>{
      this.todoData.child(id).once('value', (snapshot) =>{
        data = snapshot.val();
      }).then(() =>{
        resolve(data);
      }).catch((err) =>{
        resolve(err);
      })
    })

    return promise;
  }

  updateTodo(todo){
    var promise = new Promise((resolve, reject) =>{
      this.todoData.child(todo.id).set({
        todoID: todo.id,
        todoNote: todo.note,
        todoDate: todo.date,
        todoTime: todo.time,
        todoStatus: todo.status,
        todoOwner: todo.owner
      }).then(() =>{
        resolve({success: true});
      }).catch((err) =>{
        resolve(err);
      })
    })

    return promise;
  }

  deleteTodo(id){
    var promise = new Promise((resolve, reject) =>{
      this.todoData.child(id).remove().then(() =>{
        resolve({success: true});
      }).catch((err) =>{
        resolve(err);
      })
    })

    return promise;
  }

  doneTodo(id){
    var promise = new Promise((resolve, reject) =>{
      this.todoData.child(id).child("todoStatus").set("Done").then(() =>{
        resolve({success: true});
      }).catch((err) =>{
        resolve(err);
      })
    })

    return promise;
  }

  undoneTodo(id){
    var promise = new Promise((resolve, reject) =>{
      this.todoData.child(id).child("todoStatus").set("Undone").then(() =>{
        resolve({success: true});
      }).catch((err) =>{
        resolve(err);
      })
    })

    return promise;
  }

}
