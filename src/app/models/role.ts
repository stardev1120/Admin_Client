import {BaseModel} from "../_services/base-model";
import {FeatureACL} from "./featureACL";

export class Role implements BaseModel {
    public role_id: String;
    public role_name: String;
    public max_session_time: String;
    public FeatureACLs: FeatureACL[];
    public id?: String;
}