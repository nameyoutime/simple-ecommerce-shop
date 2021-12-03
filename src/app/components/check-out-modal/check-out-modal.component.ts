import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-check-out-modal',
  templateUrl: './check-out-modal.component.html',
  styleUrls: ['./check-out-modal.component.scss']
})
export class CheckOutModalComponent implements OnInit {
  @Input() data: any;
  @Input() total: any;
  @Input() show: any;
  constructor(private snackBarSer:SnackBarService,private authSer:AuthService,public activeModal: NgbActiveModal,private fireSer:FirestoreService) { }

  ngOnInit(): void {
  
  }
  close(){
    this.fireSer.createCart(this.data,this.total,this.authSer.getUser().uid);
    this.snackBarSer.open(`checkout bill`, "close", { horizontalPosition:'end',verticalPosition:'top',duration: 1 * 1000 });

    this.activeModal.close([])
  }

}
