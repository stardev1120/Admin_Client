import {
    Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UUID } from 'angular2-uuid';

import { AdminUsersService } from '../../../../../_services/apis/admin-users.service'
import { AlertComponent } from "../../../../../auth/_directives";
import { AlertService } from "../../../../../auth/_services";
import { S3Service } from "../../../../../_services/apis/s3";
import { AdminUser } from "../../../../../models/admin-user";
import { FormGroup, NgForm } from "@angular/forms";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./header-profile.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderProfileComponent implements OnInit {
    loading = false;
    matched: boolean;
    renewPassword: string;
    currentAdminUser: AdminUser;
    companies: any = [];
    passwordModel: any = {};
    profilePhoto: any;
    @ViewChild('alertReset2FA', { read: ViewContainerRef }) alertReset2FA: ViewContainerRef;
    @ViewChild('alertUploadPhoto', { read: ViewContainerRef }) alertUploadPhoto: ViewContainerRef;
    @ViewChild('alertUpdateProfile', { read: ViewContainerRef }) alertUpdateProfile: ViewContainerRef;
    @ViewChild('alertChangePassword', { read: ViewContainerRef }) alertChangePassword: ViewContainerRef;

    constructor(private route: ActivatedRoute,
        private adminUserService: AdminUsersService,
        private cfr: ComponentFactoryResolver,
        private _alertService: AlertService,
        private router: Router,
        private _s3Service: S3Service) {

    }

    ngOnInit() {
        this.currentAdminUser = this.adminUserService.currentAdminUser;
        this.companies = this.route.snapshot.data.companies as any;
        this.profilePhoto = this.currentAdminUser.photo;
    }

    async onChangePassword(changePasswordForm: NgForm) {
        try {
            if (changePasswordForm.invalid && this.matched) {
                return;
            }
            await this.adminUserService.changePassword(this.passwordModel);
            //this.router.navigate(["/profile"])
            //location.reload();

            this.showAlert('alertChangePassword');
            this._alertService.success('Change password is done successfully.', true);
            this._markFormPristine(changePasswordForm);
            changePasswordForm.resetForm();
        } catch (error) {
            console.log(error)
            this.showAlert('alertChangePassword');
            this._alertService.error('The password is wrong.', true);
        }
    }

    async onReset2FA() {
        try {
            await this.adminUserService.reset2FA();
            this.showAlert('alertReset2FA');
            this._alertService.success('Reset of 2 FA is done successfully.', true);
        } catch (error) {
            console.log(error);
            this.showAlert('alertReset2FA');
            this._alertService.error('Error is happened while reset 2 FA.', true);
        }
    }

    onSubmit(mForm: any) {
        if (mForm.valid) {
            this.adminUserService.save(this.currentAdminUser)
                .subscribe(() => {
                    //this.router.navigate(["/profile"])
                    //location.reload();
                    this.showAlert('alertUpdateProfile');
                    this._alertService.success('Update your profile is done successfully.', true);
                }, () => {
                    this.showAlert('alertUpdateProfile');
                    this._alertService.error('Could not update your profile, Please review your information.', true);
                });
        }
    }


    async uploadToAws(file: any) {
        if (!file || !file.type) {
            return;
        }
        const hash = UUID.UUID();
        const uploadedFile: any = await
            this._s3Service.uploadS3({ filename: hash, type: file.type }).toPromise();
        await
            this._s3Service.updateS3(uploadedFile.url, file).toPromise();
        const urlBasic = uploadedFile.urlBasic;
        this.profilePhoto = urlBasic + hash;
        return uploadedFile;
    }

    fileEvent(event: any) {
        try {
            this.loading = true;
            const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
            this.profilePhoto = file;
            if (event.target.files && file) {
                const reader = new FileReader();

                reader.onload = () => {
                    this.profilePhoto = reader.result;
                };

                reader.readAsDataURL(file);
                this.uploadToAws(this.profilePhoto).then(() => {
                    console.log(this.profilePhoto);
                    this.currentAdminUser.photo = this.profilePhoto;
                    this.adminUserService.save(this.currentAdminUser).toPromise().then(() => {
                        this.showAlert('alertUploadPhoto');
                        this._alertService.success('Uploading photo is done successfully.', true);
                        this.loading = false;
                        //location.reload();
                    }).catch(() => {
                        this.loading = false;
                        this.showAlert('alertUploadPhoto');
                        this._alertService.error('Error is happened while update your profile photo.', true);
                    })
                }).catch(() => {
                    this.loading = false;
                    this.showAlert('alertUploadPhoto');
                    this._alertService.error('Error is happened while uploading the photo.', true);
                })
            }

        } catch (error) {
            this.loading = false;
            console.log(error);
            this.showAlert('alertUploadPhoto');
            this._alertService.error('Error is happened while uploading the photo.', true);
        }
    }

    showAlert(target) {
        if (this[target]) {
            this[target].clear();
            let factory = this.cfr.resolveComponentFactory(AlertComponent);
            let ref = this[target].createComponent(factory);
            ref.changeDetectorRef.detectChanges();
        }
    }

    passwordMatching() {
        this.matched = this.renewPassword === this.passwordModel.new_password;
    }

    private _markFormPristine(form: FormGroup | NgForm): void {
        Object.keys(form.controls).forEach(control => {
            form.controls[control].markAsPristine();
        });
    }
}
