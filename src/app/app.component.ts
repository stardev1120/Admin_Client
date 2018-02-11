import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { I18nService } from "./_services/i18n.service";
import { environment } from "../environments/environment";

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    title = 'app';
    public lottieConfig: Object;
    private anim: any;
    constructor(private _router: Router,
        private i18nService: I18nService) {
        this.lottieConfig = {
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'assets/app/data.json'
        };
    }

    ngOnInit() {
        this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

        this._router.events.subscribe((route) => {
            if (route instanceof NavigationStart) {
                this.anim.play();
            }
            if (route instanceof NavigationEnd) {
                this.anim.stop();
            }
        });
    }

    handleAnimation(anim: any) {
        this.anim = anim;
        this.anim.setSpeed(0.5);
    }
}