import { BaseModel } from "../_services/base-model";
import { Country } from "./country";

export class CountryInvestment implements BaseModel {
    public amount_available: number;
    public status: String;
    public country_id: number;
    public country: Country;
    public id?: String;
}