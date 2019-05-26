import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { TokenModel } from '../../models';
import { MetaMaskService } from '../../store/services/metamask.service';

@Component({
  selector: 'app-new-token',
  templateUrl: './new-token.component.html',
  styleUrls: ['./new-token.component.scss']
})
export class NewTokenComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private metaMaskService: MetaMaskService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      filePath: [null, Validators.required],
    });
  }
  onSubmit(): void {
    this.http.post<TokenModel>('tokens', this.form.value).subscribe(this.onAdded.bind(this));
  }

  onPublish(): void {
    // this.metaMaskService.mintWithTokenURI(this.form.value).pipe(
    // exhaustMap(address => this.metaMaskService.updateToken({ ...this.form.value, address: address.address }))
    // ).subscribe(console.log);
  }

  onAdded(data: TokenModel) {
    this.snackBar.open('Success', 'Close', {
      duration: 5000,
      verticalPosition: 'top',
    });
    this.router.navigate(['../my-artworks/artwork', data.id], { relativeTo: this.route });
  }

  onFileChange(event): void {
    this.form.patchValue({
      filePath: event
    });
  }
}
