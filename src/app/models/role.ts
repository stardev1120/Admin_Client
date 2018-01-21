import { BaseModel } from "../_services/base-model";
import { Country } from "./country";
import { FeatureACL } from "./featureACL";

export class Role implements BaseModel {
    public role_id: number;
    public role_name: String;
    public max_session_time: String;
    public featureACLs: FeatureACL[];
    public id?: String;
}