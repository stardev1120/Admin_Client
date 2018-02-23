import {BaseModel} from "../_services/base-model";
import {User} from "./user";
import {Collection} from "./collection";
import {UserPaymentMethod} from "./user-payment-method";
import {LoansHistory} from "./Loans-History";

export class Loan implements BaseModel {
    public date_taken: Date;
    public ammount_taken: number;
    public service_fee: string;
    public interest_rate: string;
    public duration_of_loan: number;
    public status: string;
    public amount_pending: number;
    public bank_credit_transaction: string;
    public bank_credit_status: boolean;
    public currency: string;
    public user_id: number;
    public user_payment_method_id: number;
    public created_at: Date;
    public User: User;
    public Collections: Collection[];
    public UserPaymentMethod: UserPaymentMethod;
    public LoansHistory: LoansHistory;
    public id?: string;
}