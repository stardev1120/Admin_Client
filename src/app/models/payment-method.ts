import {BaseModel} from "../_services/base-model";
import {Country} from "./country";

export class PaymentMethod implements BaseModel {
    public name: string;
    public settings: string;
    public type: string;
    public status: string;
    public logo: string;
    public bank_code: string;
    public country_id: number;
    public Country: Country;
    public id?: String;
}