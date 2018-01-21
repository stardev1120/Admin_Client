import { BaseModel } from "../_services/base-model";
import { Country } from "./country";

export class CountrySetting implements BaseModel {
    public name: String;
    public value: String;
    public country_id: number;
    public country: Country;
    public id?: String;
}