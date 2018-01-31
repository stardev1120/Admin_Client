import {NgModule} from '@angular/core';
import {ThemeComponent} from './theme.component';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../auth/_guards';
import {CountriesInvestmentsModule} from "./pages/default/countries-investments/countries-investments.module";
import {NonSupportedCountryLeadsModule} from "./pages/default/non-supported-country-leads/non-supported-country-leads.module";
import {DistributionCentersModule} from "./pages/default/distribution-centers/distribution-centers.module";
import {AdminUserAccessModule} from "./pages/default/admin-user-access/admin-user-access.module";
import {IssueCollectMoneyModule} from "./pages/default/issue-collect-money/issue-collect-money.module";

const routes: Routes = [
    {
        "path": "",
        "component": ThemeComponent,
        "canActivate": [AuthGuard],
        "children": [
            {
                "path": "users",
                "loadChildren": ".\/pages\/default\/users\/users.module#UsersListModule"
            },
            {
                "path": "loans",
                "loadChildren": ".\/pages\/default\/loans\/loans.module#LoansModule"
            },
            {
                "path": "collections",
                "loadChildren": ".\/pages\/default\/collections\/collections.module#CollectionsModule"
            },
            {
                "path": "collection-history",
                "loadChildren": ".\/pages\/default\/collections-history\/collections-history.module#CollectionsHistoryModule"
            },

            {
                "path": "countries",
                "loadChildren": ".\/pages\/default\/countries\/countries.module#CountriesListModule"
            },

            {
                "path": "countries-settings",
                "loadChildren": ".\/pages\/default\/countries-settings\/countries-settings.module#CountriesSettingsModule"
            },
            {
                "path": "countries-investments",
                "loadChildren": ".\/pages\/default\/countries-investments\/countries-investments.module#CountriesInvestmentsModule"
            },
            {
                "path": "non-supported-country-leads",
                "loadChildren": ".\/pages\/default\/non-supported-country-leads\/non-supported-country-leads.module#NonSupportedCountryLeadsModule"
            },
            {
                "path": "companies",
                "loadChildren": ".\/pages\/default\/companies\/companies.module#CompaniesModule"
            },
            {
                "path": "distribution-centers",
                "loadChildren": ".\/pages\/default\/distribution-centers\/distribution-centers.module#DistributionCentersModule"
            },
            {
                "path": "roles",
                "loadChildren": ".\/pages\/default\/roles\/roles.module#RolesModule"
            },
            {
                "path": "admin-users-countries",
                "loadChildren": ".\/pages\/default\/admin-users-countries\/admin-users-countries.module#AdminUsersCountriesModule"
            },
            {
                "path": "admin-users",
                "loadChildren": ".\/pages\/default\/admin-users\/admin-users.module#AdminUsersModule"
            },
            {
                "path": "feature-acls",
                "loadChildren": ".\/pages\/default\/feature-acls\/feature-acls.module#FeatureACLsModule"
            },
            {
                "path": "admin-user-access",
                "loadChildren": ".\/pages\/default\/admin-user-access\/admin-user-access.module#AdminUserAccessModule"
            },
            {
                "path": "issue-collect-money",
                "loadChildren": ".\/pages\/default\/issue-collect-money\/issue-collect-money.module#IssueCollectMoneyModule"
            },
            {
                "path": "angular\/ng-bootstrap",
                "loadChildren": ".\/pages\/default\/angular\/ng-bootstrap\/ng-bootstrap.module#NgBootstrapModule"
            },
            {
                "path": "angular\/primeng",
                "loadChildren": ".\/pages\/default\/angular\/primeng\/primeng.module#PrimengModule"
            },
            {
                "path": "index",
                "loadChildren": ".\/pages\/default\/index\/index.module#IndexModule"
            },

            {
                "path": "",
                "redirectTo": "index",
                "pathMatch": "full"
            }
        ]
    },
    {
        "path": "snippets\/pages\/user\/login-1",
        "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/user\/user-login-1\/user-login-1.module#UserLogin1Module"
    },
    {
        "path": "snippets\/pages\/user\/login-2",
        "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/user\/user-login-2\/user-login-2.module#UserLogin2Module"
    },
    {
        "path": "snippets\/pages\/user\/login-3",
        "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/user\/user-login-3\/user-login-3.module#UserLogin3Module"
    },
    {
        "path": "snippets\/pages\/user\/login-4",
        "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/user\/user-login-4\/user-login-4.module#UserLogin4Module"
    },
    {
        "path": "snippets\/pages\/user\/login-5",
        "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/user\/user-login-5\/user-login-5.module#UserLogin5Module"
    },
    {
        "path": "snippets\/pages\/errors\/error-1",
        "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-1\/errors-error-1.module#ErrorsError1Module"
    },
    {
        "path": "snippets\/pages\/errors\/error-2",
        "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-2\/errors-error-2.module#ErrorsError2Module"
    },
    {
        "path": "snippets\/pages\/errors\/error-3",
        "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-3\/errors-error-3.module#ErrorsError3Module"
    },
    {
        "path": "snippets\/pages\/errors\/error-4",
        "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-4\/errors-error-4.module#ErrorsError4Module"
    },
    {
        "path": "snippets\/pages\/errors\/error-5",
        "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-5\/errors-error-5.module#ErrorsError5Module"
    },
    {
        "path": "snippets\/pages\/errors\/error-6",
        "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-6\/errors-error-6.module#ErrorsError6Module"
    },
    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule {
}
