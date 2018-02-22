import {Directive, ElementRef, Input, OnChanges} from '@angular/core';
import {environment} from '../../environments/environment'

//declare var $: JQueryStatic;
declare var Chart: any;

@Directive({
    selector: '[appBarChart]'
})
export class BarChartDirective implements OnChanges {
    @Input('chart-api') chartApi = '';
    @Input('chart-color') chartColor = '';
    @Input('chart-kpi-id') chartKpiId = '';
    @Input('chart-kpi-text') chatKpiText = '';
    @Input('chart-kpi-name') chatKpiName = '';
    @Input('date-range') dateRange: any;
    @Input('country-id') countryId;
    baseUrl = environment.baseUrl;
    chart:any;

    constructor(private el: ElementRef) {
        this.baseUrl += '/dashboard';
    }

    ngAfterViewInit() {
        //this.dailySales1(undefined, undefined);
    }

    ngOnChanges(changes) {
        if (!!changes['dateRange'] || !!this.dateRange) {
            let countryId = changes['countryId'] && changes['countryId'].currentValue ? changes['countryId'].currentValue.id : (this.countryId?this.countryId.id:undefined);
            let dateRange = changes['dateRange'] && changes['dateRange'].currentValue ? changes['dateRange'].currentValue : this.dateRange;
            if(!!dateRange){
                this.dailySales(countryId, dateRange)
            }
        }
    }

    dailySales(countryId: string, dateRange: any) {
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
        }).done(function (t) {
            const chartData = {
                labels: t.data[0],
                datasets: [{
                    backgroundColor: that.chartColor,
                    data: t.data[1]
                }]
            };
            $(that.el.nativeElement).empty();
            let chartContainer = (<any>$(that.el.nativeElement).append('<canvas></canvas>')).find('canvas');
            let kpi = t[that.chatKpiName]?t[that.chatKpiName]:t[that.chatKpiName];
            $('#' + that.chartKpiId).text((kpi?kpi:0) + ' ' + that.chatKpiText);
            if (chartContainer.length == 0) {
                return;
            }

            that.chart = new Chart(chartContainer, {
                type: 'bar',
                data: chartData,
                options: {
                    title: {
                        display: false,
                    },
                    tooltips: {
                        intersect: false,
                        mode: 'nearest',
                        xPadding: 10,
                        yPadding: 10,
                        caretPadding: 10
                    },
                    legend: {
                        display: false
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    barRadius: 4,
                    scales: {
                        xAxes: [{
                            display: false,
                            gridLines: false,
                            stacked: true
                        }],
                        yAxes: [{
                            display: false,
                            stacked: true,
                            gridLines: false
                        }]
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            });
        });
    }
}
