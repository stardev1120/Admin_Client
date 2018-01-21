import { BaseModel } from "../_services/base-model";
export class Country implements BaseModel {
    public name: String;
    public country_code: String;
    public status: boolean;
    public id?: String;
}