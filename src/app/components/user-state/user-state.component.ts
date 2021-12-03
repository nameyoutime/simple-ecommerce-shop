import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-state',
  templateUrl: './user-state.component.html',
  styleUrls: ['./user-state.component.scss']
})
export class UserStateComponent implements OnInit {

  public isAdmin : boolean;
  constructor(public authSer: AuthService) {
    this.isAdmin = this.authSer.admin;
  }

  ngOnInit(): void {
    
  }
  login() {
    this.authSer.login();
    this.isAdmin = this.authSer.admin;
  }
  logout() {
    this.authSer.logout();
    this.isAdmin = this.authSer.admin;
  }
}
