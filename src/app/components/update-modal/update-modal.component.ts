import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent implements OnInit {
  @Input() data: any;
  public form: any;
  private file: any;
  private fileChanged: boolean;
  constructor(private auth: AuthService, private fireSer: FirestoreService, public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.fileChanged = false;
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      id: new FormControl(this.data.id, Validators.required),
      title: new FormControl(this.data.title, Validators.required),
      description: new FormControl(this.data.description, Validators.required),
      price: new FormControl(this.data.price, Validators.required),
      quanlity: new FormControl(this.data.quanlity, Validators.required),
      img: new FormControl(this.data.img, Validators.required),
    })
  }
  onFileChange(event: any) {

    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let result = reader.result
      this.file = result;
      this.fileChanged = true;
    };

  }
  onSubmit() {
    if(this.fileChanged){
      this.form.controls['img'].setValue(this.file);
    }
    if (this.form.invalid) {
      return;
    }
    this.fireSer.UpdateItem(this.auth.getUser(), this.form.value);
    this.activeModal.close(this.form.value);
  }

}
