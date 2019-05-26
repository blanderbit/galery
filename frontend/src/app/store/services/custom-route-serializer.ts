import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStoreUrl } from '../../models';

export class CustomSerializer implements RouterStateSerializer<RouterStoreUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStoreUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params, data } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams, data };
  }
}
