import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

declare var Chart: any;

@Directive({
    selector: '[appBarChart-data]'
})
export class BarChartDataDirective implements OnChanges {
    @Input('chart-data') chartData: any = {};
    @Input('chart-color') chartColor = '';
    @Input('chart-kpi-id') chartKpiId = '';
    @Input('chart-kpi-text') chatKpiText = '';
    @Input('chart-kpi-name') chatKpiName = '';
    chart: any;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit() {
    }

    ngOnChanges(changes) {
        this.dailySales();
    }

    dailySales() {
        let that = this;
        that.chart = null;
        const chartData = {
            labels: this.chartData.data[0],
            datasets: [{
                backgroundColor: that.chartColor,
                data: this.chartData.data[1]
            }]
        };
        $(that.el.nativeElement).empty();
        let chartContainer = (<any>$(that.el.nativeElement).append('<canvas></canvas>')).find('canvas');
        let val = (this.chartData[this.chatKpiName] ? this.chartData[this.chatKpiName] : 0);
        $('#' + that.chartKpiId).text(parseFloat(val).toFixed(2).toString() + ' ' + that.chatKpiText);

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
    }
}
