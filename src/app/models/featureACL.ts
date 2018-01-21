import { BaseModel } from "../_services/base-model";
import { Country } from "./country";
import { Role } from "./role";

export class FeatureACL implements BaseModel {
    public role_id: String;
    public role: Role;
    public feature_api_url: String;
    public actions: any;
    public fields: any;
    public id?: String;
}