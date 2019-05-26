import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { Observable, from, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.sass']
})
export class FileUploadComponent {

  @Output() uploaded = new EventEmitter<any>();

  // Progress monitoring
  percentage: BehaviorSubject<number> = new BehaviorSubject(0);

  snapshot: BehaviorSubject<any> = new BehaviorSubject({});

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(
    private http: HttpClient,
    @Inject('BASE_STORAGE_URL') private storageUrl: string,
  ) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload($event: FileList) {
    // The File object
    const file = $event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      alert('unsupported file type :( ');
      console.error('unsupported file type :( ');
      return;
    }
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.http.post<{ path: string }>('upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          this.snapshot.next({ bytesTransferred: event.loaded, totalBytes: event.total });
          this.percentage.next(progress);
          break;

        case HttpEventType.Response:
          this.downloadURL = of(`${this.storageUrl}/${event.body.path}`);
          this.uploaded.emit(event.body.path);
          break;
        default:
          return `Unhandled event: ${event.type}`;
      }
    }

    );
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
