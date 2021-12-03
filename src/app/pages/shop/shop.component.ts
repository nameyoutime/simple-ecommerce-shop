import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { DetailModalComponent } from '../../components/detail-modal/detail-modal.component'


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  public data: any;
  constructor(private snackBarSer: SnackBarService, private fireSer: FirestoreService, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.data = this.fireSer.getAll();
  }
  addToCart(item: any) {
    let data: any = localStorage.getItem('cart')
    data = JSON.parse(data);
    let index = 0;
    let flag: boolean = true;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == item.id) {
        flag = false;
        index = i;
        break;
      }
    }
    if (flag) {
      data.push({ buy: 1, ...item })

    } else {
      data[index].buy++;
    }
    this.snackBarSer.open(`added ${item.title} to cart`, "close", { horizontalPosition:'end',verticalPosition:'top',duration: 1 * 1000 });

    localStorage.setItem('cart', JSON.stringify(data));
  }
  viewDetail(item: any) {
    const modalRef = this.modalService.open(DetailModalComponent);
    modalRef.componentInstance.data = item;
  }

}
