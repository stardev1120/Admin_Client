import { BaseModel } from "../_services/base-model";
import { Loan } from "./loan";

export class CollectionHistory implements BaseModel {
    public amount: number;
    public date: Date;
    public currency: string;
    public retry_date: Date;
    public date_of_entry: Date;
    public status: string;
    public bank_response: string;
    public loan_id: number;
    public loan: Loan;
    public id?: string;
}