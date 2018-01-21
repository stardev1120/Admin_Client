import { BaseModel } from "../_services/base-model";
import { User } from "./user";
import { Collection } from "./collection";

export class Loan implements BaseModel {
    public date_taken: Date;
    public amount_taken: number;
    public service_fee: string;
    public interest_rate: string;
    public duration_of_loan: number;
    public status: string;
    public amount_pending: number;
    public bank_credit_transaction: string;
    public bank_credit_status: boolean;
    public currency: string;
    public user_id: number;
    public user: User;
    public collections: Collection[];
    public id?: string;
}