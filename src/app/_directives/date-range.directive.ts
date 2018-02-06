import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { environment } from '../../environments/environment'

//declare var $: JQueryStatic;
declare var moment: any;
declare var DateRangePicker: any;

@Directive({
    selector: '[appDateRange]'
})
export class DateRangeDirective {
    @Output('on-change') onChanged = new EventEmitter();

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit() {
        this.daterangepickerInit();
    }

    daterangepickerInit() {
        if ($(this.el.nativeElement).length == 0) {
            return;
        }

        let picker = $(this.el.nativeElement);
        let start = moment().subtract(6, 'days');
        let end = moment();
        let that = this;

        function cb(start, end, label) {
            let title = '';
            let range = '';

            if ((end - start) < 100) {
                title = 'Today:';
                range = start.format('MMM D');
            } else if (label == 'Yesterday') {
                title = 'Yesterday:';
                range = start.format('MMM D');
            } else {
                range = start.format('MMM D') + ' - ' + end.format('MMM D');
            }

            picker.find('.m-subheader__daterange-date').html(range);
            picker.find('.m-subheader__daterange-title').html(title);
            let dateRange = {
                start: start,
                end: end
            };
            that.onChanged.emit(dateRange);
        }

        (<any>picker).daterangepicker({
            startDate: start,
            endDate: end,
            opens: 'left',
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);

        cb(start, end, '');
    }
}
