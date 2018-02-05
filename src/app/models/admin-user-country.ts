import { BaseModel } from "../_services/base-model";
import { Country } from "./country";
import { AdminUser } from "./admin-user";

export class AdminUserCountry implements BaseModel {
    public admin_user_id: number;
    public country_id: number;
    public Country: Country;
    public adminUser: AdminUser;
    public id?: string;
}