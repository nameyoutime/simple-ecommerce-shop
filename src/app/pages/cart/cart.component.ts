import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckOutModalComponent } from 'src/app/components/check-out-modal/check-out-modal.component';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public data: any;
  constructor(private snackBarSer:SnackBarService,private modalService: NgbModal,private fireSer:FirestoreService) {
    this.data = localStorage.getItem('cart')
    this.data = JSON.parse(this.data);
  }

  ngOnInit(): void {
  }


  minus(index: any) {
    if (this.data[index].buy > 1) {
      this.data[index].buy--;
    }
    localStorage.setItem('cart', JSON.stringify(this.data));
  }

  plush(index: any) {
    this.data[index].buy++;
    localStorage.setItem('cart', JSON.stringify(this.data));
  }

  delete(index: any) {
    this.snackBarSer.open(`deleted ${this.data[index].title} from cart`, "close", { horizontalPosition:'end',verticalPosition:'top',duration: 1 * 1000 });
    this.data.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.data));

  }
  viewCheckOut() {
    let data: any = localStorage.getItem('cart')
    data = JSON.parse(data);
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      let sl = data[i].buy;
      let gia = data[i].price;
      let result = sl * gia;
      total += result;
    }

    const modalRef = this.modalService.open(CheckOutModalComponent);
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.total = total;
    modalRef.componentInstance.show = true;
    modalRef.result.then(data=>{
      this.data = data;
      localStorage.setItem('cart', JSON.stringify(data));

    }).catch(err=>{
      
    })
  }

}
