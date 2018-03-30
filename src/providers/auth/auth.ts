import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  authData = firebase.database().ref('User');

  constructor(public afireauth: AngularFireAuth, ) {
    
  }

  signin(login){
    var promise = new Promise((resolve, reject) =>{
      this.afireauth.auth.signInWithEmailAndPassword(login.email, login.password).then(() =>{
        resolve({success: true});
      }).catch((err) =>{
        resolve(err);
      })
    })

    return promise;
  }

  signup(user){
    var promise = new Promise((resolve, reject) =>{
      this.afireauth.auth.createUserWithEmailAndPassword(user.email, user.password).then(() =>{
        this.authData.child(this.afireauth.auth.currentUser.uid).set({
          userID: this.afireauth.auth.currentUser.uid,
          userName: user.name,
          userEmail: user.email
        }).then(() =>{
          resolve({success: true});
        }).catch((err) =>{
          resolve(err);
        })
      }).catch((err) =>{
        resolve(err);
      })
    })

    return promise;
  }

  signout(){
    var promise = new Promise((resolve, reject) =>{
      this.afireauth.auth.signOut().then(() =>{
        resolve({success: true});
      }).catch((err) =>{
        resolve(err);
      })
    })

    return promise;
  }

}
