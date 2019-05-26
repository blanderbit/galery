import TruffleContract from 'truffle-contract';
import ContractAbi from '../../../../../truffle/build/contracts/ArtworkGallery.json';
import { InjectionToken, FactoryProvider } from '@angular/core';

export const SmartContract = new InjectionToken<TruffleContract>('smartContract');

export function SmartContractFactory(): TruffleContract {
  return TruffleContract(ContractAbi);
}

export const SmartContractProvider: FactoryProvider = {
  provide: SmartContract,
  useFactory: SmartContractFactory,
};
