import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms'
//import { HTTPService } from './http.service';

export class ValidationService {

    static longitudeValidation(control: FormControl) {
        var lonValue = +control.value;
        if (lonValue < -180 || lonValue > 180) {
            return { invalidLongitude: true };
        }
        return null;
    }
    static latitudeValidation(control: FormControl) {
        var latiValue = +control.value;
        if (latiValue < -90 || latiValue > 90) {
            return { invalidLatitude: true };
        }
        return null;
    }



}
