import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-select-contract',
  templateUrl: './dialog-select-contract.component.html',
  styleUrls: ['./dialog-select-contract.component.sass']
})
export class DialogSelectContractComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogSelectContractComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectContractDialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface SelectContractDialogData {
  addresses: [];
}
