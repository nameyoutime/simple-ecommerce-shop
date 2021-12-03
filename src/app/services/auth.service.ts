import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: any;
  public admin: boolean;
  constructor(private router: Router, public auth: AngularFireAuth, private fire: AngularFirestore) {
    this.getUser();
    this.admin = false;
  }

  getUser() {
    let user: any = localStorage.getItem('user');
    if (user == "null") {
      return this.user = null;
    } else {
      this.user = JSON.parse(user)
      this.isAdmin(this.user.uid).subscribe((data:any)=>{
        this.admin = data.data().isAdmin;
      })
      return this.user;
    }
  }

  isAuthenticated() {
    let currentUser = this.getUser() || null;
    if (currentUser == null) {
      this.router.navigate(['/']);
      return false
    }
    let querry = this.fire.collection("users").doc(currentUser.uid).get();
    return querry.subscribe((data: any) => {
      if (data.data().isAdmin == true) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    })
  }

  isAdmin(uid:any) {
    let querry = this.fire.collection("users").doc(uid).get();
    return querry;
  }


  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((data: any) => {
      this.checkExists(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      this.isAdmin(data.user.uid).subscribe((data:any)=>{
        this.admin = data.data().isAdmin;
      })
    });
  }

  async checkExists(user: any) {
    const usersRef = this.fire.collection('users').doc(user.uid);
    usersRef.get().subscribe(doc => {
      if (!doc.exists) {
        this.fire.collection("users").doc(user.uid.toString()).set({ uid: user.uid, isAdmin: false });
      }
    })
  }
  logout() {
    this.auth.signOut();
    localStorage.setItem('user', JSON.stringify(null));
    this.router.navigate(['/']);
  }
}
