import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

declare var Chart: any;
declare let google: any;

@Directive({
    selector: '[appLineChart-data]'
})
export class LineChartDataDirective implements OnChanges {
    @Input('chart-data') chartData: any = {};
    @Input('title') title;
    @Input('column-1') column1;
    @Input('column-2') column2;
    chart: any;

    constructor(private el: ElementRef) {
        google.load('visualization', '1', {
            packages: ['corechart', 'bar', 'line']
        });
    }

    ngAfterViewInit() {
    }

    ngOnChanges(changes) {
        this.demoLineCharts()
    }

    demoLineCharts() {

        let data = new google.visualization.DataTable();
        data.addColumn('string', this.column1);
        data.addColumn('number', this.column2);

        data.addRows(this.chartData.data);

        let options = {
            chart: {
                title: this.title,
                subtitle: this.chartData.sum && this.chartData.sum[0] ? 'Total of revenue: ' + this.chartData.sum[0].sum + ' $' : '0.0 $'
            }
        };
        let chart = new google.charts.Line(this.el.nativeElement);
        chart.draw(data, options);
    }
}
