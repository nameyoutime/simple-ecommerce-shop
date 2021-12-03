import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }

  getAll() {
    return this.afs.collection("Items").valueChanges();
  }
  getCart() {
    return this.afs.collection("carts").valueChanges();
  }

  deleteItemCart(id: any) {
    this.afs.collection("carts").doc(id).delete();
  }

  createCart(items: any, total: any, uid: any) {
    if (items.length == 0) {
      return;
    }
    let newCart = {
      id: this.afs.createId(),
      total: total,
      items: items,
      uid: uid
    };
    this.afs.collection('carts').doc(newCart.id).set(newCart);
  }
  createItem(user: any, newItem: any) {
    if (user == null) {
      alert("pls login");
    } else {

      newItem = {
        id: this.afs.createId(),
        user: user.uid,
        ...newItem
      };
      this.afs.collection("Items").doc(newItem.id.toString()).set(newItem);
    }
  }

  UpdateItem(user: any, item: any) {
    if (user == null) {
      alert("pls login!");
    } else {

      this.afs.collection("Items").doc(item.id.toString()).update(item);
    }
  }

  delete(user: any, id: any) {
    if (user == null) {
      alert("pls login!");
    } else {

      this.afs.collection("Items").doc(id.toString()).delete();
    }

  }
}
