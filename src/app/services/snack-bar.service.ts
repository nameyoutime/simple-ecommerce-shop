import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(readonly snackBar: MatSnackBar) {}

  open(message: string, action = '', config?: MatSnackBarConfig) {
    this.snackBar.open(message, action, config);
  }
}
