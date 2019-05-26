import { TransfersNodeModel } from './transfers-node.model';

export interface TransfersModel {
  totalCount: number;
  nodes: TransfersNodeModel[] | [];
}
