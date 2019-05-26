import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CardTokenComponent } from './components/card-token/card-token.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DropZoneDirectiveDirective } from './directives/drop-zone-directive.directive';
import { FileSizePipe } from './pipes/file-size.pipe';
import { CardGalleryComponent } from './components/card-gallery/card-gallery.component';
import { DialogSetPriceComponent } from './components/dialog-set-price/dialog-set-price.component';

const MODULES = [
  CommonModule,
  MatSnackBarModule,
  ReactiveFormsModule,
  RouterModule,
  MatDividerModule,
  MatListModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSelectModule,
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  FormsModule,
  MatChipsModule,
  MatProgressBarModule,
  MatFormFieldModule,
];
const COMPONENTS = [
  CardTokenComponent,
  FileUploadComponent,
  DropZoneDirectiveDirective,
  FileSizePipe,
  DialogSetPriceComponent,
  CardGalleryComponent,
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  entryComponents: [
    DialogSetPriceComponent,
  ]
})
export class SharedModule { }
