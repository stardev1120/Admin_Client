import { BaseModel } from "../_services/base-model";


export class NonSupportedCountryLead implements BaseModel {
    public country: String;
    public ip_address: String;
    public gps_location: String;
    public email: String;
    public id?: String;
}