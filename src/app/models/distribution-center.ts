import { BaseModel } from "../_services/base-model";
import { Country } from "./country";
import { Company } from "./company";


export class DistributionCenter implements BaseModel {
    public address: String;
    public lat: String;
    public long: String;
    public contact_number: String;
    public country_id: number;
    public company_id: number;
    public country: Country;
    public company: Company;
    public id?: String;
}