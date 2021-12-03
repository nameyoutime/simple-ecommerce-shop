import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AddModalComponent } from '../../components/add-modal/add-modal.component'
import { UpdateModalComponent } from '../../components/update-modal/update-modal.component'
import { DetailModalComponent } from '../../components/detail-modal/detail-modal.component'
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public data: any;
  constructor(private auth: AuthService,
    private fireSer: FirestoreService,
    private modalService: NgbModal,
    private snackBarSer: SnackBarService) { }

  ngOnInit(): void {
    this.getData();
  }



  getData() {
    this.data = this.fireSer.getAll();
  }

  openModal() {
    const modalRef = this.modalService.open(AddModalComponent);
    modalRef.componentInstance.name = 'World';
    modalRef.result.then(data => {

      this.snackBarSer.open(`added ${data.title} item`, "close", { horizontalPosition: 'end', verticalPosition: 'top', duration: 1 * 1000 });

    }).catch(err => {

    })
  }

  openUpdateModal(item: any) {
    const modalRef = this.modalService.open(UpdateModalComponent);
    modalRef.componentInstance.data = item;
    modalRef.result.then(data => {

      this.snackBarSer.open(`added ${data.title} item`, "close", { horizontalPosition: 'end', verticalPosition: 'top', duration: 1 * 1000 });

    }).catch(err => {

    })
  }
  delete(id: any) {
    this.fireSer.delete(this.auth.getUser(), id);
    this.snackBarSer.open(`delete item`, "close", { horizontalPosition: 'end', verticalPosition: 'top', duration: 1 * 1000 });

  }

  viewDetail(item: any) {
    const modalRef = this.modalService.open(DetailModalComponent);
    modalRef.componentInstance.data = item;
  }

}
