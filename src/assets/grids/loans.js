//== Class definition
(function () {
    var DatatableRemoteAjaxDemo = function () {
        //== Private functions
        var baseUrl = 'http://localhost:3000/api/admin/loans'
        // basic demo
        var demo = function () {

            var datatable = $('.m_datatable_loans').mDatatable({
                // datasource definition
                data: {
                    //type: 'remote',
                    source: {
                        read: {
                            // sample GET method
                            method: 'get',
                            //url: 'http://keenthemes.com/metronic/preview/inc/api/datatables/demos/default.php',
                            url: baseUrl,
                            headers: {"authorization": localStorage.getItem('token')},
                            map: function (raw) {
                                // sample data mapping
                                var dataSet = raw;
                                if (typeof raw.data !== 'undefined') {
                                    dataSet = raw.data;
                                }
                                return dataSet;
                            },
                        },
                    },
                    pageSize: 10,
                    saveState: {
                        cookie: true,
                        webstorage: true,
                    },
                    serverPaging: true,
                    serverFiltering: true,
                    serverSorting: true,
                },

                // layout definition
                layout: {
                    theme: 'default', // datatable theme
                    class: '', // custom wrapper class
                    scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                    footer: false // display/hide footer
                },

                // column sorting
                sortable: true,

                pagination: true,

                toolbar: {
                    // toolbar items
                    items: {
                        // pagination
                        // actions: {
                        //     delete: {
                        //         name: 'Delete All',
                        //         url: '/delete',
                        //         fn: function (ids) {
                        //             console.log(ids);
                        //         }
                        //     },
                        //     activate: {
                        //         name: 'Activate All',
                        //         url: '/active',
                        //         fn: function (ids) {
                        //             console.log(ids);
                        //         }
                        //     }
                        // },
                        pagination: {
                            // page size select
                            pageSizeSelect: [10, 20, 30, 50, 100],
                        },
                    },
                },

                search: {
                    input: $('#m_form_user_name'),
                },
                detail: {
                    title: "Load sub table", content: function (t) {
                        $("<div/>").attr("id", "child_data_ajax_" + t.data.RecordID).appendTo(t.detailCell).mDatatable({
                            data: {
                                //type: "remote",
                                source: {
                                    read: {
                                        url: "inc/api/datatables/demos/orders.php",
                                        headers: {"x-my-custom-header": "some value", "x-test-header": "the value"},
                                        params: {query: {generalSearch: "", CustomerID: t.data.RecordID}}
                                    }
                                },
                                pageSize: 10,
                                serverPaging: !0,
                                serverFiltering: !1,
                                serverSorting: !0
                            },
                            layout: {
                                theme: "default",
                                scroll: !0,
                                height: 300,
                                footer: !1,
                                spinner: {type: 1, theme: "default"}
                            },
                            sortable: !0,
                            columns: [{
                                field: "RecordID",
                                title: "#",
                                sortable: !1,
                                width: 20,
                                responsive: {hide: "xl"}
                            }, {
                                field: "OrderID", title: "Order ID", template: function (t) {
                                    return "<span>" + t.OrderID + " - " + t.ShipCountry + "</span>"
                                }
                            }, {field: "ShipCountry", title: "Country", width: 100}, {
                                field: "ShipAddress",
                                title: "Ship Address"
                            }, {field: "ShipName", title: "Ship Name"}, {
                                field: "TotalPayment",
                                title: "Payment",
                                type: "number"
                            }, {
                                field: "Status", title: "Status", template: function (t) {
                                    var e = {
                                        1: {title: "Pending", class: "m-badge--brand"},
                                        2: {title: "Delivered", class: " m-badge--metal"},
                                        3: {title: "Canceled", class: " m-badge--primary"},
                                        4: {title: "Success", class: " m-badge--success"},
                                        5: {title: "Info", class: " m-badge--info"},
                                        6: {title: "Danger", class: " m-badge--danger"},
                                        7: {title: "Warning", class: " m-badge--warning"}
                                    };
                                    return '<span class="m-badge ' + e[t.Status].class + ' m-badge--wide">' + e[t.Status].title + "</span>"
                                }
                            }, {
                                field: "Type", title: "Type", template: function (t) {
                                    var e = {
                                        1: {title: "Online", state: "danger"},
                                        2: {title: "Retail", state: "primary"},
                                        3: {title: "Direct", state: "accent"}
                                    };
                                    return '<span class="m-badge m-badge--' + e[t.Type].state + ' m-badge--dot"></span>&nbsp;<span class="m--font-bold m--font-' + e[t.Type].state + '">' + e[t.Type].title + "</span>"
                                }
                            }]
                        })
                    }
                },

                // columns definition
                columns: [
                    {
                        field: 'select',
                        width: 20,
                        title: ' <input type="checkbox" name="selectall" id="selectall" value="all"/>',
                        sortable: false,
                        overflow: 'visible',
                        template: function (row) {
                            return '<input type="checkbox" id="select-' + row.id + '" data-value="' + row.id + '"/>';
                        },
                    },
                    {
                        field: 'id',
                        title: 'Loan ID',
                        filterable: false, // disable or enable filtering
                        width: 80
                    },
                    {
                        field: 'date_taken',
                        title: 'Date Taken',
                        filterable: false, // disable or enable filtering
                        width: 80
                    },
                    {
                        field: 'amount_taken',
                        title: 'Amount Taken',
                        filterable: false, // disable or enable filtering
                        width: 70
                    },
                    {
                        field: 'service_fee',
                        title: 'Service Fee',
                        filterable: false, // disable or enable filtering
                        width: 70
                    },
                    {
                        field: 'interest_rate',
                        title: 'Interest Rate',
                        filterable: false, // disable or enable filtering
                        width: 70
                    },
                    {
                        field: 'duration_of_loan',
                        title: 'Duration Of Loan',
                        filterable: false, // disable or enable filtering
                        width: 70
                    }, /*
                {
                    field: 'status',
                    title: 'status',
                    filterable: false, // disable or enable filtering
                    width: 50
                },*/
                    {
                        field: 'amount_pending',
                        title: 'Amount Pending',
                        filterable: false, // disable or enable filtering
                        width: 70
                    }/*,
                {
                    field: 'bank_credit_transaction',
                    title: 'bank_credit_transaction',
                    filterable: false, // disable or enable filtering
                    width: 50
                },
                {
                    field: 'bank_credit_status',
                    title: 'bank_credit_status',
                    filterable: false, // disable or enable filtering
                    width: 50
                }*/,
                    {
                        field: 'currency',
                        title: 'Currency',
                        filterable: false, // disable or enable filtering
                        width: 70
                    },
                    {
                        field: 'Actions',
                        width: 100,
                        title: 'Actions',
                        sortable: false,
                        overflow: 'visible',
                        template: function (row) {
                            var dropup = (row.getDatatable().getPageSize() - row.getIndex()) <= 4 ? 'dropup' : '';
                            return '\
                            <a href="#/loans/' + row.id + '" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\
							<i class="la la-edit"></i>\
						</a>\
						<div class="modal fade" id="model-del-' + row.id + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
                            <div class="modal-dialog" role="document">\
                            <div class="modal-content">\
                            <div class="modal-header">\
                            <h5 class="modal-title" id="exampleModalLabel">\
                            Delete\
                            </h5>\
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                            <span aria-hidden="true">\
                            &times;\
                        </span>\
                        </button>\
                        </div>\
                        <div class="modal-body">\
                            <p>\
                            Are you Sure ?\
                       </p>\
                        </div>\
                        <div class="modal-footer">\
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">\
                            Close\
                            </button>\
                            <button id="delete-row-' + row.id + '" type="button" class="btn btn-danger" data-dismiss="modal">\
                             Delete\
                            </button>\
                            </div>\
                            </div>\
                            </div>\
                            </div>\
						<a href="javascript:void(0)" \
						  class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" \
						  title="Delete"\
						   data-target="#model-del-' + row.id + '" data-toggle="modal"> \
							<i class="la la-trash"></i>\
						</a>\
					';
                        },
                    }],
            });

            var query = datatable.getDataSourceQuery();

            $('#m_form_user_name').on('change', function () {
                // shortcode to datatable.getDataSourceParam('query');
                var query = datatable.getDataSourceQuery();
                query.user.fname = $(this).val(); // todo: we need to do for mname and lname with or and like
                // shortcode to datatable.setDataSourceParam('query', query);
                datatable.setDataSourceQuery(query);
                datatable.load();
            }).val(typeof query.fname !== 'undefined' ? query.fname : '');

            $('#selectall').change(function (e) {
                console.log($(e.target)[0].checked, 'e');
                $('[id^="select-"]').prop('checked', $(e.target).prop('checked'));
            });
            datatable.on('click', '[id^="delete-row-"]', function (e) {
                var id = $(e.target).prop('id');
                id = id.replace('delete-row-', '');
                console.log(id, 'e');

                $.ajax({
                    url: baseUrl + '/' + id,
                    method: 'delete'
                }).done(datatable.load);


            });


        };

        return {
            // public functions
            init: function () {
                demo();
            },
        };
    }();

    jQuery(document).ready(function () {
        DatatableRemoteAjaxDemo.init();
    });
})();