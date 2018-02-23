import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { environment } from '../../environments/environment'

//declare var $: JQueryStatic;
declare var Chart: any;
declare let google: any;

@Directive({
    selector: '[appLineChart]'
})
export class LineChartDirective implements OnChanges {
    @Input('chart-api') chartApi = '';
    @Input('date-range') dateRange: any;
    @Input('country-id') countryId;
    @Input('title') title;
    @Input('column-1') column1;
    @Input('column-2') column2;

    baseUrl = environment.baseUrl;
    chart: any;

    constructor(private el: ElementRef) {
        this.baseUrl += '/dashboard';

        google.load('visualization', '1', {
            packages: ['corechart', 'bar', 'line']
        });
    }

    ngAfterViewInit() {
    }

    ngOnChanges(changes) {
        if (!!changes['dateRange'] || !!this.dateRange) {
            let countryId = changes['countryId'] && changes['countryId'].currentValue ? changes['countryId'].currentValue.id : (this.countryId ? this.countryId.id : undefined);
            let dateRange = changes['dateRange'] && changes['dateRange'].currentValue ? changes['dateRange'].currentValue : this.dateRange;
            if (!!dateRange) {
                this.demoLineCharts(countryId, dateRange)
            }
        }
    }

    demoLineCharts(countryId: string, dateRange: any) {
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
        $.ajax({
            url: that.baseUrl + that.chartApi,
            method: 'post',
            data: JSON.stringify(body),
            headers: headers
        }).done(function(t) {
            let data = new google.visualization.DataTable();
            data.addColumn('string', that.column1);
            data.addColumn('number', that.column2);

            data.addRows(t.data);

            let options = {
                chart: {
                    title: that.title,
                    subtitle: t.sum[0] ? 'Total of revenue: ' + t.sum[0].sum + ' $' : '0.0 $'
                }
            };
            let chart = new google.charts.Line(that.el.nativeElement);
            chart.draw(data, options);
        });
    }
}
