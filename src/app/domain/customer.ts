export interface Customer {
    id: number;
    name: string;
    country: {
        name: string;
        code: string;
    };
    company: string;
    date: Date; 
    status: string;
    verified: boolean;
    activity: number;
    representative: {
        name: string;
        image: string;
    };
    balance: number;
}
