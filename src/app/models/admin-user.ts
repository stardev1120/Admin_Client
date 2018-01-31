import { BaseModel } from "../_services/base-model";
import { Loan } from "./loan";
import { Country } from "./country";
import { Company } from "./company";
import { Role } from "./role";
import { AdminUserCountry } from "./admin-user-country";

export class AdminUser implements BaseModel {
    public name: string;
    public email: string;
    public dob: Date;
    public password: string;
    public company_id: number;
    public role_id: number;
    public phone_number: string;
    public number_password_attempt: number;
    public max_session_time: number;
    public FAfield: number;
    public last_login: Date;
    public company: Company;
    public Role: Role;
    public AdminuserCountries: any = [];
    public countries: AdminUserCountry[];
    public id?: string;
}
