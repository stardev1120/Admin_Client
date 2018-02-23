import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoansService } from "./loans.service";
import { UsersService } from "./users.service";
import { CountriesService } from "./countries.service";
import { CollectionsService } from "./collections.service";
import { CollectionsHistoryService } from "./collections-history.service";
import { CountriesSettingsService } from "./countries-settings.service";
import { CountriesInvestmentService } from "./countries-investment.service";
import { NonSupportedCountryLeadsService } from "./non-supported-coutnry-lead.service";
import { CompaniesService } from "./company.service";
import { DistributionCentersService } from "./distribution-center.service";
import { RolesService } from "./role.service";
import { FeatureACLsService } from "./feature-acls.service";
import { AdminUserCountriesService } from "./admin-user-countries.service";
import { AdminUsersService } from "./admin-users.service";
import { AdminUserAccessService } from "./admin-user-access.service";
import { UserActivityLogService } from "./user-activity-log.service"
import { S3Service } from "./s3";
import { DashboardService } from "./dashboard.service";

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        CollectionsHistoryService,
        CollectionsService,
        LoansService,
        UsersService,
        CountriesService,
        CountriesSettingsService,
        CountriesInvestmentService,
        NonSupportedCountryLeadsService,
        CompaniesService,
        DistributionCentersService,
        RolesService,
        FeatureACLsService,
        AdminUsersService,
        AdminUserCountriesService,
        AdminUserAccessService,
        UserActivityLogService,
        S3Service,
        DashboardService
    ],
    declarations: []
})
export class ApisModule {
}


