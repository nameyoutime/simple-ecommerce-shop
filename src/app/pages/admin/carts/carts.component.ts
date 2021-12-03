import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckOutModalComponent } from 'src/app/components/check-out-modal/check-out-modal.component';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {
  public data: any;
  constructor(private fireSer: FirestoreService,
    private modalService: NgbModal,
    private snackBarSer:SnackBarService
    ) {
    this.data = this.fireSer.getCart()
  }

  ngOnInit(): void {
  }
  showDetail(items:any,total:any){
    const modalRef = this.modalService.open(CheckOutModalComponent);
    modalRef.componentInstance.data = items;
    modalRef.componentInstance.total = total;
    modalRef.componentInstance.show = false;
    modalRef.result.then(data=>{
      this.data = data;
      localStorage.setItem('cart', JSON.stringify(data));

    }).catch(err=>{
      
    })

  }
  delete(id:any){
    this.fireSer.deleteItemCart(id);
    this.snackBarSer.open(`Done ${id}`, "close", { horizontalPosition: 'end', verticalPosition: 'top', duration: 1 * 1000 });

  }

}
