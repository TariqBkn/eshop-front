import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  warnConfig: MatSnackBarConfig = {
    duration: 3000
  }

  successConfig: MatSnackBarConfig = {
    duration: 3000
  }


  success(msg) {
    this.successConfig['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg,'X',this.successConfig);
  }

  warn(msg) {
    this.warnConfig['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg,'X', this.warnConfig);
  }

  neutral(msg) {
    this.snackBar.open(msg,'X',{
      duration: 3000
    });
  }
}