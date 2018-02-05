//== Class definition

var DatatableChildRemoteDataDemo = function() {
    //== Private functions

    // demo initializer


        var demo = function () {
            var baseUrl = $('#basUrl').val();//'http://192.168.153.130:3000/api/admin/admin-user'
            var actionsRights = JSON.parse($('#adminUsers_id_other').val());
            var currentUserString = localStorage.getItem('currentUser');
            var currentCountry = (JSON.parse(localStorage.getItem('currentCountry'))) ?
                (JSON.parse(localStorage.getItem('currentCountry'))).id : null;
            var headers = {
                "content-type": "application/json"
            };

            if (currentUserString) {
                var currentUser = JSON.parse(currentUserString);
                if (currentUser) {
                    var token = currentUser.token;
                    headers['authorization'] = "JWT " + token;
                    headers['user_id'] = currentUser.id;
                    if (currentCountry) {
                        headers['country_id'] = currentCountry;
                    }
                }
            }

            var datatable = $('.m_datatable_loans').mDatatable({
                // datasource definition
                data: {
                    type: 'remote',
                    source: {

                        read: {
                            // sample GET method
                            // sample GET method
                            method: 'GET',
                            //url: 'http://keenthemes.com/metronic/preview/inc/api/datatables/demos/default.php',
                            url: baseUrl  + '/loan',
                            params: {
                                query: {user_id: $('#user_id_1').val() * 1}
                            },
                            headers: headers,
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
                    pageSize: 10, // display 20 records per page
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
                    theme: 'default',
                    scroll: false,
                    height: null,
                    footer: false,
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

                detail: {
                    title: 'Load sub table',
                    content: subTableInit,
                },


                // columns definition
                columns: [
                    {
                        field: 'id',
                        title: '',
                        filterable: false, // disable or enable filtering
                        //width: 20
                    },
                    {
                        field: 'date_taken',
                        title: 'Date Taken',
                        filterable: false, // disable or enable filtering
                        //width: 80
                    },
                    {
                        field: 'amount_taken',
                        title: 'Amount Taken',
                        filterable: false, // disable or enable filtering
                        //width: 70
                    },
                    {
                        field: 'service_fee',
                        title: 'Service Fee',
                        filterable: false, // disable or enable filtering
                        //width: 70
                    },
                    {
                        field: 'interest_rate',
                        title: 'Interest Rate',
                        //filterable: false, // disable or enable filtering
                        width: 70
                    },
                    {
                        field: 'duration_of_loan',
                        title: 'Duration Of Loan',
                        filterable: false, // disable or enable filtering
                        //width: 70
                    },
                     {
                     field: 'status',
                     title: 'status',
                     filterable: false, // disable or enable filtering
                     //width: 50
                     },
                    {
                        field: 'amount_pending',
                        title: 'Amount Pending',
                        filterable: false, // disable or enable filtering
                       // width: 70
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
                       // width: 70
                    },
                    {
                        field: 'Actions',
                        //width: 100,
                        title: 'Actions',
                        sortable: false,
                        overflow: 'visible',
                        template: function (row) {
                            var content = '';
                            if (actionsRights && (actionsRights['cancelLoanBasedOnStatusNotGiven']||actionsRights['closeLoan']||actionsRights['cancelLoanBasedOnStatus'])) {
                                content = content + '\
                                    <div>\
                                    <select id="abc" class="status-row-' + row.id + '">\
                                      <option value="" disabled selected>Choose</option>\
                                    \ '
                                if (actionsRights['closeLoan']) {

                                    content = content + '\
                                <option class="status-row-' + row.id + '" value="close">Close</option>\
                                \ '
                                }
                                if (row.status === 'not_given' && actionsRights['cancelLoanBasedOnStatusNotGiven']) {
                                    content = content + '\
                                <option class="status-row-' + row.id + '" value="cancel">Cancel</option>\
                                \ '
                                } else if (row.status !== 'not_given' && actionsRights['cancelLoanBasedOnStatus']) {
                                    content = content + '\
                                <option class="status-row-' + row.id + '" value="cancel">Cancel</option>\
                                \ '
                                }
                                content = content + '\
                                 </select>\
                                </div>\
                                \ '
                               return content;
                            } else {
                                return
                            }
                        }
                    }

                ],
            });

            datatable.on('change', '[class^="status-row-"]', function (e) {

                var id = $(e.target).prop('class');
                var data = {status: ''}
                data.status = $(e.target).prop('value')
                id = id.replace('status-row-', '');
                $.ajax({
                    url: baseUrl + '/loan/' + id,
                    method: 'put',
                    data: JSON.stringify(data),
                    headers: headers
                }).done(datatable.load);


            });

            function subTableInit(e) {
                $('<div/>').attr('id', 'child_data_ajax_' + e.data.id).appendTo(e.detailCell).mDatatable({
                    data: {

                        type: 'remote',
                        source: {
                            read: {
                                method: 'GET',
                                //url: 'http://keenthemes.com/metronic/preview/inc/api/datatables/demos/default.php',
                                url: baseUrl  + '/collection',
                                headers: headers,
                                params: {
                                    query: {loan_id: e.data.id}
                                },
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
                        serverPaging: true,
                        serverFiltering: false,
                        serverSorting: true,
                    },

                    // layout definition
                    layout: {
                        theme: 'default',
                        scroll: true,
                        height: 300,
                        footer: false,

                        // enable/disable datatable spinner.
                        spinner: {
                            type: 1,
                            theme: 'default',
                        },
                    },

                    sortable: true,

                    // columns definition
                    columns: [
                        {
                            field: 'amount',
                            title: 'Amount',
                            filterable: false, // disable or enable filtering
                          //  width: 80
                        },
                        {
                            field: 'date',
                            title: 'Date',
                            filterable: false, // disable or enable filtering
                            //width: 80
                        }/*,
                         {
                         field: 'currency',
                         title: 'currency',
                         filterable: false, // disable or enable filtering
                         width: 50
                         }*/,
                        {
                            field: 'retry_date',
                            title: 'Retry Date (if notpaid)',
                            filterable: false, // disable or enable filtering
                           // width: 80
                        },
                        {
                            field: 'status',
                            title: 'status',
                            filterable: false, // disable or enable filtering
                            //width: 50
                        },

                        ],
                });
            }
        };

        return {
            //== Public functions
            init: function () {
                // init dmeo
                demo();
            },
        };

}();
    jQuery(document).ready(function () {
        DatatableChildRemoteDataDemo.init();
    });
