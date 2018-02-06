import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { environment } from '../../environments/environment'

//declare var $: JQueryStatic;
declare var AmCharts: any;

@Directive({
    selector: '[appSerialAmChart]'
})
export class SerialAmChartDirective implements OnChanges {
    @Input('chart-api') chartApi = '';
    @Input('date-range') dateRange: any;
    @Input('country-id') countryId;
    @Input('chart-settings') chartSettings;
    baseUrl = environment.baseUrl;
    chart: any;

    constructor(private el: ElementRef) {
        this.baseUrl += '/dashboard';
    }

    ngAfterViewInit() {
    }

    ngOnChanges(changes) {
        if (!!changes['dateRange'] || !!this.dateRange) {
            let countryId = changes['countryId'] && changes['countryId'].currentValue ? changes['countryId'].currentValue.id : (this.countryId ? this.countryId.id : undefined);
            let dateRange = changes['dateRange'] && changes['dateRange'].currentValue ? changes['dateRange'].currentValue : this.dateRange;
            if (!!dateRange) {
                this.serialAmChart(countryId, dateRange)
            }
        }
    }

    serialAmChart(countryId: string, dateRange: any) {
        const currentUserString = localStorage.getItem('currentUser');
        const currentCountry = (JSON.parse(localStorage.getItem('currentCountry'))) ?
            (JSON.parse(localStorage.getItem('currentCountry'))).id : null;
        const headers = {
            "content-type": "application/json"
        };
        if (currentUserString) {
            const currentUser = JSON.parse(currentUserString);
            if (currentUser) {
                const token = currentUser.token;
                headers['authorization'] = "JWT " + token;
                if (currentCountry) {
                    headers['country_id'] = currentCountry;
                }
            }
        }
        let that = this;
        let body = {
            country_id: countryId,
            start_date: dateRange ? dateRange.start : undefined,
            end_date: dateRange ? dateRange.end : undefined
        };
        that.chart = null;
        $.ajax({
            url: that.baseUrl + that.chartApi,
            method: 'post',
            data: JSON.stringify(body),
            headers: headers
        }).done(function(t) {
            let chart = AmCharts.makeChart(that.el.nativeElement, {
                "type": "serial",
                "theme": "light",
                "legend": {
                    "equalWidths": false,
                    "useGraphSettings": true,
                    "valueAlign": "left",
                    "valueWidth": 120
                },
                "dataProvider": t.data,
                "valueAxes": [{
                    "id": that.chartSettings['axis_1'],
                    "axisAlpha": 0,
                    "gridAlpha": 0,
                    "position": "left",
                    "title": that.chartSettings['axis_title_1']
                }, {
                    "id": that.chartSettings['axis_2'],
                    "axisAlpha": 0,
                    "gridAlpha": 0,
                    "labelsEnabled": false,
                    "position": "right"
                }, {
                    "id": that.chartSettings['axis_3'],
                    "axisAlpha": 0,
                    "gridAlpha": 0,
                    "inside": true,
                    "position": "right",
                    "title": that.chartSettings['axis_title_3']
                }],
                "graphs": [{
                    "alphaField": "alpha",
                    "balloonText": "[[value]] " + that.chartSettings['axis_legendValueText_1'],
                    "dashLengthField": "dashLength",
                    "fillAlphas": 0.7,
                    "legendPeriodValueText": "total: [[value.sum]] " + that.chartSettings['axis_legendValueText_1'],
                    "legendValueText": "[[value]] " + that.chartSettings['axis_legendValueText_1'],
                    "title": that.chartSettings['axis_title_1'],
                    "type": "column",
                    "valueField": that.chartSettings['axis_valueField_1'],
                    "valueAxis": that.chartSettings['axis_1']
                }, {
                    "balloonText": "[[value]] " + that.chartSettings['axis_legendValueText_2'],
                    "bullet": "round",
                    "bulletBorderAlpha": 1,
                    "useLineColorForBulletBorder": true,
                    "bulletColor": "#FFFFFF",
                    "bulletSizeField": "25",
                    "dashLengthField": "dashLength",
                    "descriptionField": "townName",
                    "labelPosition": "right",
                    "labelText": "[[townName2]]",
                    "legendValueText": "[[value]] " + that.chartSettings['axis_legendValueText_2'],
                    "title": that.chartSettings['axis_title_2'],
                    "fillAlphas": 0,
                    "valueField": that.chartSettings['axis_valueField_2'],
                    "valueAxis": that.chartSettings['axis_2']
                }, {
                    "bullet": "square",
                    "bulletBorderAlpha": 1,
                    "bulletBorderThickness": 1,
                    "dashLengthField": "dashLength",
                    "legendValueText": "[[value]] " + that.chartSettings['axis_legendValueText_3'],
                    "title": that.chartSettings['axis_title_3'],
                    "fillAlphas": 0,
                    "valueField": that.chartSettings['axis_valueField_3'],
                    "valueAxis": that.chartSettings['axis_3']
                }],
                "chartCursor": {
                    "categoryBalloonDateFormat": "DD",
                    "cursorAlpha": 0.1,
                    "cursorColor": "#000000",
                    "fullWidth": true,
                    "valueBalloonsEnabled": false,
                    "zoomable": false
                },
                // "dataDateFormat": "YYYY-MM-DD",
                "categoryField": "key",
                "categoryAxis": {
                    /*"dateFormats": [{
                        "period": "DD",
                        "format": "DD"
                    }, {
                        "period": "WW",
                        "format": "MMM DD"
                    }, {
                        "period": "MM",
                        "format": "MMM"
                    }, {
                        "period": "YYYY",
                        "format": "YYYY"
                    }],*/
                    // "parseDates": true,
                    "autoGridCount": false,
                    "axisColor": "#555555",
                    "gridAlpha": 0.1,
                    "gridColor": "#FFFFFF",
                    "gridCount": 50
                },
                "export": {
                    "enabled": true
                }
            });
        });
    }
}
