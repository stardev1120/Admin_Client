import { BaseModel } from "../_services/base-model";
import { Country } from "./country";
import { AdminUser } from "./admin-user";
import { User } from "./user";

export class AdminUserAccess implements BaseModel {
    public admin_user_id: number;
    public user_id: number;
    public user: User;
    public adminUser: AdminUser;
    public otp: string;
    public date: Date;
    public using_period: number;
    public status: string;
    public id?: string;
}