import { EventModel } from './event.model';

export interface TransfersNodeModel {
    fromAddress: string;
    toAddress: string;
    tokenId: number;
    event: EventModel;
}
