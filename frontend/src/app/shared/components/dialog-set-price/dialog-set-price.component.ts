import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-set-price',
  templateUrl: './dialog-set-price.component.html',
  styleUrls: ['./dialog-set-price.component.sass']
})
export class DialogSetPriceComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogSetPriceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SetPriceDialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface SetPriceDialogData {
  [x: string]: any;
}
