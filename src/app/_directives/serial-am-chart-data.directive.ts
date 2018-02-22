import {Directive, ElementRef, Input, OnChanges} from '@angular/core';
import {environment} from '../../environments/environment'

//declare var $: JQueryStatic;
declare var AmCharts: any;

@Directive({
    selector: '[appSerialAmChart-data]'
})
export class SerialAmChartDataDirective implements OnChanges {
    @Input('chart-data') chartData: any = {};
    @Input('chart-settings') chartSettings;
    chart: any;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit() {
    }

    ngOnChanges(changes) {
        this.serialAmChart();
    }

    serialAmChart() {
        this.chart = null;
        let chart = AmCharts.makeChart(this.el.nativeElement, {
            "type": "serial",
            "theme": "light",
            "legend": {
                "equalWidths": false,
                "useGraphSettings": true,
                "valueAlign": "left",
                "valueWidth": 120
            },
            "dataProvider": this.chartData.data,
            "valueAxes": [{
                "id": this.chartSettings['axis_1'],
                "axisAlpha": 0,
                "gridAlpha": 0,
                "position": "left",
                "title": this.chartSettings['axis_title_1']
            }, {
                "id": this.chartSettings['axis_2'],
                "axisAlpha": 0,
                "gridAlpha": 0,
                "labelsEnabled": false,
                "position": "right"
            }, {
                "id": this.chartSettings['axis_3'],
                "axisAlpha": 0,
                "gridAlpha": 0,
                "inside": true,
                "position": "right",
                "title": this.chartSettings['axis_title_3']
            }],
            "graphs": [{
                "alphaField": "alpha",
                "balloonText": "[[value]] " + this.chartSettings['axis_legendValueText_1'],
                "dashLengthField": "dashLength",
                "fillAlphas": 0.7,
                "legendPeriodValueText": "total: [[value.sum]] " + this.chartSettings['axis_legendValueText_1'],
                "legendValueText": "[[value]] " + this.chartSettings['axis_legendValueText_1'],
                "title": this.chartSettings['axis_title_1'],
                "type": "column",
                "valueField": this.chartSettings['axis_valueField_1'],
                "valueAxis": this.chartSettings['axis_1']
            }, {
                "balloonText": "[[value]] " + this.chartSettings['axis_legendValueText_2'],
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "useLineColorForBulletBorder": true,
                "bulletColor": "#FFFFFF",
                "bulletSizeField": "25",
                "dashLengthField": "dashLength",
                "descriptionField": "townName",
                "labelPosition": "right",
                "labelText": "[[townName2]]",
                "legendValueText": "[[value]] " + this.chartSettings['axis_legendValueText_2'],
                "title": this.chartSettings['axis_title_2'],
                "fillAlphas": 0,
                "valueField": this.chartSettings['axis_valueField_2'],
                "valueAxis": this.chartSettings['axis_2']
            }, {
                "bullet": "square",
                "bulletBorderAlpha": 1,
                "bulletBorderThickness": 1,
                "dashLengthField": "dashLength",
                "legendValueText": "[[value]] " + this.chartSettings['axis_legendValueText_3'],
                "title": this.chartSettings['axis_title_3'],
                "fillAlphas": 0,
                "valueField": this.chartSettings['axis_valueField_3'],
                "valueAxis": this.chartSettings['axis_3']
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
    }
}
