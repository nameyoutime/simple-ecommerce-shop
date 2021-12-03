import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
  @Input() name: any;
  public form: any;
  public file : any;
  constructor(private auth: AuthService, private fireSer: FirestoreService, public activeModal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      quanlity: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required),
    })
  }

  onFileChange(event:any) {
    let file = event.target.files[0];
    let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let result = reader.result
        this.file = result;
      };
  }
    onSubmit() {
      this.form.controls['img'].setValue(this.file);
      if (this.form.invalid) {
        return;
      }
      this.fireSer.createItem(this.auth.getUser(),this.form.value);
      this.activeModal.close(this.form.value);

    }
  }
