import { ClientTo } from '../Domain/ClientTo';

export class BookTo {

    constructor() {
        this.client = new ClientTo();
    }

    pickupDate: Date;
    pickUpAddress: string;
    dropOffAddress: string;
    message: string;
    title: string;
    shareRide: boolean;
    pickUpSuburb: string;
    dropOffSuburb: string;
    id: string;
    client: ClientTo;
}

