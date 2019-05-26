import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetaMaskService } from '../../store/services/metamask.service';
import { exhaustMap, filter, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-gallery',
  templateUrl: './new-gallery.component.html',
  styleUrls: ['./new-gallery.component.scss']
})
export class NewGalleryComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private metaMaskService: MetaMaskService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required],
      address: ['']
    });
  }

  onSubmit(): void {
    this.metaMaskService.publicNewContract(this.form.value).pipe(
      filter(g => g.address),
      exhaustMap(address => this.metaMaskService.addGallery({ ...this.form.value, address: address.address }))
    ).subscribe(data => {
      this.snackBar.open('Success', 'Close', {
        duration: 5000,
        verticalPosition: 'top',
      });
      this.router.navigate(['../my-galleries', data.address], {relativeTo: this.route});
    });
  }

  onFileChange(event) {
    this.form.patchValue({
      image: event
    });
  }

}
