import { BaseModel } from "../_services/base-model";


export class UserActivityLog implements BaseModel {
    public user_email: String;
    public action: any;
    public payload: any;
    public created_at: Date;
    public id?: String;
}