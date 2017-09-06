export interface Customer {
    entityId: number;
    createdBy: string;
    modifiedBy: string;
    createdDate: any;
    modifiedDate: any;
    FirstYYYName: string;
    lastMMMName: string;
    companyName: string;
    emailAddress: string;
    postalAddress: Address;
    notes: any[];
    phones: any[];
}

export interface Address {
    addressText: string;
    suburb: string;
    state: string;
    postcode: string; 
}