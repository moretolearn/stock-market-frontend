import { Company } from "./company.model";

export class Stock {

    stockCode?: number;
    stockName?: string;
    description?: string;
    price?: number;
    startDate?: Date;
    endDate?: Date;
    company?: Company
}
