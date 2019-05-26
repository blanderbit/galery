import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  title: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(
    private http: HttpClient,
  ) { }
}
