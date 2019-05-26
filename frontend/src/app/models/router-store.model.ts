import { Params } from '@angular/router';

export interface RouterStoreUrl {
  url: string;
  params: Params;
  queryParams: Params;
  data: Params;
}
