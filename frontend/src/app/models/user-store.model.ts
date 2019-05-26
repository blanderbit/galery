import { UserModel } from './user.model';
import { HttpErrorResponse } from '@angular/common/http';

export interface UserStore extends Partial<UserModel> {
  loading: boolean;
  error: string | null | HttpErrorResponse;
}
