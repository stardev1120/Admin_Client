import { BaseModel } from "../_services/base-model";
import { User } from "./user";
import { PaymentMethod } from "./payment-method";

export class UserPaymentMethod implements BaseModel {
    public name: string;
    public account: string;
    public sim_id: number;
    public status: string;
    public bank_name: string;
    public user_id: number;
    public payment_method_id: number;
    public User: User;
    public PaymentMethod: PaymentMethod;
    public id?: String;
}