import { BaseModel } from "../_services/base-model";
import { Loan } from "./loan";
import {AdminUser} from "./admin-user";

export class Collection implements BaseModel {
    public amount: number;
    public date: Date;
    public currency: string;
    public retry_date: Date;
    public status: string;
    public loan_id: number;
    public created_at: Date;
    public Loan: Loan;
    public AdminUser?: AdminUser;
    public id?: string;
}