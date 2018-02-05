import {
    Component,
    ComponentFactoryResolver,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ScriptLoaderService } from "../_services/script-loader.service";
import { AuthenticationService } from "./_services/authentication.service";
import { AlertService } from "./_services/alert.service";
import { UserService } from "./_services/user.service";
import { AlertComponent } from "./_directives/alert.component";
import { LoginCustom } from "./_helpers/login-custom";
import { Helpers } from "../helpers";
import { AdminUsersService } from "../_services/apis/admin-users.service";
import { RequestResetPasswordService } from "./_services/request-reset-password.service";
import { cloneDeep } from 'lodash'

@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: './templates/login-1.component.html',
    encapsulation: ViewEncapsulation.None
})

export class AuthComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    public lottieConfig: Object;
    private anim: any;
    show2FA: boolean = false;
    clonedCurrentUser: any;
    @ViewChild('alertSignin', { read: ViewContainerRef }) alertSignin: ViewContainerRef;
    @ViewChild('alertSignup', { read: ViewContainerRef }) alertSignup: ViewContainerRef;
    @ViewChild('alertForgotPass', { read: ViewContainerRef }) alertForgotPass: ViewContainerRef;
    @ViewChild('alert2FA', { read: ViewContainerRef }) alert2FA: ViewContainerRef;

    constructor(private _router: Router,
        private _script: ScriptLoaderService,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private cfr: ComponentFactoryResolver,
        private _requestResetPasswordService: RequestResetPasswordService,
        private _adminUserService: AdminUsersService) {
        var animationData = {
            "v": "5.0.3",
            "fr": 60,
            "ip": 0,
            "op": 360,
            "w": 360,
            "h": 360,
            "nm": "logo 2",
            "ddd": 0,
            "assets": [{
                "id": "comp_0",
                "layers": [{
                    "ddd": 0,
                    "ind": 1,
                    "ty": 4,
                    "nm": "corners a2 Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [221.477, 70.927, 0], "ix": 2 },
                        "a": { "a": 0, "k": [2.75, 1.932, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "ef": [{
                        "ty": 5,
                        "nm": "Transform",
                        "np": 14,
                        "mn": "ADBE Geometry2",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 3,
                            "nm": "Anchor Point",
                            "mn": "ADBE Geometry2-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": [121, 57], "ix": 1 }
                        }, {
                            "ty": 3,
                            "nm": "Position",
                            "mn": "ADBE Geometry2-0002",
                            "ix": 2,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": 0.833, "y": 0.833 },
                                    "o": { "x": 0.167, "y": 0.167 },
                                    "n": "0p833_0p833_0p167_0p167",
                                    "t": 275,
                                    "s": [121, 51],
                                    "e": [121, 57],
                                    "to": [0, 1],
                                    "ti": [0, -1]
                                }, { "t": 299 }],
                                "ix": 2
                            }
                        }, {
                            "ty": 7,
                            "nm": "Uniform Scale",
                            "mn": "ADBE Geometry2-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 0,
                            "nm": "Scale",
                            "mn": "ADBE Geometry2-0003",
                            "ix": 4,
                            "v": { "a": 0, "k": 100, "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": " ",
                            "mn": "ADBE Geometry2-0004",
                            "ix": 5,
                            "v": { "a": 0, "k": 100, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Skew",
                            "mn": "ADBE Geometry2-0005",
                            "ix": 6,
                            "v": { "a": 0, "k": 0, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Skew Axis",
                            "mn": "ADBE Geometry2-0006",
                            "ix": 7,
                            "v": { "a": 0, "k": 0, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Rotation",
                            "mn": "ADBE Geometry2-0007",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Geometry2-0008",
                            "ix": 9,
                            "v": { "a": 0, "k": 100, "ix": 9 }
                        }, {
                            "ty": 7,
                            "nm": "Use Composition’s Shutter Angle",
                            "mn": "ADBE Geometry2-0009",
                            "ix": 10,
                            "v": { "a": 0, "k": 1, "ix": 10 }
                        }, {
                            "ty": 0,
                            "nm": "Shutter Angle",
                            "mn": "ADBE Geometry2-0010",
                            "ix": 11,
                            "v": { "a": 0, "k": 0, "ix": 11 }
                        }, {
                            "ty": 7,
                            "nm": "Sampling",
                            "mn": "ADBE Geometry2-0012",
                            "ix": 12,
                            "v": { "a": 0, "k": 1, "ix": 12 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[0, 0], [1.784, -1.82], [-2.5, 0.125]],
                                    "o": [[-1.85, -1.798], [0, 0], [2.5, -0.125]],
                                    "v": [[1.686, 1.613], [-2.205, 1.682], [0, -1.557]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [2.75, 1.932], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 275,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 2,
                    "ty": 4,
                    "nm": "corners a1 Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [207.144, 70.539, 0], "ix": 2 },
                        "a": { "a": 0, "k": [3.583, 2.712, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "ef": [{
                        "ty": 5,
                        "nm": "Transform",
                        "np": 14,
                        "mn": "ADBE Geometry2",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 3,
                            "nm": "Anchor Point",
                            "mn": "ADBE Geometry2-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": [121, 57], "ix": 1 }
                        }, {
                            "ty": 3,
                            "nm": "Position",
                            "mn": "ADBE Geometry2-0002",
                            "ix": 2,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": 0.833, "y": 0.833 },
                                    "o": { "x": 0.167, "y": 0.167 },
                                    "n": "0p833_0p833_0p167_0p167",
                                    "t": 267,
                                    "s": [123, 51],
                                    "e": [121, 57],
                                    "to": [-0.33333334326744, 1],
                                    "ti": [0.33333334326744, -1]
                                }, { "t": 290 }],
                                "ix": 2
                            }
                        }, {
                            "ty": 7,
                            "nm": "Uniform Scale",
                            "mn": "ADBE Geometry2-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 0,
                            "nm": "Scale",
                            "mn": "ADBE Geometry2-0003",
                            "ix": 4,
                            "v": { "a": 0, "k": 100, "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": " ",
                            "mn": "ADBE Geometry2-0004",
                            "ix": 5,
                            "v": { "a": 0, "k": 100, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Skew",
                            "mn": "ADBE Geometry2-0005",
                            "ix": 6,
                            "v": { "a": 0, "k": 0, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Skew Axis",
                            "mn": "ADBE Geometry2-0006",
                            "ix": 7,
                            "v": { "a": 0, "k": 0, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Rotation",
                            "mn": "ADBE Geometry2-0007",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Geometry2-0008",
                            "ix": 9,
                            "v": { "a": 0, "k": 100, "ix": 9 }
                        }, {
                            "ty": 7,
                            "nm": "Use Composition’s Shutter Angle",
                            "mn": "ADBE Geometry2-0009",
                            "ix": 10,
                            "v": { "a": 0, "k": 1, "ix": 10 }
                        }, {
                            "ty": 0,
                            "nm": "Shutter Angle",
                            "mn": "ADBE Geometry2-0010",
                            "ix": 11,
                            "v": { "a": 0, "k": 0, "ix": 11 }
                        }, {
                            "ty": 7,
                            "nm": "Sampling",
                            "mn": "ADBE Geometry2-0012",
                            "ix": 12,
                            "v": { "a": 0, "k": 1, "ix": 12 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[0, 0], [2.295, -2.097], [-3.333, -0.542]],
                                    "o": [[-1.767, -2.624], [0, 0], [3.333, 0.541]],
                                    "v": [[1.44, 2.462], [-2.668, 1.956], [0, -1.919]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [3.583, 2.712], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 267,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 3,
                    "ty": 4,
                    "nm": "corners e Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [160.321, 63.061, 0], "ix": 2 },
                        "a": { "a": 0, "k": [4.292, 7.332, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "ef": [{
                        "ty": 5,
                        "nm": "Transform",
                        "np": 14,
                        "mn": "ADBE Geometry2",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 3,
                            "nm": "Anchor Point",
                            "mn": "ADBE Geometry2-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": [121, 57], "ix": 1 }
                        }, {
                            "ty": 3,
                            "nm": "Position",
                            "mn": "ADBE Geometry2-0002",
                            "ix": 2,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": 0.833, "y": 0.833 },
                                    "o": { "x": 0.167, "y": 0.167 },
                                    "n": "0p833_0p833_0p167_0p167",
                                    "t": 215,
                                    "s": [118, 57],
                                    "e": [121, 57],
                                    "to": [0.5, 0],
                                    "ti": [-0.5, 0]
                                }, { "t": 236 }],
                                "ix": 2
                            }
                        }, {
                            "ty": 7,
                            "nm": "Uniform Scale",
                            "mn": "ADBE Geometry2-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 0,
                            "nm": "Scale",
                            "mn": "ADBE Geometry2-0003",
                            "ix": 4,
                            "v": { "a": 0, "k": 100, "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": " ",
                            "mn": "ADBE Geometry2-0004",
                            "ix": 5,
                            "v": { "a": 0, "k": 100, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Skew",
                            "mn": "ADBE Geometry2-0005",
                            "ix": 6,
                            "v": { "a": 0, "k": 0, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Skew Axis",
                            "mn": "ADBE Geometry2-0006",
                            "ix": 7,
                            "v": { "a": 0, "k": 0, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Rotation",
                            "mn": "ADBE Geometry2-0007",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Geometry2-0008",
                            "ix": 9,
                            "v": { "a": 0, "k": 100, "ix": 9 }
                        }, {
                            "ty": 7,
                            "nm": "Use Composition’s Shutter Angle",
                            "mn": "ADBE Geometry2-0009",
                            "ix": 10,
                            "v": { "a": 0, "k": 1, "ix": 10 }
                        }, {
                            "ty": 0,
                            "nm": "Shutter Angle",
                            "mn": "ADBE Geometry2-0010",
                            "ix": 11,
                            "v": { "a": 0, "k": 0, "ix": 11 }
                        }, {
                            "ty": 7,
                            "nm": "Sampling",
                            "mn": "ADBE Geometry2-0012",
                            "ix": 12,
                            "v": { "a": 0, "k": 1, "ix": 12 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[-1.656, 5.562], [0.015, -0.022], [-0.353, -0.118], [0.25, -2.542], [0, 0], [-1.295, -2.127]],
                                    "o": [[1.032, -3.467], [-1.188, 1.729], [0, 0], [-0.208, 2.113], [-2.336, 0.934], [0, 0]],
                                    "v": [[-2.385, -2.066], [4.027, -7.061], [2.851, -4.342], [-0.469, -1.275], [2.25, 2.814], [0.794, 7.083]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [4.291, 7.332], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 215,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 4,
                    "ty": 4,
                    "nm": "corners b3 Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [130.17, 31.898, 0], "ix": 2 },
                        "a": { "a": 0, "k": [8.554, 9.413, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "ef": [{
                        "ty": 5,
                        "nm": "Transform",
                        "np": 14,
                        "mn": "ADBE Geometry2",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 3,
                            "nm": "Anchor Point",
                            "mn": "ADBE Geometry2-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": [121, 57], "ix": 1 }
                        }, {
                            "ty": 3,
                            "nm": "Position",
                            "mn": "ADBE Geometry2-0002",
                            "ix": 2,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": 0.833, "y": 0.833 },
                                    "o": { "x": 0.167, "y": 0.167 },
                                    "n": "0p833_0p833_0p167_0p167",
                                    "t": 126,
                                    "s": [125, 45],
                                    "e": [121, 57],
                                    "to": [-0.66666668653488, 2],
                                    "ti": [0.66666668653488, -2]
                                }, { "t": 150 }],
                                "ix": 2
                            }
                        }, {
                            "ty": 7,
                            "nm": "Uniform Scale",
                            "mn": "ADBE Geometry2-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 0,
                            "nm": "Scale",
                            "mn": "ADBE Geometry2-0003",
                            "ix": 4,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": [0.833], "y": [0.833] },
                                    "o": { "x": [0.167], "y": [0.167] },
                                    "n": ["0p833_0p833_0p167_0p167"],
                                    "t": 126,
                                    "s": [48],
                                    "e": [100]
                                }, { "t": 150 }],
                                "ix": 4
                            }
                        }, {
                            "ty": 0,
                            "nm": " ",
                            "mn": "ADBE Geometry2-0004",
                            "ix": 5,
                            "v": { "a": 0, "k": 100, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Skew",
                            "mn": "ADBE Geometry2-0005",
                            "ix": 6,
                            "v": { "a": 0, "k": 0, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Skew Axis",
                            "mn": "ADBE Geometry2-0006",
                            "ix": 7,
                            "v": { "a": 0, "k": 0, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Rotation",
                            "mn": "ADBE Geometry2-0007",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Geometry2-0008",
                            "ix": 9,
                            "v": { "a": 0, "k": 100, "ix": 9 }
                        }, {
                            "ty": 7,
                            "nm": "Use Composition’s Shutter Angle",
                            "mn": "ADBE Geometry2-0009",
                            "ix": 10,
                            "v": { "a": 0, "k": 1, "ix": 10 }
                        }, {
                            "ty": 0,
                            "nm": "Shutter Angle",
                            "mn": "ADBE Geometry2-0010",
                            "ix": 11,
                            "v": { "a": 0, "k": 0, "ix": 11 }
                        }, {
                            "ty": 7,
                            "nm": "Sampling",
                            "mn": "ADBE Geometry2-0012",
                            "ix": 12,
                            "v": { "a": 0, "k": 1, "ix": 12 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[-1.92, 0.458], [-1.038, 1.46], [-1.36, -0.51], [1.098, -1.836], [-1.216, -0.263], [0.663, -1.349], [2.349, 0.268], [0.639, -1.48], [3, -0.417], [-0.27, 0.669], [-0.34, 1.337]],
                                    "o": [[1.92, -0.458], [1.75, -2.457], [1.333, 0.5], [-0.744, 1.243], [1.599, 0.346], [-0.663, 1.348], [-2.004, -0.228], [-0.599, 1.388], [-0.938, 0.131], [0.447, -1.106], [0.629, -2.474]],
                                    "v": [[-4.612, -2.528], [-1.317, -5.154], [3.933, -8.653], [5.21, -4.692], [6.292, -2.249], [7.641, 1.014], [3.312, 3.106], [-0.441, 5.046], [-6.54, 9.032], [-8.034, 7.444], [-7.113, 4.571]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [8.554, 9.413], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 126,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 5,
                    "ty": 4,
                    "nm": "corner b2 Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [121.879, 53.607, 0], "ix": 2 },
                        "a": { "a": 0, "k": [3.401, 3.554, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "ef": [{
                        "ty": 5,
                        "nm": "Transform",
                        "np": 14,
                        "mn": "ADBE Geometry2",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 3,
                            "nm": "Anchor Point",
                            "mn": "ADBE Geometry2-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": [121, 57], "ix": 1 }
                        }, {
                            "ty": 3,
                            "nm": "Position",
                            "mn": "ADBE Geometry2-0002",
                            "ix": 2,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": 0.833, "y": 0.833 },
                                    "o": { "x": 0.167, "y": 0.167 },
                                    "n": "0p833_0p833_0p167_0p167",
                                    "t": 152,
                                    "s": [120, 60],
                                    "e": [121, 57],
                                    "to": [0.16666667163372, -0.5],
                                    "ti": [-0.16666667163372, 0.5]
                                }, { "t": 176 }],
                                "ix": 2
                            }
                        }, {
                            "ty": 7,
                            "nm": "Uniform Scale",
                            "mn": "ADBE Geometry2-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 0,
                            "nm": "Scale",
                            "mn": "ADBE Geometry2-0003",
                            "ix": 4,
                            "v": { "a": 0, "k": 100, "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": " ",
                            "mn": "ADBE Geometry2-0004",
                            "ix": 5,
                            "v": { "a": 0, "k": 100, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Skew",
                            "mn": "ADBE Geometry2-0005",
                            "ix": 6,
                            "v": { "a": 0, "k": 0, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Skew Axis",
                            "mn": "ADBE Geometry2-0006",
                            "ix": 7,
                            "v": { "a": 0, "k": 0, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Rotation",
                            "mn": "ADBE Geometry2-0007",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Geometry2-0008",
                            "ix": 9,
                            "v": { "a": 0, "k": 100, "ix": 9 }
                        }, {
                            "ty": 7,
                            "nm": "Use Composition’s Shutter Angle",
                            "mn": "ADBE Geometry2-0009",
                            "ix": 10,
                            "v": { "a": 0, "k": 1, "ix": 10 }
                        }, {
                            "ty": 0,
                            "nm": "Shutter Angle",
                            "mn": "ADBE Geometry2-0010",
                            "ix": 11,
                            "v": { "a": 0, "k": 0, "ix": 11 }
                        }, {
                            "ty": 7,
                            "nm": "Sampling",
                            "mn": "ADBE Geometry2-0012",
                            "ix": 12,
                            "v": { "a": 0, "k": 1, "ix": 12 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[0, 0], [-2.222, -0.501], [1.959, 2.625]],
                                    "o": [[-0.976, 2.125], [0, 0], [-1.958, -2.625]],
                                    "v": [[1.538, -3.305], [3.152, -0.061], [-1.193, 0.68]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [3.401, 3.555], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 152,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 6,
                    "ty": 4,
                    "nm": "corner b1 Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [114.523, 68.955, 0], "ix": 2 },
                        "a": { "a": 0, "k": [3.046, 2.727, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "ef": [{
                        "ty": 5,
                        "nm": "Transform",
                        "np": 14,
                        "mn": "ADBE Geometry2",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 3,
                            "nm": "Anchor Point",
                            "mn": "ADBE Geometry2-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": [121, 57], "ix": 1 }
                        }, {
                            "ty": 3,
                            "nm": "Position",
                            "mn": "ADBE Geometry2-0002",
                            "ix": 2,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": 0.833, "y": 0.833 },
                                    "o": { "x": 0.167, "y": 0.167 },
                                    "n": "0p833_0p833_0p167_0p167",
                                    "t": 159,
                                    "s": [121, 53],
                                    "e": [121, 57],
                                    "to": [0, 0.66666668653488],
                                    "ti": [0, -0.66666668653488]
                                }, { "t": 183 }],
                                "ix": 2
                            }
                        }, {
                            "ty": 7,
                            "nm": "Uniform Scale",
                            "mn": "ADBE Geometry2-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 0,
                            "nm": "Scale",
                            "mn": "ADBE Geometry2-0003",
                            "ix": 4,
                            "v": { "a": 0, "k": 100, "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": " ",
                            "mn": "ADBE Geometry2-0004",
                            "ix": 5,
                            "v": { "a": 0, "k": 100, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Skew",
                            "mn": "ADBE Geometry2-0005",
                            "ix": 6,
                            "v": { "a": 0, "k": 0, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Skew Axis",
                            "mn": "ADBE Geometry2-0006",
                            "ix": 7,
                            "v": { "a": 0, "k": 0, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Rotation",
                            "mn": "ADBE Geometry2-0007",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Geometry2-0008",
                            "ix": 9,
                            "v": { "a": 0, "k": 100, "ix": 9 }
                        }, {
                            "ty": 7,
                            "nm": "Use Composition’s Shutter Angle",
                            "mn": "ADBE Geometry2-0009",
                            "ix": 10,
                            "v": { "a": 0, "k": 1, "ix": 10 }
                        }, {
                            "ty": 0,
                            "nm": "Shutter Angle",
                            "mn": "ADBE Geometry2-0010",
                            "ix": 11,
                            "v": { "a": 0, "k": 0, "ix": 11 }
                        }, {
                            "ty": 7,
                            "nm": "Sampling",
                            "mn": "ADBE Geometry2-0012",
                            "ix": 12,
                            "v": { "a": 0, "k": 1, "ix": 12 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[0, 0], [-1.172, -0.589], [2.591, -1.079]],
                                    "o": [[0.359, -1.264], [0.519, 0.261], [-3, 1.25]],
                                    "v": [[-0.257, 2.477], [2.021, 1.551], [0.204, -1.398]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [3.045, 2.727], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 182,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 7,
                    "ty": 4,
                    "nm": "corner mb Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [108.977, 80.598, 0], "ix": 2 },
                        "a": { "a": 0, "k": [3.25, 2.479, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "ef": [{
                        "ty": 5,
                        "nm": "Transform",
                        "np": 14,
                        "mn": "ADBE Geometry2",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 3,
                            "nm": "Anchor Point",
                            "mn": "ADBE Geometry2-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": [121, 57], "ix": 1 }
                        }, {
                            "ty": 3,
                            "nm": "Position",
                            "mn": "ADBE Geometry2-0002",
                            "ix": 2,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": 0.833, "y": 0.833 },
                                    "o": { "x": 0.167, "y": 0.167 },
                                    "n": "0p833_0p833_0p167_0p167",
                                    "t": 134,
                                    "s": [121, 52],
                                    "e": [121, 57],
                                    "to": [0, 0.83333331346512],
                                    "ti": [0, -0.83333331346512]
                                }, { "t": 159 }],
                                "ix": 2
                            }
                        }, {
                            "ty": 7,
                            "nm": "Uniform Scale",
                            "mn": "ADBE Geometry2-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 0,
                            "nm": "Scale",
                            "mn": "ADBE Geometry2-0003",
                            "ix": 4,
                            "v": { "a": 0, "k": 100, "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": " ",
                            "mn": "ADBE Geometry2-0004",
                            "ix": 5,
                            "v": { "a": 0, "k": 100, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Skew",
                            "mn": "ADBE Geometry2-0005",
                            "ix": 6,
                            "v": { "a": 0, "k": 0, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Skew Axis",
                            "mn": "ADBE Geometry2-0006",
                            "ix": 7,
                            "v": { "a": 0, "k": 0, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Rotation",
                            "mn": "ADBE Geometry2-0007",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Geometry2-0008",
                            "ix": 9,
                            "v": { "a": 0, "k": 100, "ix": 9 }
                        }, {
                            "ty": 7,
                            "nm": "Use Composition’s Shutter Angle",
                            "mn": "ADBE Geometry2-0009",
                            "ix": 10,
                            "v": { "a": 0, "k": 1, "ix": 10 }
                        }, {
                            "ty": 0,
                            "nm": "Shutter Angle",
                            "mn": "ADBE Geometry2-0010",
                            "ix": 11,
                            "v": { "a": 0, "k": 0, "ix": 11 }
                        }, {
                            "ty": 7,
                            "nm": "Sampling",
                            "mn": "ADBE Geometry2-0012",
                            "ix": 12,
                            "v": { "a": 0, "k": 1, "ix": 12 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[0, 0], [1.162, -0.937], [-3, -0.25]],
                                    "o": [[-1.097, -1.033], [-1.23, 0.99], [3, 0.25]],
                                    "v": [[1.561, 1.352], [-1.232, 1.238], [0, -1.979]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [3.25, 2.479], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 157,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 8,
                    "ty": 4,
                    "nm": "corner3 m Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [89.019, 62.304, 0], "ix": 2 },
                        "a": { "a": 0, "k": [3.166, 2.399, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "ef": [{
                        "ty": 5,
                        "nm": "Transform",
                        "np": 14,
                        "mn": "ADBE Geometry2",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 3,
                            "nm": "Anchor Point",
                            "mn": "ADBE Geometry2-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": [121, 57], "ix": 1 }
                        }, {
                            "ty": 3,
                            "nm": "Position",
                            "mn": "ADBE Geometry2-0002",
                            "ix": 2,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": 0.833, "y": 0.833 },
                                    "o": { "x": 0.167, "y": 0.167 },
                                    "n": "0p833_0p833_0p167_0p167",
                                    "t": 65,
                                    "s": [120, 61],
                                    "e": [121, 57],
                                    "to": [0.16666667163372, -0.66666668653488],
                                    "ti": [-0.16666667163372, 0.66666668653488]
                                }, { "t": 92 }],
                                "ix": 2
                            }
                        }, {
                            "ty": 7,
                            "nm": "Uniform Scale",
                            "mn": "ADBE Geometry2-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 0,
                            "nm": "Scale Height",
                            "mn": "ADBE Geometry2-0003",
                            "ix": 4,
                            "v": { "a": 0, "k": 100, "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": "Scale Width",
                            "mn": "ADBE Geometry2-0004",
                            "ix": 5,
                            "v": { "a": 0, "k": 100, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Skew",
                            "mn": "ADBE Geometry2-0005",
                            "ix": 6,
                            "v": { "a": 0, "k": 0, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Skew Axis",
                            "mn": "ADBE Geometry2-0006",
                            "ix": 7,
                            "v": { "a": 0, "k": 0, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Rotation",
                            "mn": "ADBE Geometry2-0007",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Geometry2-0008",
                            "ix": 9,
                            "v": { "a": 0, "k": 100, "ix": 9 }
                        }, {
                            "ty": 7,
                            "nm": "Use Composition’s Shutter Angle",
                            "mn": "ADBE Geometry2-0009",
                            "ix": 10,
                            "v": { "a": 0, "k": 1, "ix": 10 }
                        }, {
                            "ty": 0,
                            "nm": "Shutter Angle",
                            "mn": "ADBE Geometry2-0010",
                            "ix": 11,
                            "v": { "a": 0, "k": 0, "ix": 11 }
                        }, {
                            "ty": 7,
                            "nm": "Sampling",
                            "mn": "ADBE Geometry2-0012",
                            "ix": 12,
                            "v": { "a": 0, "k": 1, "ix": 12 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[0, 0], [-2.244, 1.923], [2.917, 0.5]],
                                    "o": [[1.632, 2.503], [0, 0], [-2.916, -0.5]],
                                    "v": [[-1.311, -2.149], [2.479, -1.672], [-0.001, 1.649]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [3.167, 2.399], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 65,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 9,
                    "ty": 4,
                    "nm": "corner2 m Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [74.029, 62.778, 0], "ix": 2 },
                        "a": { "a": 0, "k": [2.426, 2.365, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "ef": [{
                        "ty": 5,
                        "nm": "Transform",
                        "np": 14,
                        "mn": "ADBE Geometry2",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 3,
                            "nm": "Anchor Point",
                            "mn": "ADBE Geometry2-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": [121, 57], "ix": 1 }
                        }, {
                            "ty": 3,
                            "nm": "Position",
                            "mn": "ADBE Geometry2-0002",
                            "ix": 2,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": 0.833, "y": 0.833 },
                                    "o": { "x": 0.167, "y": 0.167 },
                                    "n": "0p833_0p833_0p167_0p167",
                                    "t": 57,
                                    "s": [120, 61],
                                    "e": [121, 57],
                                    "to": [0.16666667163372, -0.66666668653488],
                                    "ti": [-0.16666667163372, 0.66666668653488]
                                }, { "t": 83 }],
                                "ix": 2
                            }
                        }, {
                            "ty": 7,
                            "nm": "Uniform Scale",
                            "mn": "ADBE Geometry2-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 0,
                            "nm": "Scale Height",
                            "mn": "ADBE Geometry2-0003",
                            "ix": 4,
                            "v": { "a": 0, "k": 100, "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": "Scale Width",
                            "mn": "ADBE Geometry2-0004",
                            "ix": 5,
                            "v": { "a": 0, "k": 100, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Skew",
                            "mn": "ADBE Geometry2-0005",
                            "ix": 6,
                            "v": { "a": 0, "k": 0, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Skew Axis",
                            "mn": "ADBE Geometry2-0006",
                            "ix": 7,
                            "v": { "a": 0, "k": 0, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Rotation",
                            "mn": "ADBE Geometry2-0007",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Geometry2-0008",
                            "ix": 9,
                            "v": { "a": 0, "k": 100, "ix": 9 }
                        }, {
                            "ty": 7,
                            "nm": "Use Composition’s Shutter Angle",
                            "mn": "ADBE Geometry2-0009",
                            "ix": 10,
                            "v": { "a": 0, "k": 1, "ix": 10 }
                        }, {
                            "ty": 0,
                            "nm": "Shutter Angle",
                            "mn": "ADBE Geometry2-0010",
                            "ix": 11,
                            "v": { "a": 0, "k": 0, "ix": 11 }
                        }, {
                            "ty": 7,
                            "nm": "Sampling",
                            "mn": "ADBE Geometry2-0012",
                            "ix": 12,
                            "v": { "a": 0, "k": 1, "ix": 12 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[0, 0], [-1.669, 1.507], [2.17, 0.898]],
                                    "o": [[0.533, 2.164], [0, 0], [-1.812, -0.75]],
                                    "v": [[-0.322, -2.115], [2.176, -1.453], [-0.365, 1.217]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [2.426, 2.365], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 57,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 10,
                    "ty": 4,
                    "nm": "corner1 m Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [62.773, 78.703, 0], "ix": 2 },
                        "a": { "a": 0, "k": [2.957, 3.584, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "ef": [{
                        "ty": 5,
                        "nm": "Transform",
                        "np": 14,
                        "mn": "ADBE Geometry2",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 3,
                            "nm": "Anchor Point",
                            "mn": "ADBE Geometry2-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": [121, 57], "ix": 1 }
                        }, {
                            "ty": 3,
                            "nm": "Position",
                            "mn": "ADBE Geometry2-0002",
                            "ix": 2,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": 0.833, "y": 0.833 },
                                    "o": { "x": 0.167, "y": 0.167 },
                                    "n": "0p833_0p833_0p167_0p167",
                                    "t": 51,
                                    "s": [122, 51],
                                    "e": [121, 57],
                                    "to": [-0.16666667163372, 1],
                                    "ti": [0.16666667163372, -1]
                                }, { "t": 76 }],
                                "ix": 2
                            }
                        }, {
                            "ty": 7,
                            "nm": "Uniform Scale",
                            "mn": "ADBE Geometry2-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 0,
                            "nm": "Scale Height",
                            "mn": "ADBE Geometry2-0003",
                            "ix": 4,
                            "v": { "a": 0, "k": 100, "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": "Scale Width",
                            "mn": "ADBE Geometry2-0004",
                            "ix": 5,
                            "v": { "a": 0, "k": 100, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Skew",
                            "mn": "ADBE Geometry2-0005",
                            "ix": 6,
                            "v": { "a": 0, "k": 0, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Skew Axis",
                            "mn": "ADBE Geometry2-0006",
                            "ix": 7,
                            "v": { "a": 0, "k": 0, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Rotation",
                            "mn": "ADBE Geometry2-0007",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Geometry2-0008",
                            "ix": 9,
                            "v": { "a": 0, "k": 100, "ix": 9 }
                        }, {
                            "ty": 7,
                            "nm": "Use Composition’s Shutter Angle",
                            "mn": "ADBE Geometry2-0009",
                            "ix": 10,
                            "v": { "a": 0, "k": 1, "ix": 10 }
                        }, {
                            "ty": 0,
                            "nm": "Shutter Angle",
                            "mn": "ADBE Geometry2-0010",
                            "ix": 11,
                            "v": { "a": 0, "k": 0, "ix": 11 }
                        }, {
                            "ty": 7,
                            "nm": "Sampling",
                            "mn": "ADBE Geometry2-0012",
                            "ix": 12,
                            "v": { "a": 0, "k": 1, "ix": 12 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[2.534, 1.568], [0, 0], [-0.345, -0.246], [0, 0]],
                                    "o": [[-1.844, -1.141], [0, 0], [0.329, 0.235], [0, 0]],
                                    "v": [[0.173, -2.193], [-2.707, 1.708], [-1.119, 0.757], [-1.311, 3.333]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [2.957, 3.584], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 51,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 11,
                    "ty": 4,
                    "nm": "corner u Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [41.336, 87.006, 0], "ix": 2 },
                        "a": { "a": 0, "k": [3.308, 3.219, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "ef": [{
                        "ty": 5,
                        "nm": "Transform",
                        "np": 14,
                        "mn": "ADBE Geometry2",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 3,
                            "nm": "Anchor Point",
                            "mn": "ADBE Geometry2-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": [121, 57], "ix": 1 }
                        }, {
                            "ty": 3,
                            "nm": "Position",
                            "mn": "ADBE Geometry2-0002",
                            "ix": 2,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": 0.833, "y": 0.833 },
                                    "o": { "x": 0.167, "y": 0.167 },
                                    "n": "0p833_0p833_0p167_0p167",
                                    "t": 32,
                                    "s": [121, 54],
                                    "e": [121, 57],
                                    "to": [0, 0.5],
                                    "ti": [0, -0.5]
                                }, { "t": 60 }],
                                "ix": 2
                            }
                        }, {
                            "ty": 7,
                            "nm": "Uniform Scale",
                            "mn": "ADBE Geometry2-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 0,
                            "nm": "Scale Height",
                            "mn": "ADBE Geometry2-0003",
                            "ix": 4,
                            "v": { "a": 0, "k": 100, "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": "Scale Width",
                            "mn": "ADBE Geometry2-0004",
                            "ix": 5,
                            "v": { "a": 0, "k": 100, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Skew",
                            "mn": "ADBE Geometry2-0005",
                            "ix": 6,
                            "v": { "a": 0, "k": 0, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Skew Axis",
                            "mn": "ADBE Geometry2-0006",
                            "ix": 7,
                            "v": { "a": 0, "k": 0, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Rotation",
                            "mn": "ADBE Geometry2-0007",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Geometry2-0008",
                            "ix": 9,
                            "v": { "a": 0, "k": 100, "ix": 9 }
                        }, {
                            "ty": 7,
                            "nm": "Use Composition’s Shutter Angle",
                            "mn": "ADBE Geometry2-0009",
                            "ix": 10,
                            "v": { "a": 0, "k": 1, "ix": 10 }
                        }, {
                            "ty": 0,
                            "nm": "Shutter Angle",
                            "mn": "ADBE Geometry2-0010",
                            "ix": 11,
                            "v": { "a": 0, "k": 0, "ix": 11 }
                        }, {
                            "ty": 7,
                            "nm": "Sampling",
                            "mn": "ADBE Geometry2-0012",
                            "ix": 12,
                            "v": { "a": 0, "k": 1, "ix": 12 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[0, 0], [1.614, -1.483], [-2.75, -0.416]],
                                    "o": [[-1.12, -1.883], [-1.985, 1.824], [2.75, 0.417]],
                                    "v": [[2.159, 1.443], [-1.072, 1.145], [0.307, -2.553]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [3.307, 3.219], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 32,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 12,
                    "ty": 4,
                    "nm": "~ Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [95.426, 103.837, 0], "ix": 2 },
                        "a": { "a": 0, "k": [44.076, 8.796, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "hasMask": true,
                    "masksProperties": [{
                        "inv": false,
                        "mode": "n",
                        "pt": {
                            "a": 0,
                            "k": {
                                "i": [[-9.625, -7.375], [-9.875, 0.625], [-4.625, 0.625]],
                                "o": [[9.625, 7.375], [9.875, -0.625], [4.625, -0.625]],
                                "v": [[2.65, 1.709], [31.15, 14.459], [85.9, 4.209]],
                                "c": false
                            },
                            "ix": 1
                        },
                        "o": { "a": 0, "k": 100, "ix": 3 },
                        "x": { "a": 0, "k": 0, "ix": 4 },
                        "nm": "Mask 1"
                    }],
                    "ef": [{
                        "ty": 22,
                        "nm": "Stroke",
                        "np": 13,
                        "mn": "ADBE Stroke",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 10,
                            "nm": "Path",
                            "mn": "ADBE Stroke-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": 0, "ix": 1 }
                        }, {
                            "ty": 7,
                            "nm": "All Masks",
                            "mn": "ADBE Stroke-0010",
                            "ix": 2,
                            "v": { "a": 0, "k": 1, "ix": 2 }
                        }, {
                            "ty": 7,
                            "nm": "Stroke Sequentially",
                            "mn": "ADBE Stroke-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 2,
                            "nm": "Color",
                            "mn": "ADBE Stroke-0002",
                            "ix": 4,
                            "v": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Size",
                            "mn": "ADBE Stroke-0003",
                            "ix": 5,
                            "v": { "a": 0, "k": 4, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Hardness",
                            "mn": "ADBE Stroke-0004",
                            "ix": 6,
                            "v": { "a": 0, "k": 0.95, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Stroke-0005",
                            "ix": 7,
                            "v": { "a": 0, "k": 1, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Start",
                            "mn": "ADBE Stroke-0008",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "End",
                            "mn": "ADBE Stroke-0009",
                            "ix": 9,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": [0.667], "y": [1] },
                                    "o": { "x": [0.333], "y": [0] },
                                    "n": ["0p667_1_0p333_0"],
                                    "t": 287,
                                    "s": [0],
                                    "e": [100]
                                }, { "t": 320 }],
                                "ix": 9
                            }
                        }, {
                            "ty": 7,
                            "nm": "Spacing",
                            "mn": "ADBE Stroke-0006",
                            "ix": 10,
                            "v": { "a": 0, "k": 0, "ix": 10 }
                        }, {
                            "ty": 7,
                            "nm": "Paint Style",
                            "mn": "ADBE Stroke-0007",
                            "ix": 11,
                            "v": { "a": 0, "k": 3, "ix": 11 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[-1.674, -0.917], [0.001, -0.597], [0.657, -0.228], [1.912, -0.405], [12.636, -2.545], [2.559, -0.35], [3.479, 1.29], [5.203, 5.223], [-0.439, 1.103], [-1.146, 0.038], [-1.369, -1.139], [-9.949, 0.768], [-4.941, 0.999], [-10.897, 2.302]],
                                    "o": [[0.651, 0.357], [-0.002, 0.57], [-1.838, 0.637], [-12.61, 2.663], [-3.833, 0.771], [-5.057, -0.171], [-6.951, -2.578], [-0.673, -0.675], [0.478, -1.2], [1.745, -0.057], [7.261, 6.043], [5.013, -0.388], [10.916, -2.209], [1.928, -0.408]],
                                    "v": [[42.387, -5.699], [43.825, -3.945], [42.327, -2.292], [36.658, -0.809], [-1.191, 7.096], [-11.512, 8.546], [-23.691, 6.658], [-42.151, -4.712], [-43.387, -7.161], [-40.523, -8.488], [-35.996, -6.811], [-10.691, 2.811], [4.24, 0.357], [36.937, -6.512]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [44.076, 8.795], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 23,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 13,
                    "ty": 4,
                    "nm": "a Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [222.239, 61.35, 0], "ix": 2 },
                        "a": { "a": 0, "k": [17.513, 15.578, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "hasMask": true,
                    "masksProperties": [{
                        "inv": false,
                        "mode": "n",
                        "pt": {
                            "a": 0,
                            "k": {
                                "i": [[4.625, 0.75], [5.5, -6.375], [-2.75, -2.625], [-3.125, 3.25], [-5.003, -1.98], [0, 0]],
                                "o": [[-4.625, -0.75], [-4.545, 5.268], [3.479, 3.32], [0.25, -0.625], [6, 2.375], [0, 0]],
                                "v": [[22.648, 4.603], [8.148, 12.353], [6.773, 26.478], [19.773, 14.228], [22.273, 25.853], [32.648, 20.853]],
                                "c": false
                            },
                            "ix": 1
                        },
                        "o": { "a": 0, "k": 100, "ix": 3 },
                        "x": { "a": 0, "k": 0, "ix": 4 },
                        "nm": "Mask 1"
                    }],
                    "ef": [{
                        "ty": 22,
                        "nm": "Stroke",
                        "np": 13,
                        "mn": "ADBE Stroke",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 10,
                            "nm": "Path",
                            "mn": "ADBE Stroke-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": 0, "ix": 1 }
                        }, {
                            "ty": 7,
                            "nm": "All Masks",
                            "mn": "ADBE Stroke-0010",
                            "ix": 2,
                            "v": { "a": 0, "k": 1, "ix": 2 }
                        }, {
                            "ty": 7,
                            "nm": "Stroke Sequentially",
                            "mn": "ADBE Stroke-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 2,
                            "nm": "Color",
                            "mn": "ADBE Stroke-0002",
                            "ix": 4,
                            "v": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Size",
                            "mn": "ADBE Stroke-0003",
                            "ix": 5,
                            "v": { "a": 0, "k": 4, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Hardness",
                            "mn": "ADBE Stroke-0004",
                            "ix": 6,
                            "v": { "a": 0, "k": 0.95, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Stroke-0005",
                            "ix": 7,
                            "v": { "a": 0, "k": 1, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Start",
                            "mn": "ADBE Stroke-0008",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "End",
                            "mn": "ADBE Stroke-0009",
                            "ix": 9,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": [0.667], "y": [1] },
                                    "o": { "x": [0.333], "y": [0] },
                                    "n": ["0p667_1_0p333_0"],
                                    "t": 254,
                                    "s": [0],
                                    "e": [100]
                                }, { "t": 284 }],
                                "ix": 9
                            }
                        }, {
                            "ty": 7,
                            "nm": "Spacing",
                            "mn": "ADBE Stroke-0006",
                            "ix": 10,
                            "v": { "a": 0, "k": 0, "ix": 10 }
                        }, {
                            "ty": 7,
                            "nm": "Paint Style",
                            "mn": "ADBE Stroke-0007",
                            "ix": 11,
                            "v": { "a": 0, "k": 3, "ix": 11 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[-3.969, 5.169], [-4.616, 1.857], [-3.245, -1.562], [-0.354, -0.357], [0.947, -0.812], [2.53, 1.13], [1.273, -1.117], [0.935, -5.088], [-0.121, -0.322], [-0.525, -0.366], [-0.38, 0.43], [-1.854, 2.213], [-1.842, 0.476], [0.464, -2.165], [0.36, -1.046], [-1.556, -0.978], [-1.491, 1.627], [-1.819, 0.02], [-0.466, -0.534], [0.316, -0.684], [3.597, -0.084], [1.795, 1.745], [0.359, 0.524], [0.892, -0.909], [0.699, -0.542], [2.583, 5.042]],
                                    "o": [[3.523, -4.588], [3.427, -1.378], [0.446, 0.216], [0.897, 0.905], [-1.824, 1.565], [-1.653, -0.738], [-3.731, 3.275], [-0.068, 0.376], [0.251, 0.672], [0.279, 0.195], [1.913, -2.159], [1.15, -1.372], [2.109, -0.545], [-0.231, 1.074], [-0.716, 2.084], [1.405, 0.883], [1.181, -1.289], [0.823, -0.01], [0.379, 0.435], [-1.883, 4.065], [-3.598, 0.047], [-0.925, -0.899], [-0.065, -0.095], [-0.623, 0.635], [-2.891, 2.245], [-1.515, -2.955]],
                                    "v": [[-13.294, -4.775], [-2.342, -13.951], [7.683, -13.258], [8.887, -12.338], [8.878, -9.956], [2.56, -8.318], [-1.931, -7.574], [-9.551, 4.607], [-9.633, 5.743], [-8.587, 7.59], [-6.93, 6.898], [-1.351, 0.275], [2.81, -2.904], [5.496, -0.374], [4.456, 2.773], [5.748, 7.499], [10.25, 6.434], [14.493, 3.96], [16.883, 4.637], [16.799, 6.98], [8.398, 13.816], [0.924, 11.191], [-0.721, 9.228], [-2.968, 11.258], [-4.914, 13.083], [-14.679, 10.061]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [17.513, 15.578], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 23,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 14,
                    "ty": 4,
                    "nm": "l Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [211.065, 47.344, 0], "ix": 2 },
                        "a": { "a": 0, "k": [21.249, 29.587, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "hasMask": true,
                    "masksProperties": [{
                        "inv": false,
                        "mode": "n",
                        "pt": {
                            "a": 0,
                            "k": {
                                "i": [[-6.625, 6.125], [4.625, 0.25], [3.5, -5.375], [2, -7.125], [-4.75, 2.125], [-4.25, 5.75], [-6.25, -2.875]],
                                "o": [[6.625, -6.125], [-4.625, -0.25], [-3.5, 5.375], [-2, 7.125], [4.75, -2.125], [4.25, -5.75], [6.746, 3.103]],
                                "v": [[27.434, 19.242], [33.684, 4.492], [20.059, 15.742], [4.434, 46.742], [9.559, 54.742], [23.309, 38.742], [39.559, 33.492]],
                                "c": false
                            },
                            "ix": 1
                        },
                        "o": { "a": 0, "k": 100, "ix": 3 },
                        "x": { "a": 0, "k": 0, "ix": 4 },
                        "nm": "Mask 1"
                    }],
                    "ef": [{
                        "ty": 22,
                        "nm": "Stroke",
                        "np": 13,
                        "mn": "ADBE Stroke",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 10,
                            "nm": "Path",
                            "mn": "ADBE Stroke-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": 0, "ix": 1 }
                        }, {
                            "ty": 7,
                            "nm": "All Masks",
                            "mn": "ADBE Stroke-0010",
                            "ix": 2,
                            "v": { "a": 0, "k": 1, "ix": 2 }
                        }, {
                            "ty": 7,
                            "nm": "Stroke Sequentially",
                            "mn": "ADBE Stroke-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 2,
                            "nm": "Color",
                            "mn": "ADBE Stroke-0002",
                            "ix": 4,
                            "v": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Size",
                            "mn": "ADBE Stroke-0003",
                            "ix": 5,
                            "v": { "a": 0, "k": 4, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Hardness",
                            "mn": "ADBE Stroke-0004",
                            "ix": 6,
                            "v": { "a": 0, "k": 0.95, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Stroke-0005",
                            "ix": 7,
                            "v": { "a": 0, "k": 1, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Start",
                            "mn": "ADBE Stroke-0008",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "End",
                            "mn": "ADBE Stroke-0009",
                            "ix": 9,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": [0.667], "y": [1] },
                                    "o": { "x": [0.333], "y": [0] },
                                    "n": ["0p667_1_0p333_0"],
                                    "t": 231,
                                    "s": [0],
                                    "e": [100]
                                }, { "t": 259 }],
                                "ix": 9
                            }
                        }, {
                            "ty": 7,
                            "nm": "Spacing",
                            "mn": "ADBE Stroke-0006",
                            "ix": 10,
                            "v": { "a": 0, "k": 0, "ix": 10 }
                        }, {
                            "ty": 7,
                            "nm": "Paint Style",
                            "mn": "ADBE Stroke-0007",
                            "ix": 11,
                            "v": { "a": 0, "k": 3, "ix": 11 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[1.958, -2.875], [1.296, -0.681], [2.491, 1.809], [-0.392, 3.029], [-0.603, 1.385], [-5.831, 9.171], [-2.851, 3.523], [-2.427, 0.686], [-0.834, -3.043], [0.313, -1.437], [4.756, -2.724], [0.532, -0.02], [-0.08, 1.236], [-1.672, 1.221], [-0.863, 1.878], [-0.006, 0.314], [0.064, 0.642], [0.384, -0.349], [1.319, -1.739], [3.646, -7.656], [1.774, -3.961], [0.112, -1.114], [-0.548, -0.426], [-0.494, 0.459], [-1.226, 1.663], [-1.876, 2.68], [-4.617, 1.857], [-3.245, -1.562], [-0.354, -0.357], [0.947, -0.812], [2.53, 1.131], [3.083, -3]],
                                    "o": [[-2.506, 3.68], [-2.606, 1.369], [-2.537, -1.843], [0.194, -1.505], [4.333, -9.953], [2.43, -3.822], [1.56, -1.928], [3.323, -0.942], [0.388, 1.419], [-1.219, 5.607], [-0.457, 0.26], [-1.218, 0.047], [0.133, -2.056], [1.635, -1.193], [0.142, -0.31], [0.012, -0.64], [-0.629, 0.072], [-1.625, 1.471], [-5.133, 6.765], [-1.865, 3.917], [-0.466, 1.041], [-0.079, 0.776], [0.419, 0.327], [1.512, -1.404], [1.94, -2.63], [2.832, -4.047], [3.426, -1.378], [0.446, 0.215], [0.896, 0.905], [-1.824, 1.565], [-1.653, -0.737], [-4.062, 3.952]],
                                    "v": [[-2.504, 20.609], [-10.129, 27.859], [-17.642, 27.527], [-20.607, 19.956], [-19.429, 15.531], [-4.96, -13.58], [3.197, -24.471], [9.308, -28.395], [16.943, -24.758], [17.074, -20.238], [7.382, -8.249], [5.807, -7.858], [4.058, -9.654], [6.682, -14.689], [10.602, -19.113], [10.994, -20.048], [10.824, -21.973], [8.974, -21.715], [4.353, -17.027], [-8.336, 4.91], [-13.765, 16.742], [-14.809, 20.005], [-14.035, 22.335], [-11.817, 21.945], [-7.635, 17.352], [-2.119, 9.232], [8.834, 0.056], [18.857, 0.749], [20.062, 1.669], [20.052, 4.049], [13.734, 5.687], [7.163, 8.025]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [21.249, 29.587], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 23,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 15,
                    "ty": 4,
                    "nm": "e2 Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [183.09, 49.831, 0], "ix": 2 },
                        "a": { "a": 0, "k": [29.182, 31.558, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "hasMask": true,
                    "masksProperties": [{
                        "inv": false,
                        "mode": "n",
                        "pt": {
                            "a": 0,
                            "k": {
                                "i": [[4.75, -3.5], [-2.875, -7.625], [-3.75, 4.125], [-3, 7.5], [-8.5, -0.5]],
                                "o": [[-4.75, 3.5], [2.875, 7.625], [3.75, -4.125], [3, -7.5], [7.367, 0.433]],
                                "v": [[10.716, 33.602], [4.216, 52.477], [19.216, 52.602], [39.716, 18.102], [56.466, 2.602]],
                                "c": false
                            },
                            "ix": 1
                        },
                        "o": { "a": 0, "k": 100, "ix": 3 },
                        "x": { "a": 0, "k": 0, "ix": 4 },
                        "nm": "Mask 1"
                    }],
                    "ef": [{
                        "ty": 22,
                        "nm": "Stroke",
                        "np": 13,
                        "mn": "ADBE Stroke",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 10,
                            "nm": "Path",
                            "mn": "ADBE Stroke-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": 0, "ix": 1 }
                        }, {
                            "ty": 7,
                            "nm": "All Masks",
                            "mn": "ADBE Stroke-0010",
                            "ix": 2,
                            "v": { "a": 0, "k": 1, "ix": 2 }
                        }, {
                            "ty": 7,
                            "nm": "Stroke Sequentially",
                            "mn": "ADBE Stroke-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 2,
                            "nm": "Color",
                            "mn": "ADBE Stroke-0002",
                            "ix": 4,
                            "v": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Size",
                            "mn": "ADBE Stroke-0003",
                            "ix": 5,
                            "v": { "a": 0, "k": 4, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Hardness",
                            "mn": "ADBE Stroke-0004",
                            "ix": 6,
                            "v": { "a": 0, "k": 0.95, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Stroke-0005",
                            "ix": 7,
                            "v": { "a": 0, "k": 1, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Start",
                            "mn": "ADBE Stroke-0008",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "End",
                            "mn": "ADBE Stroke-0009",
                            "ix": 9,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": [0.667], "y": [1] },
                                    "o": { "x": [0.333], "y": [0] },
                                    "n": ["0p667_1_0p333_0"],
                                    "t": 208,
                                    "s": [0],
                                    "e": [100]
                                }, { "t": 231 }],
                                "ix": 9
                            }
                        }, {
                            "ty": 7,
                            "nm": "Spacing",
                            "mn": "ADBE Stroke-0006",
                            "ix": 10,
                            "v": { "a": 0, "k": 0, "ix": 10 }
                        }, {
                            "ty": 7,
                            "nm": "Paint Style",
                            "mn": "ADBE Stroke-0007",
                            "ix": 11,
                            "v": { "a": 0, "k": 3, "ix": 11 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[-1.821, -2.518], [-2.425, 1.36], [-1.071, 1.244], [-3.143, 6.172], [-3.575, 6.733], [-1.954, 2.441], [-4.236, -0.164], [-0.497, -1.09], [0.8, -0.638], [1.206, -0.297], [1.273, -2.029], [1.972, -3.757], [3.82, -6.98], [2.691, -3.673], [1.609, -1.125], [1.223, 8.672], [0.104, 0.938], [-5.884, 4.082], [-0.625, -1.875], [1.716, -0.494], [1.542, -2.666]],
                                    "o": [[1.821, 2.518], [1.445, -0.811], [4.572, -5.315], [3.458, -6.792], [1.454, -2.739], [2.609, -3.258], [1.058, 0.041], [0.513, 1.128], [-0.998, 0.796], [-2.491, 0.613], [-2.261, 3.602], [-3.698, 7.045], [-2.174, 3.968], [-1.138, 1.554], [-7.286, 5.098], [-0.121, -0.862], [0.49, -6.979], [3.289, -2.281], [0.477, 1.431], [-1.519, 0.437], [-1.542, 2.667]],
                                    "v": [[-21.975, 20.313], [-15.383, 22.22], [-11.503, 19.054], [-0.45, 1.491], [9.861, -18.916], [15.15, -26.66], [25.624, -31.144], [28.419, -30.013], [27.258, -27.338], [23.936, -25.38], [18.271, -21.416], [11.831, -10.408], [0.964, 10.838], [-6.609, 22.191], [-10.934, 26.21], [-28.633, 18.702], [-28.932, 16.035], [-19.454, -0.755], [-13.322, -0.003], [-15.87, 3.825], [-21.029, 9.497]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [29.181, 31.558], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 19,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 16,
                    "ty": 4,
                    "nm": "e1 Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [164.73, 57.237, 0], "ix": 2 },
                        "a": { "a": 0, "k": [10.691, 10.277, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "hasMask": true,
                    "masksProperties": [{
                        "inv": false,
                        "mode": "n",
                        "pt": {
                            "a": 0,
                            "k": {
                                "i": [[-6.494, -0.375], [-1, 3.625], [7.375, -8.75]],
                                "o": [[6.5, 0.375], [1, -3.625], [-7.375, 8.75]],
                                "v": [[3.085, 15.79], [18.21, 8.29], [7.585, 7.415]],
                                "c": false
                            },
                            "ix": 1
                        },
                        "o": { "a": 0, "k": 100, "ix": 3 },
                        "x": { "a": 0, "k": 0, "ix": 4 },
                        "nm": "Mask 1"
                    }],
                    "ef": [{
                        "ty": 22,
                        "nm": "Stroke",
                        "np": 13,
                        "mn": "ADBE Stroke",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 10,
                            "nm": "Path",
                            "mn": "ADBE Stroke-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": 0, "ix": 1 }
                        }, {
                            "ty": 7,
                            "nm": "All Masks",
                            "mn": "ADBE Stroke-0010",
                            "ix": 2,
                            "v": { "a": 0, "k": 1, "ix": 2 }
                        }, {
                            "ty": 7,
                            "nm": "Stroke Sequentially",
                            "mn": "ADBE Stroke-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 2,
                            "nm": "Color",
                            "mn": "ADBE Stroke-0002",
                            "ix": 4,
                            "v": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Size",
                            "mn": "ADBE Stroke-0003",
                            "ix": 5,
                            "v": { "a": 0, "k": 4, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Hardness",
                            "mn": "ADBE Stroke-0004",
                            "ix": 6,
                            "v": { "a": 0, "k": 0.95, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Stroke-0005",
                            "ix": 7,
                            "v": { "a": 0, "k": 1, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Start",
                            "mn": "ADBE Stroke-0008",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "End",
                            "mn": "ADBE Stroke-0009",
                            "ix": 9,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": [0.667], "y": [1] },
                                    "o": { "x": [0.333], "y": [0] },
                                    "n": ["0p667_1_0p333_0"],
                                    "t": 198,
                                    "s": [0],
                                    "e": [100]
                                }, { "t": 212 }],
                                "ix": 9
                            }
                        }, {
                            "ty": 7,
                            "nm": "Spacing",
                            "mn": "ADBE Stroke-0006",
                            "ix": 10,
                            "v": { "a": 0, "k": 0, "ix": 10 }
                        }, {
                            "ty": 7,
                            "nm": "Paint Style",
                            "mn": "ADBE Stroke-0007",
                            "ix": 11,
                            "v": { "a": 0, "k": 3, "ix": 11 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[-2.045, 2.192], [-1.992, 0.031], [-0.301, -3.255], [1.53, -1.982], [2.797, -1.313], [3.396, -1.125], [-1.146, 4.083], [-1.506, -0.156], [-1.297, 1.735], [2.024, -1.259], [1.567, -0.356]],
                                    "o": [[4.547, -4.875], [3.35, -0.053], [0.234, 2.551], [-1.89, 2.451], [-0.958, 0.451], [-1.443, 0.478], [1.071, -3.817], [2.422, 0.25], [1.381, -1.847], [-1.611, 1.002], [-2.223, 0.506]],
                                    "v": [[-5.05, -4.68], [4.266, -9.974], [10.207, -4.716], [7.989, 1.982], [0.782, 7.424], [-4.899, 9.549], [-9.295, 5.508], [-2.503, 1.461], [3.2, -1.274], [1.617, -3.166], [-2.144, -0.555]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [10.691, 10.277], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 17,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 17,
                    "ty": 4,
                    "nm": "r Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [188.093, 73.433, 0], "ix": 2 },
                        "a": { "a": 0, "k": [52.975, 28.677, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "hasMask": true,
                    "masksProperties": [{
                        "inv": false,
                        "mode": "n",
                        "pt": {
                            "a": 0,
                            "k": {
                                "i": [[3.016, -0.848], [-5.478, -3.913], [2, -2.75], [0.7, -7.285], [-9.25, 1.875], [-14.25, 1], [-2.875, -5.625]],
                                "o": [[-2, 0.562], [4.375, 3.125], [-1.252, 1.722], [-0.625, 6.5], [9.25, -1.875], [14.25, -1], [2.526, 4.943]],
                                "v": [[7.131, 3.994], [8.069, 11.119], [11.881, 17.494], [5.881, 37.994], [20.756, 54.119], [75.631, 40.994], [103.256, 48.494]],
                                "c": false
                            },
                            "ix": 1
                        },
                        "o": { "a": 0, "k": 100, "ix": 3 },
                        "x": { "a": 0, "k": 0, "ix": 4 },
                        "nm": "Mask 1"
                    }],
                    "ef": [{
                        "ty": 22,
                        "nm": "Stroke",
                        "np": 13,
                        "mn": "ADBE Stroke",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 10,
                            "nm": "Path",
                            "mn": "ADBE Stroke-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": 0, "ix": 1 }
                        }, {
                            "ty": 7,
                            "nm": "All Masks",
                            "mn": "ADBE Stroke-0010",
                            "ix": 2,
                            "v": { "a": 0, "k": 1, "ix": 2 }
                        }, {
                            "ty": 7,
                            "nm": "Stroke Sequentially",
                            "mn": "ADBE Stroke-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 2,
                            "nm": "Color",
                            "mn": "ADBE Stroke-0002",
                            "ix": 4,
                            "v": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Size",
                            "mn": "ADBE Stroke-0003",
                            "ix": 5,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": [0.667], "y": [1] },
                                    "o": { "x": [0.333], "y": [0] },
                                    "n": ["0p667_1_0p333_0"],
                                    "t": 91,
                                    "s": [6],
                                    "e": [4]
                                }, { "t": 93 }],
                                "ix": 5
                            }
                        }, {
                            "ty": 0,
                            "nm": "Brush Hardness",
                            "mn": "ADBE Stroke-0004",
                            "ix": 6,
                            "v": { "a": 0, "k": 0.95, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Stroke-0005",
                            "ix": 7,
                            "v": { "a": 0, "k": 1, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Start",
                            "mn": "ADBE Stroke-0008",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "End",
                            "mn": "ADBE Stroke-0009",
                            "ix": 9,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": [0.667], "y": [1] },
                                    "o": { "x": [0.333], "y": [0] },
                                    "n": ["0p667_1_0p333_0"],
                                    "t": 156,
                                    "s": [0],
                                    "e": [100]
                                }, { "t": 198 }],
                                "ix": 9
                            }
                        }, {
                            "ty": 7,
                            "nm": "Spacing",
                            "mn": "ADBE Stroke-0006",
                            "ix": 10,
                            "v": { "a": 0, "k": 0, "ix": 10 }
                        }, {
                            "ty": 7,
                            "nm": "Paint Style",
                            "mn": "ADBE Stroke-0007",
                            "ix": 11,
                            "v": { "a": 0, "k": 3, "ix": 11 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": { "i": [[0, 0]], "o": [[0, 0]], "v": [[-179.619, 4.244]], "c": false },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "st",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 },
                            "o": { "a": 0, "k": 100, "ix": 4 },
                            "w": { "a": 0, "k": 2, "ix": 5 },
                            "lc": 1,
                            "lj": 1,
                            "ml": 4,
                            "nm": "Stroke 1",
                            "mn": "ADBE Vector Graphic - Stroke",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [0, 0], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Shape 1",
                        "np": 3,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }, {
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[-3.767, -3.757], [-1.095, -1.494], [0, 0], [2.072, 1.169], [0.24, 0.234], [5.179, 0.068], [9.679, -2.533], [8.945, -2.548], [4.702, 1.107], [0.268, 7.714], [-1.569, 4.503], [-1.067, 2.79], [1.656, 0.996], [1.461, 1.134], [-0.027, 2.136], [-3.503, -2.094], [0.032, -1.211], [0.112, -0.631], [-1.964, -0.877], [-0.808, -0.363], [1.27, -2.683], [1.161, -3.415], [0.412, -3.741], [-7.353, 1.343], [-4.955, 1.477], [-10.551, 1.573], [-6.802, -0.651]],
                                    "o": [[1.292, 1.289], [0, 0], [-1.325, 1.422], [-0.293, -0.164], [-3.91, -3.804], [-10.045, -0.132], [-8.993, 2.354], [-4.537, 1.293], [-7.388, -1.741], [-0.169, -4.839], [0.981, -2.82], [0.693, -1.815], [-1.59, -0.955], [-1.596, -1.239], [0.052, -4.112], [1.036, 0.62], [-0.017, 0.639], [-0.375, 2.114], [0.808, 0.361], [2.685, 1.204], [-1.548, 3.272], [-1.215, 3.572], [-1.099, 9.961], [5.065, -0.926], [10.216, -3.045], [6.711, -1], [5.08, 0.487]],
                                    "v": [[49.409, 14.641], [52.725, 19.09], [52.725, 19.861], [47.298, 20.273], [46.467, 19.691], [32.525, 14.714], [2.956, 18.721], [-23.878, 26.367], [-37.701, 27.32], [-49.888, 12.171], [-47.477, -1.781], [-44.266, -10.145], [-45.49, -13.589], [-50.181, -16.579], [-52.697, -21.674], [-44.481, -26.333], [-42.969, -23.56], [-43.184, -21.648], [-41.3, -18.066], [-38.854, -17.034], [-36.939, -11.592], [-41.369, -1.682], [-44.038, 9.361], [-30.509, 21.727], [-15.533, 17.714], [15.49, 10.234], [35.74, 9.085]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [52.975, 28.677], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 2,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 0,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 18,
                    "ty": 4,
                    "nm": "b3 Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [121.313, 68.85, 0], "ix": 2 },
                        "a": { "a": 0, "k": [11.38, 17.293, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "hasMask": true,
                    "masksProperties": [{
                        "inv": false,
                        "mode": "n",
                        "pt": {
                            "a": 0,
                            "k": {
                                "i": [[-7.2, 7.781], [5.375, 5.25], [2.038, -4.84], [-2, -0.125]],
                                "o": [[7.75, -8.375], [-4.417, -4.314], [-2, 4.75], [2, 0.125]],
                                "v": [[11.192, 29.443], [17.567, 6.443], [7.317, 10.193], [11.692, 18.193]],
                                "c": false
                            },
                            "ix": 1
                        },
                        "o": { "a": 0, "k": 100, "ix": 3 },
                        "x": { "a": 0, "k": 0, "ix": 4 },
                        "nm": "Mask 1"
                    }],
                    "ef": [{
                        "ty": 22,
                        "nm": "Stroke",
                        "np": 13,
                        "mn": "ADBE Stroke",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 10,
                            "nm": "Path",
                            "mn": "ADBE Stroke-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": 0, "ix": 1 }
                        }, {
                            "ty": 7,
                            "nm": "All Masks",
                            "mn": "ADBE Stroke-0010",
                            "ix": 2,
                            "v": { "a": 0, "k": 1, "ix": 2 }
                        }, {
                            "ty": 7,
                            "nm": "Stroke Sequentially",
                            "mn": "ADBE Stroke-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 2,
                            "nm": "Color",
                            "mn": "ADBE Stroke-0002",
                            "ix": 4,
                            "v": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Size",
                            "mn": "ADBE Stroke-0003",
                            "ix": 5,
                            "v": { "a": 0, "k": 4, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Hardness",
                            "mn": "ADBE Stroke-0004",
                            "ix": 6,
                            "v": { "a": 0, "k": 0.95, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Stroke-0005",
                            "ix": 7,
                            "v": { "a": 0, "k": 1, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Start",
                            "mn": "ADBE Stroke-0008",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "End",
                            "mn": "ADBE Stroke-0009",
                            "ix": 9,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": [0.667], "y": [1] },
                                    "o": { "x": [0.333], "y": [0] },
                                    "n": ["0p667_1_0p333_0"],
                                    "t": 135,
                                    "s": [0],
                                    "e": [100]
                                }, { "t": 156 }],
                                "ix": 9
                            }
                        }, {
                            "ty": 7,
                            "nm": "Spacing",
                            "mn": "ADBE Stroke-0006",
                            "ix": 10,
                            "v": { "a": 0, "k": 0, "ix": 10 }
                        }, {
                            "ty": 7,
                            "nm": "Paint Style",
                            "mn": "ADBE Stroke-0007",
                            "ix": 11,
                            "v": { "a": 0, "k": 3, "ix": 11 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[1.125, -4.437], [-0.911, -0.291], [-1.081, 0.021], [-0.252, 1.177], [0.83, 0.739], [0.327, 0.18], [-0.864, 2.074], [-0.125, 0.216], [-1.44, -0.431], [0.009, -2.137], [0.18, -0.636], [2.484, -3.462], [0.027, -0.033], [1.985, 0.567], [1.375, -1.708], [-0.4, -0.364], [-3.105, 0.944], [-1.491, 1.836], [-1.205, 4.776], [0.081, 1.854], [4.303, 1.052]],
                                    "o": [[-1.326, 5.23], [1.044, 0.333], [1.097, -0.021], [0.24, -1.125], [-0.274, -0.245], [-1.947, -1.063], [0.097, -0.231], [1.027, -1.77], [1.283, 0.385], [-0.061, 0.504], [-1.152, 4.085], [-0.025, 0.034], [-1.251, 1.472], [-1.985, -0.566], [-1.044, 1.297], [2.428, 2.198], [2.307, -0.701], [3.132, -3.857], [0.453, -1.793], [-0.194, -4.445], [-7.116, -1.739]],
                                    "v": [[-7.585, -5.667], [-3.236, 2.478], [0.013, 2.987], [2.238, 1.129], [1.211, -1.669], [0.257, -2.253], [-1.161, -6.344], [-0.831, -7.02], [3.354, -9.286], [5.535, -5.087], [5.299, -3.258], [0.029, 8.155], [-0.051, 8.252], [-4.809, 10.503], [-10.085, 10.812], [-9.617, 14.243], [-1.286, 16.099], [4.293, 12.049], [10.54, -1.079], [11.048, -6.663], [3.717, -15.303]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [11.38, 17.293], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 0,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 19,
                    "ty": 4,
                    "nm": "b2 Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [128.503, 47.631, 0], "ix": 2 },
                        "a": { "a": 0, "k": [22.059, 38.511, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "hasMask": true,
                    "masksProperties": [{
                        "inv": false,
                        "mode": "n",
                        "pt": {
                            "a": 0,
                            "k": {
                                "i": [[8.574, -8.574], [3.5, -7.5], [-4, -4.375], [-1.375, 1.625]],
                                "o": [[-9.375, 9.375], [-3.5, 7.5], [4, 4.375], [1.375, -1.625]],
                                "v": [[32.806, 8.505], [8.806, 52.255], [6.431, 71.13], [16.681, 70.005]],
                                "c": false
                            },
                            "ix": 1
                        },
                        "o": { "a": 0, "k": 100, "ix": 3 },
                        "x": { "a": 0, "k": 0, "ix": 4 },
                        "nm": "Mask 1"
                    }],
                    "ef": [{
                        "ty": 22,
                        "nm": "Stroke",
                        "np": 13,
                        "mn": "ADBE Stroke",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 10,
                            "nm": "Path",
                            "mn": "ADBE Stroke-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": 0, "ix": 1 }
                        }, {
                            "ty": 7,
                            "nm": "All Masks",
                            "mn": "ADBE Stroke-0010",
                            "ix": 2,
                            "v": { "a": 0, "k": 1, "ix": 2 }
                        }, {
                            "ty": 7,
                            "nm": "Stroke Sequentially",
                            "mn": "ADBE Stroke-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 2,
                            "nm": "Color",
                            "mn": "ADBE Stroke-0002",
                            "ix": 4,
                            "v": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Size",
                            "mn": "ADBE Stroke-0003",
                            "ix": 5,
                            "v": { "a": 0, "k": 4, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Hardness",
                            "mn": "ADBE Stroke-0004",
                            "ix": 6,
                            "v": { "a": 0, "k": 0.95, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Stroke-0005",
                            "ix": 7,
                            "v": { "a": 0, "k": 1, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Start",
                            "mn": "ADBE Stroke-0008",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "End",
                            "mn": "ADBE Stroke-0009",
                            "ix": 9,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": [0.667], "y": [1] },
                                    "o": { "x": [0.333], "y": [0] },
                                    "n": ["0p667_1_0p333_0"],
                                    "t": 118,
                                    "s": [0],
                                    "e": [100]
                                }, { "t": 140 }],
                                "ix": 9
                            }
                        }, {
                            "ty": 7,
                            "nm": "Spacing",
                            "mn": "ADBE Stroke-0006",
                            "ix": 10,
                            "v": { "a": 0, "k": 0, "ix": 10 }
                        }, {
                            "ty": 7,
                            "nm": "Paint Style",
                            "mn": "ADBE Stroke-0007",
                            "ix": 11,
                            "v": { "a": 0, "k": 3, "ix": 11 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[0, 0], [0.001, -1.03], [-1.516, -0.406], [-1.251, 1.473], [-0.025, 0.033], [0, 0], [2.307, -0.701], [2.428, 2.199], [1.505, 2.408], [-1.596, 3.503], [-4.334, 9.77], [-1.062, 2.125], [-0.874, 1.208], [-2.355, 2.784], [-2.834, 1.776], [3.98, -1.998], [2.431, -4.503], [0.919, -1.676], [2.054, -4.477]],
                                    "o": [[-0.282, 0.994], [-0.001, 2.332], [2.172, 0.581], [0.027, -0.032], [0, 0], [-1.491, 1.837], [-3.106, 0.944], [-0.401, -0.363], [-1.25, -2], [1.984, -4.354], [0.313, -0.703], [1.013, -2.027], [0.875, -1.208], [2.079, -2.456], [2.835, -1.775], [-3.979, 1.997], [-1.439, 2.664], [-0.918, 1.677], [0, 0]],
                                    "v": [[-14.237, 23.801], [-14.703, 26.884], [-11.999, 31.722], [-7.241, 29.47], [-7.161, 29.374], [-2.897, 33.267], [-8.476, 37.317], [-16.806, 35.461], [-19.869, 31.864], [-20.213, 22.676], [-6.273, -8.515], [-3.088, -15.386], [0.35, -20.887], [6.635, -29.911], [13.765, -36.486], [17.829, -32.342], [6.877, -20.425], [1.226, -10.688], [-5.085, 2.672]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [22.059, 38.511], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 0,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 20,
                    "ty": 4,
                    "nm": "b1 Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [134.162, 21.237, 0], "ix": 2 },
                        "a": { "a": 0, "k": [49.554, 21.247, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "hasMask": true,
                    "masksProperties": [{
                        "inv": false,
                        "mode": "n",
                        "pt": {
                            "a": 0,
                            "k": {
                                "i": [[12, 1.75], [13.75, -14.75], [0, 0], [-8.25, -2.375], [-3.375, 1.875], [-6.625, -3.25], [-6.125, 3.375], [-6.875, -2], [0, 0], [4.75, 4.125], [8.75, -0.75], [0, 0]],
                                "o": [[-12, -1.75], [-13.75, 14.75], [0, 0], [8.25, 2.375], [3.375, -1.875], [6.625, 3.25], [6.125, -3.375], [6.875, 2], [0, 0], [-4.843, -4.206], [-8.256, 0.708], [0, 0]],
                                "v": [[59.266, 3.635], [17.266, 17.635], [2.266, 39.76], [20.391, 34.885], [31.766, 35.76], [52.016, 32.885], [63.891, 32.26], [86.891, 28.385], [95.391, 31.135], [85.516, 17.51], [67.266, 10.51], [53.641, 18.385]],
                                "c": false
                            },
                            "ix": 1
                        },
                        "o": { "a": 0, "k": 100, "ix": 3 },
                        "x": { "a": 0, "k": 0, "ix": 4 },
                        "nm": "Mask 1"
                    }],
                    "ef": [{
                        "ty": 22,
                        "nm": "Stroke",
                        "np": 13,
                        "mn": "ADBE Stroke",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 10,
                            "nm": "Path",
                            "mn": "ADBE Stroke-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": 0, "ix": 1 }
                        }, {
                            "ty": 7,
                            "nm": "All Masks",
                            "mn": "ADBE Stroke-0010",
                            "ix": 2,
                            "v": { "a": 0, "k": 1, "ix": 2 }
                        }, {
                            "ty": 7,
                            "nm": "Stroke Sequentially",
                            "mn": "ADBE Stroke-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 2,
                            "nm": "Color",
                            "mn": "ADBE Stroke-0002",
                            "ix": 4,
                            "v": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Size",
                            "mn": "ADBE Stroke-0003",
                            "ix": 5,
                            "v": { "a": 0, "k": 4, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Hardness",
                            "mn": "ADBE Stroke-0004",
                            "ix": 6,
                            "v": { "a": 0, "k": 0.95, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Stroke-0005",
                            "ix": 7,
                            "v": { "a": 0, "k": 1, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Start",
                            "mn": "ADBE Stroke-0008",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "End",
                            "mn": "ADBE Stroke-0009",
                            "ix": 9,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": [0.667], "y": [1] },
                                    "o": { "x": [0.333], "y": [0] },
                                    "n": ["0p667_1_0p333_0"],
                                    "t": 79,
                                    "s": [0],
                                    "e": [100]
                                }, { "t": 118 }],
                                "ix": 9
                            }
                        }, {
                            "ty": 7,
                            "nm": "Spacing",
                            "mn": "ADBE Stroke-0006",
                            "ix": 10,
                            "v": { "a": 0, "k": 0, "ix": 10 }
                        }, {
                            "ty": 7,
                            "nm": "Paint Style",
                            "mn": "ADBE Stroke-0007",
                            "ix": 11,
                            "v": { "a": 0, "k": 3, "ix": 11 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[-1.328, -0.346], [-1.145, -0.547], [-1.758, 0.969], [-5.792, 0.321], [-2.978, -0.039], [-0.607, 0.162], [0.392, 0.428], [1.672, 1.348], [5.198, 0.058], [5.75, -4.937], [-1.062, 2.125], [-2.625, 1.845], [-7.058, -2.951], [-3.752, -5.118], [-1.82, -2.992], [0.966, -1.07], [1.25, 0.425], [0.539, 0.213], [4.866, -0.328], [5.259, -4.28], [1.466, 0.84], [2.433, 0.178], [1.387, -0.296], [0.875, -0.354], [0.986, -0.753], [1.82, 0.816], [5.873, -2.258], [1.08, -0.533], [0.581, -0.215], [1.075, 1.056], [-0.381, 1.25], [-0.167, 0.335], [-10.821, 7.201], [-7.891, 0.633], [-0.404, 0.077], [0, 0], [-1.24, -0.288], [-1.162, -0.592], [1.3, -0.79], [2.086, 0.183], [9.67, -9.059], [2.59, -3.914], [0.24, -0.797], [-0.784, 0.108], [-4.393, -1.363], [-1.385, 0.743], [-2.732, 0.5]],
                                    "o": [[1.328, 0.346], [1.916, 0.913], [5.077, -2.802], [2.962, -0.165], [0.604, 0.008], [-0.206, -0.602], [-1.459, -1.594], [-3.919, -3.163], [-2.684, -0.034], [-4.093, 3.515], [0.753, -1.505], [6.388, -4.489], [5.839, 2.442], [2.065, 2.817], [0.704, 1.157], [-0.912, 1.01], [-0.549, -0.186], [-4.544, -1.797], [-6.564, 0.442], [-1.297, 1.056], [-2.407, -1.379], [-2.314, -0.169], [-1.61, 0.344], [-1.146, 0.464], [-1.604, 1.224], [-5.801, -2.6], [-1.119, 0.429], [-0.558, 0.275], [-1.263, 0.466], [-1.041, -1.022], [0.109, -0.358], [5.776, -11.571], [6.605, -4.396], [0.408, -0.033], [0, 0], [1.266, 0.172], [1.278, 0.298], [1.352, 0.688], [-1.822, 1.107], [-13.423, -1.178], [-3.421, 3.205], [-0.439, 0.663], [0.813, 0.115], [4.551, -0.626], [1.536, 0.476], [3.063, -1.643], [2.732, -0.5]],
                                    "v": [[1.003, 8.07], [5.982, 9.525], [11.263, 9.043], [27.577, 4.162], [36.505, 4.371], [38.326, 3.908], [37.678, 2.128], [33.093, -2.451], [19.649, -7.967], [7.753, -2.743], [2.314, -4.618], [8.105, -10.092], [28.485, -11.781], [42.954, -0.429], [48.6, 8.429], [48.313, 11.922], [45.005, 12.666], [43.367, 12.077], [29.238, 9.693], [11.223, 16.069], [7.051, 16.373], [-0.681, 13.767], [-8.685, 14.82], [-13.904, 15.773], [-17.176, 17.735], [-22.174, 18.206], [-39.73, 17.978], [-42.976, 19.56], [-44.655, 20.377], [-48.262, 19.941], [-48.777, 16.426], [-48.361, 15.379], [-24.027, -13.286], [-2.241, -20.772], [-1.029, -20.997], [3.955, -20.997], [7.747, -20.456], [11.49, -19.209], [11.518, -16.622], [5.559, -15.137], [-28.739, -2.427], [-37.757, 8.266], [-38.506, 10.638], [-36.068, 10.951], [-22.646, 11.928], [-18.332, 11.484], [-8.605, 8.133]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [49.553, 21.247], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 0,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 21,
                    "ty": 4,
                    "nm": "m Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [87.567, 72.262, 0], "ix": 2 },
                        "a": { "a": 0, "k": [27.426, 16.705, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "hasMask": true,
                    "masksProperties": [{
                        "inv": false,
                        "mode": "n",
                        "pt": {
                            "a": 0,
                            "k": {
                                "i": [[3.147, -7.768], [0.25, -0.875], [-4.875, 4.5], [1.75, -6.875], [0, 0], [-5, 4.875], [1.375, -4.625], [-4.375, -2.875], [-2.625, 4.5]],
                                "o": [[-4, 9.875], [-0.25, 0.875], [4.875, -4.5], [-1.703, 6.69], [0, 0], [5.207, -5.077], [-1.375, 4.625], [4.375, 2.875], [2.625, -4.5]],
                                "v": [[10.359, 5.443], [2.984, 30.443], [16.234, 9.443], [24.484, 9.818], [19.609, 28.193], [33.859, 7.068], [40.609, 8.443], [38.734, 26.693], [51.859, 15.193]],
                                "c": false
                            },
                            "ix": 1
                        },
                        "o": { "a": 0, "k": 100, "ix": 3 },
                        "x": { "a": 0, "k": 0, "ix": 4 },
                        "nm": "Mask 1"
                    }],
                    "ef": [{
                        "ty": 22,
                        "nm": "Stroke",
                        "np": 13,
                        "mn": "ADBE Stroke",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 10,
                            "nm": "Path",
                            "mn": "ADBE Stroke-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": 0, "ix": 1 }
                        }, {
                            "ty": 7,
                            "nm": "All Masks",
                            "mn": "ADBE Stroke-0010",
                            "ix": 2,
                            "v": { "a": 0, "k": 1, "ix": 2 }
                        }, {
                            "ty": 7,
                            "nm": "Stroke Sequentially",
                            "mn": "ADBE Stroke-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 2,
                            "nm": "Color",
                            "mn": "ADBE Stroke-0002",
                            "ix": 4,
                            "v": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Size",
                            "mn": "ADBE Stroke-0003",
                            "ix": 5,
                            "v": { "a": 0, "k": 4, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Hardness",
                            "mn": "ADBE Stroke-0004",
                            "ix": 6,
                            "v": { "a": 0, "k": 0.95, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Stroke-0005",
                            "ix": 7,
                            "v": { "a": 0, "k": 1, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Start",
                            "mn": "ADBE Stroke-0008",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "End",
                            "mn": "ADBE Stroke-0009",
                            "ix": 9,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": [0.667], "y": [1] },
                                    "o": { "x": [0.333], "y": [0] },
                                    "n": ["0p667_1_0p333_0"],
                                    "t": 42,
                                    "s": [0],
                                    "e": [100]
                                }, { "t": 79 }],
                                "ix": 9
                            }
                        }, {
                            "ty": 7,
                            "nm": "Spacing",
                            "mn": "ADBE Stroke-0006",
                            "ix": 10,
                            "v": { "a": 0, "k": 0, "ix": 10 }
                        }, {
                            "ty": 7,
                            "nm": "Paint Style",
                            "mn": "ADBE Stroke-0007",
                            "ix": 11,
                            "v": { "a": 0, "k": 3, "ix": 11 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[-0.406, 1.594], [-1.557, 3.1], [-0.64, 0.513], [-0.659, -2.055], [-0.254, 0.2], [-1.043, 0.942], [-2.253, 0.525], [-1.464, -2.179], [-0.318, 0.295], [-1.223, 1.048], [-1.963, 1.01], [-1.702, -1.729], [0.778, -2.273], [1.051, -3.299], [0.064, -1.285], [-0.432, -0.217], [-0.433, 0.414], [-0.769, 1.266], [-1.3, 2.355], [0.5, -3.333], [0.875, -1.344], [0.924, -0.783], [1.322, -0.846], [1.039, -0.152], [0.517, 3.74], [-1.03, 3.547], [-0.299, 1.087], [-0.144, 0.81], [0.551, -0.728], [2.138, -3.274], [1.683, -3.027], [0.422, -0.445], [1.052, 0.375], [0.048, 1.14], [-0.267, 0.764], [-1.567, 4.406], [0.677, 1.332], [0.692, -0.944], [2.03, -3.103], [2.062, -3.387], [0.522, -0.587], [1.236, 0.657], [-0.325, 1.554], [-0.329, 1.396]],
                                    "o": [[0.406, -1.594], [0.482, -0.959], [1.687, -1.351], [0.521, 1.624], [0.583, -0.459], [1.641, -1.483], [2.576, -0.6], [1.3, 1.933], [0.844, -0.781], [1.686, -1.445], [1.993, -1.024], [1.723, 1.75], [-1.123, 3.276], [-0.39, 1.22], [-0.031, 0.621], [0.436, 0.219], [1.076, -1.03], [1.361, -2.239], [1.657, -3], [-0.295, 1.965], [-0.875, 1.344], [-0.923, 0.784], [-0.882, 0.565], [-3.531, 0.518], [-0.519, -3.748], [0.314, -1.083], [0.194, -0.704], [-1.215, -0.14], [-2.363, 3.121], [-1.887, 2.89], [-0.302, 0.542], [-0.691, 0.729], [-1.09, -0.389], [-0.035, -0.81], [1.541, -4.415], [0.451, -1.27], [-1.346, 0.009], [-2.195, 2.992], [-2.168, 3.316], [-0.411, 0.675], [-1.076, 1.213], [-1.114, -0.594], [0.197, -0.938], [0.583, -2.483]],
                                    "v": [[-24.09, 2.295], [-19.965, -10.83], [-18.165, -12.988], [-13.861, -11.6], [-13.465, -8.934], [-11.362, -10.938], [-5.882, -14.494], [0.141, -12.107], [1.41, -9.393], [3.932, -11.631], [9.422, -15.431], [15.31, -14.625], [16.457, -8.442], [13.083, 1.383], [12.464, 5.208], [13.139, 7.018], [14.982, 6.492], [17.894, 3.084], [20.691, -1.861], [26.676, -1.018], [24.41, 4.545], [20.177, 9.574], [16.464, 12.508], [13.461, 13.615], [6.951, 8.329], [8.308, -2.539], [9.329, -5.764], [9.74, -8.015], [7.24, -6.883], [0.268, 2.567], [-4.793, 11.638], [-5.85, 13.174], [-8.427, 13.944], [-10.248, 11.643], [-9.899, 9.202], [-5.175, -4.007], [-5.121, -7.909], [-8.038, -6.176], [-14.496, 2.89], [-20.673, 13.056], [-22.041, 14.994], [-25.614, 15.798], [-26.851, 12.556], [-26.105, 9.774]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [27.426, 16.705], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 0,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }, {
                    "ddd": 0,
                    "ind": 22,
                    "ty": 4,
                    "nm": "U Outlines",
                    "sr": 1,
                    "ks": {
                        "o": { "a": 0, "k": 100, "ix": 11 },
                        "r": { "a": 0, "k": 0, "ix": 10 },
                        "p": { "a": 0, "k": [37.514, 64.562, 0], "ix": 2 },
                        "a": { "a": 0, "k": [36.947, 31.381, 0], "ix": 1 },
                        "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                    },
                    "ao": 0,
                    "hasMask": true,
                    "masksProperties": [{
                        "inv": false,
                        "mode": "n",
                        "pt": {
                            "a": 0,
                            "k": {
                                "i": [[7.087, 8.221], [-16.75, 3.5], [7.75, -12], [-9.75, -2.75], [-5.438, 8.863], [-1.25, 1.75], [-8.529, -0.502], [-3, 3.5]],
                                "o": [[-6.25, -7.25], [16.75, -3.5], [-7.415, 11.482], [7.998, 2.256], [6.75, -11], [1.25, -1.75], [4.25, 0.25], [3, -3.5]],
                                "v": [[6.683, 35.944], [20.683, 4.069], [32.933, 26.819], [24.683, 58.069], [44.183, 42.069], [62.433, 13.569], [46.933, 55.069], [70.683, 28.069]],
                                "c": false
                            },
                            "ix": 1
                        },
                        "o": { "a": 0, "k": 100, "ix": 3 },
                        "x": { "a": 0, "k": 0, "ix": 4 },
                        "nm": "Mask 1"
                    }],
                    "ef": [{
                        "ty": 22,
                        "nm": "Stroke",
                        "np": 13,
                        "mn": "ADBE Stroke",
                        "ix": 1,
                        "en": 1,
                        "ef": [{
                            "ty": 10,
                            "nm": "Path",
                            "mn": "ADBE Stroke-0001",
                            "ix": 1,
                            "v": { "a": 0, "k": 0, "ix": 1 }
                        }, {
                            "ty": 7,
                            "nm": "All Masks",
                            "mn": "ADBE Stroke-0010",
                            "ix": 2,
                            "v": { "a": 0, "k": 1, "ix": 2 }
                        }, {
                            "ty": 7,
                            "nm": "Stroke Sequentially",
                            "mn": "ADBE Stroke-0011",
                            "ix": 3,
                            "v": { "a": 0, "k": 1, "ix": 3 }
                        }, {
                            "ty": 2,
                            "nm": "Color",
                            "mn": "ADBE Stroke-0002",
                            "ix": 4,
                            "v": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Size",
                            "mn": "ADBE Stroke-0003",
                            "ix": 5,
                            "v": { "a": 0, "k": 4, "ix": 5 }
                        }, {
                            "ty": 0,
                            "nm": "Brush Hardness",
                            "mn": "ADBE Stroke-0004",
                            "ix": 6,
                            "v": { "a": 0, "k": 0.95, "ix": 6 }
                        }, {
                            "ty": 0,
                            "nm": "Opacity",
                            "mn": "ADBE Stroke-0005",
                            "ix": 7,
                            "v": { "a": 0, "k": 1, "ix": 7 }
                        }, {
                            "ty": 0,
                            "nm": "Start",
                            "mn": "ADBE Stroke-0008",
                            "ix": 8,
                            "v": { "a": 0, "k": 0, "ix": 8 }
                        }, {
                            "ty": 0,
                            "nm": "End",
                            "mn": "ADBE Stroke-0009",
                            "ix": 9,
                            "v": {
                                "a": 1,
                                "k": [{
                                    "i": { "x": [0.667], "y": [1] },
                                    "o": { "x": [0.333], "y": [0] },
                                    "n": ["0p667_1_0p333_0"],
                                    "t": 0,
                                    "s": [0],
                                    "e": [100]
                                }, { "t": 42 }],
                                "ix": 9
                            }
                        }, {
                            "ty": 7,
                            "nm": "Spacing",
                            "mn": "ADBE Stroke-0006",
                            "ix": 10,
                            "v": { "a": 0, "k": 0, "ix": 10 }
                        }, {
                            "ty": 7,
                            "nm": "Paint Style",
                            "mn": "ADBE Stroke-0007",
                            "ix": 11,
                            "v": { "a": 0, "k": 3, "ix": 11 }
                        }]
                    }],
                    "shapes": [{
                        "ty": "gr",
                        "it": [{
                            "ind": 0,
                            "ty": "sh",
                            "ix": 1,
                            "ks": {
                                "a": 0,
                                "k": {
                                    "i": [[0.682, -0.856], [1.408, -1.7], [1.452, -1.219], [2.055, 3.456], [0.094, 0.5], [0.84, -0.773], [2.245, -1.45], [3.537, 1.733], [0.355, 3.326], [-1.5, 3.153], [-1.971, 3.53], [-2.191, 4.078], [-0.267, 1.662], [4.787, 0.667], [4.113, -4.164], [0.141, -5.977], [-1.357, -1.774], [0.508, -1.786], [0.638, 0.352], [0.754, 0.824], [0.379, 2.771], [0.086, 0.314], [0, 0], [-0.474, 1.586], [-6.98, 3.621], [-5.08, -0.979], [2.953, -8.594], [2.413, -4.012], [2.047, -3.731], [0.183, -3.263], [-2.743, 0.849], [-1.257, 1.025], [-2.153, 3.576], [-4.569, 7.916], [-1.154, 2.081], [-1.857, 0.331], [0.495, -1.678], [0.435, -0.801], [4.023, -9.699], [0.417, -1.653], [-0.13, -0.665], [-0.388, 0.492], [-2.924, 3.806], [-2.735, 3.53], [-0.64, 0.512], [-0.542, -2.168], [3.727, -5.333]],
                                    "o": [[-0.964, 1.21], [-1.218, 1.471], [-2.466, 2.069], [-0.536, -0.902], [-0.052, -0.278], [-1.985, 1.824], [-3.226, 2.084], [-3.005, -1.473], [-0.38, -3.562], [1.735, -3.649], [2.257, -4.044], [0.796, -1.48], [0.76, -4.739], [-5.832, -0.813], [-4.139, 4.192], [-0.051, 2.189], [1.275, 1.667], [-0.204, 0.715], [-1, -0.553], [-1.872, -2.043], [-0.043, -0.319], [0, 0], [0.338, -1.627], [2.201, -7.367], [4.563, -2.368], [8.809, 1.697], [-1.529, 4.453], [-2.194, 3.647], [-1.531, 2.793], [-0.147, 2.63], [1.538, -0.476], [3.256, -2.654], [4.714, -7.827], [1.189, -2.061], [0.969, -1.747], [1.715, -0.306], [-0.257, 0.871], [-5, 9.211], [-0.653, 1.575], [-0.149, 0.593], [0.583, -0.336], [2.973, -3.766], [2.721, -3.541], [0.509, -0.655], [1.687, -1.351], [0.504, 2.016], [-3.625, 5.188]],
                                    "v": [[22.553, 15.848], [18.527, 21.116], [14.605, 25.29], [5.98, 23.887], [4.964, 21.433], [2.751, 23.589], [-3.452, 28.771], [-13.783, 29.398], [-18.749, 22.081], [-16.824, 11.972], [-11.109, 1.273], [-4.24, -10.8], [-2.605, -15.635], [-9.438, -24.624], [-24.421, -19.526], [-30.975, -4.249], [-29.135, 1.744], [-28.798, 7.022], [-30.298, 7.672], [-33.135, 5.747], [-36.445, -1.558], [-36.697, -2.5], [-36.697, -6.018], [-35.663, -10.894], [-22.557, -27.962], [-8.062, -30.152], [2.298, -11.971], [-3.964, 0.554], [-10.439, 11.559], [-13.1, 20.622], [-8.247, 24.499], [-3.939, 22.128], [4.094, 12.593], [17.874, -11.11], [21.338, -17.353], [25.756, -20.287], [27.822, -17.926], [26.712, -15.418], [12.782, 12.75], [11.173, 17.614], [11.519, 19.596], [13.24, 18.566], [22.04, 7.171], [30.208, -3.449], [31.889, -5.287], [36.193, -3.899], [30.214, 6.245]],
                                    "c": true
                                },
                                "ix": 2
                            },
                            "nm": "Path 1",
                            "mn": "ADBE Vector Shape - Group",
                            "hd": false
                        }, {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 4 },
                            "o": { "a": 0, "k": 100, "ix": 5 },
                            "r": 1,
                            "nm": "Fill 1",
                            "mn": "ADBE Vector Graphic - Fill",
                            "hd": false
                        }, {
                            "ty": "tr",
                            "p": { "a": 0, "k": [36.946, 31.381], "ix": 2 },
                            "a": { "a": 0, "k": [0, 0], "ix": 1 },
                            "s": { "a": 0, "k": [100, 100], "ix": 3 },
                            "r": { "a": 0, "k": 0, "ix": 6 },
                            "o": { "a": 0, "k": 100, "ix": 7 },
                            "sk": { "a": 0, "k": 0, "ix": 4 },
                            "sa": { "a": 0, "k": 0, "ix": 5 },
                            "nm": "Transform"
                        }],
                        "nm": "Group 1",
                        "np": 2,
                        "cix": 2,
                        "ix": 1,
                        "mn": "ADBE Vector Group",
                        "hd": false
                    }],
                    "ip": 0,
                    "op": 360,
                    "st": 0,
                    "bm": 0
                }]
            }],
            "layers": [{
                "ddd": 0,
                "ind": 1,
                "ty": 0,
                "nm": "logo",
                "refId": "comp_0",
                "sr": 1,
                "ks": {
                    "o": { "a": 0, "k": 100, "ix": 11 },
                    "r": { "a": 0, "k": 0, "ix": 10 },
                    "p": { "a": 0, "k": [180, 184, 0], "ix": 2 },
                    "a": { "a": 0, "k": [121, 57, 0], "ix": 1 },
                    "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                },
                "ao": 0,
                "w": 242,
                "h": 114,
                "ip": 0,
                "op": 360,
                "st": 0,
                "bm": 0
            }, {
                "ddd": 0,
                "ind": 2,
                "ty": 1,
                "nm": "background",
                "sr": 1,
                "ks": {
                    "o": { "a": 0, "k": 100, "ix": 11 },
                    "r": { "a": 0, "k": 0, "ix": 10 },
                    "p": { "a": 0, "k": [180, 180, 0], "ix": 2 },
                    "a": { "a": 0, "k": [180, 180, 0], "ix": 1 },
                    "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                },
                "ao": 0,
                "sw": 360,
                "sh": 360,
                "sc": "#7fd6f6",
                "ip": -12,
                "op": 367,
                "st": 0,
                "bm": 0
            }]
        };
        this.lottieConfig = {
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData
        };

        /*lottie.loadAnimation(document.getElementById('lottie'));
         console.log(lottie);*/
    }

    handleAnimation(anim: any) {
        this.anim = anim;
    }

    ngOnInit() {

        this.model.remember = true;
        // get return url from route parameters or default to '/'
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        //this._router.navigate([this.returnUrl]);

        this._script.load('body', 'assets/vendors/base/vendors.bundle.js', 'assets/demo/default/base/scripts.bundle.js')
            .then(() => {
                Helpers.setLoading(false);
                LoginCustom.init();
            });
    }

    signin() {
        if (this.model['g-recaptcha-response'] === '' || this.model['g-recaptcha-response'] == null) {
            return
        }
        this.show2FA = false;
        this.loading = true;
        this._authService.login(this.model.email, this.model.password, this.model['g-recaptcha-response'])
            .subscribe(
            data => {
                this._adminUserService.verify().toPromise().then(() => {
                    if (this._adminUserService.checkModuleOtherRight('admin-users', '2FA')) {
                        this.show2FA = true;
                        this.loading = false;
                        this.clonedCurrentUser = (JSON.parse(localStorage.getItem('currentUser'))) ?
                            cloneDeep(JSON.parse(localStorage.getItem('currentUser'))) : null;
                        localStorage.removeItem('currentUser');
                    } else {
                        this._router.navigate([this.returnUrl]);
                    }
                })

            },
            error => {
                this.showAlert('alertSignin');
                this._alertService.error(error);
                this.loading = false;
            });
    }

    verification2FA() {
        this.loading = true;

        this._authService.faVerification(this.model.faCode, this.clonedCurrentUser)
            .subscribe(
            (data: any) => {
                if (data.verified) {
                    this._router.navigate([this.returnUrl]);
                } else {
                    this.showAlert('alert2FA');
                    this._alertService.error('2 FA code is invalid.');
                    this.loading = false;
                }
            },
            error => {
                this.showAlert('alert2FA');
                this._alertService.error(error);
                this.loading = false;
            });
    }

    onHide2FA() {
        this.loading = false;
        this.show2FA = false;
        this.model.faCode = '';
    }

    signup() {
        this.loading = true;
        this._userService.create(this.model)
            .subscribe(
            data => {
                this.showAlert('alertSignin');
                this._alertService.success('Thank you. To complete your registration please check your email.', true);
                this.loading = false;
                LoginCustom.displaySignInForm();
                this.model = {};
            },
            error => {
                this.showAlert('alertSignup');
                this._alertService.error(error);
                this.loading = false;
            });
    }

    forgotPass() {
        this.loading = true;
        this._requestResetPasswordService.requestReset(this.model.email)
            .subscribe(
            data => {
                this.showAlert('alertSignin');
                this._alertService.success('Cool! Password recovery instruction has been sent to your email.', true);
                this.loading = false;
                LoginCustom.displaySignInForm();
                this.model = {};
            },
            error => {
                this.showAlert('alertForgotPass');
                this._alertService.error(error);
                this.loading = false;
            });
    }

    showAlert(target) {
        if (this[target]) {
            this[target].clear();
            let factory = this.cfr.resolveComponentFactory(AlertComponent);
            let ref = this[target].createComponent(factory);
            ref.changeDetectorRef.detectChanges();
        }

    }
}
