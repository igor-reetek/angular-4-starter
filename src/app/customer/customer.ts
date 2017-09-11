export interface Customer {
    entityId: number;
    createdBy: string;
    modifiedBy: string;
    createdDate: any;
    modifiedDate: any;
    firstName: string;
    lastName: string;
    companyName: string;
    emailAddress: string;
    postalAddress: Address;
    notes: Note[];
    phones: Phone[];
}

export interface Address {
    addressText: string;
    suburb: string;
    state: string;
    postcode: string; 
}

export interface Phone {
    phoneNumber : string;
    phoneTypeId: number;
}

export interface Note {
    noteDetails : string;
}