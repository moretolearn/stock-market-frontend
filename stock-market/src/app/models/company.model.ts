import { Stock } from "./stock.model";

export class Company {
    companyCode?: number;
    companyName?: string;
    description?: string;
    ceo?: string;
    turnover?: number;
    website?: string;
    exchange?: string;
    stocks?: Stock[];
}
