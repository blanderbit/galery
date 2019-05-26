import { isPlatformBrowser } from '@angular/common';
import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID } from '@angular/core';
import Web3 from 'web3';
import { provider } from 'web3-providers';

/* Create a new injection token for injecting the web3 into a component. */
export const WEB3 = new InjectionToken<Web3>('Web3Token');
/* Define abstract class for obtaining reference to the global web3 object. */
export abstract class Web3Ref {

  get nativeWeb3(): Web3 {
    throw new Error('Not implemented.');
  }

}

// tslint:disable-next-line: prefer-const
let web3: Web3 | undefined; // Will hold the web3 instance

/* Define class that implements the abstract class and returns the native web3 object. */
export class BrowserWeb3Ref extends Web3Ref {

  constructor() {
    super();
  }

  get nativeWeb3(): Web3 {
    return web3;
  }

}

/*
*  Create an factory function that returns the web3 object.
*  We don't know window.web3 version, so we use our own instance of Web3
*  with the injected provider given by MetaMask
*/
export function web3Factory(browserWeb3Ref: BrowserWeb3Ref, platformId: object): Web3 | object {
  if (isPlatformBrowser(platformId)) {
    try {
      // tslint:disable-next-line: no-string-literal
      const prov: provider = ('ethereum' in window) ? window['ethereum'] : browserWeb3Ref.nativeWeb3.givenProvider;
      return new Web3(prov);
    } catch (error) {
      return new Object();
    }
    // tslint:disable-next-line: no-unsafe-any no-string-literal
  }
  return new Object();
}

/* Create a injectable provider for the Web3Ref token that uses the browserWeb3Ref class. */
const browserWeb3Provider: ClassProvider = {
  provide: Web3Ref,
  useClass: BrowserWeb3Ref,
};

/* Create an injectable provider that uses the web3Factory function for returning the native web3 object. */
const web3Provider: FactoryProvider = {
  provide: WEB3,
  useFactory: web3Factory,
  deps: [Web3Ref, PLATFORM_ID],
};

/* Create an array of providers. */
export const WEB3_PROVIDERS = [
  browserWeb3Provider,
  web3Provider
];
