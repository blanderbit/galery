import { FactoryProvider, InjectionToken } from '@angular/core';
import TruffleContract from 'truffle-contract';
import SellContractAbi from '../../../../../truffle/build/contracts/ArkSell.json';

export const SellSmartContract = new InjectionToken<TruffleContract>('sellSmartContract');

export function SellSmartContractFactory(): TruffleContract {
  return TruffleContract(SellContractAbi);
}

export const SellSmartContractProvider: FactoryProvider = {
  provide: SellSmartContract,
  useFactory: SellSmartContractFactory,
};
