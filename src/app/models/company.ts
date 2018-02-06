import { BaseModel } from "../_services/base-model";
import { Country } from "./country";


export class Company implements BaseModel {
    public company_name: String;
    public name: String;
    public company_address: String;
    public contact_number: String;
    public country_id: number;
    public Country: Country;
    public id?: String;
}