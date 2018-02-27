var Datatable_Loans_Collections_AJAX_DEMO = function () {
    var datatable;
    var baseUrl;
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
            if (currentCountry) {
               // headers['country_id'] = currentCountry;
            }
        }
    }
    var demo = function (filter) {
        var actionsRights = JSON.parse($('#adminUsers_id_other').val());
        var isSuperAdmin = JSON.parse($('#adminUsers_Supper_Admin').val());
        datatable = $('.m_datatable_loans_collections').mDatatable({
            data: {
                type: 'remote',
                source: {

                    read: {
                        method: 'GET',
                        url: baseUrl + '/loan',
                        headers: headers,
                        map: function (raw) {
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                            }
                            return dataSet;
                        }
                    }
                },
                pageSize: 10, // display 20 records per page
                saveState: {
                    cookie: true,
                    webstorage: true
                },
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },

            // layout definition
            layout: {
                theme: 'default',
                scroll: false,
                height: null,
                footer: false
            },

            // column sorting
            sortable: true,

            pagination: true,
            toolbar: {
                // toolbar items
                items: {
                    pagination: {
                        // page size select
                        pageSizeSelect: [10, 20, 30, 50, 100]
                    }
                }
            },

            detail: {
                title: 'Load sub table',
                content: subTableInit
            },


            // columns definition
            columns: [
                {
                    field: 'id',
                    title: '',
                    filterable: false
                },
                {
                    field: 'date_taken',
                    title: 'Date Taken',
                    filterable: false, // disable or enable filtering
                    //width: 80
                    template: function (row) {
                        return DateFormat.format.date(row.date_taken, 'D MMM yyyy');
                    }
                },
                {
                    field: 'ammount_taken',
                    title: 'Amount Taken',
                    filterable: false
                },
                {
                    field: 'service_fee',
                    title: 'Service Fee',
                    filterable: false
                },
                {
                    field: 'interest_rate',
                    title: 'Interest Rate'
                },
                {
                    field: 'duration_of_loan',
                    title: 'Duration Of Loan',
                    filterable: false
                },
                {
                    field: 'status',
                    title: 'status',
                    filterable: false
                },
                {
                    field: 'amount_pending',
                    title: 'Amount Pending',
                    filterable: false
                },
                {
                    field: 'currency',
                    title: 'Currency',
                    filterable: false
                },
                {
                    field: 'Actions',
                    width: 150,
                    title: 'Actions',
                    sortable: false,
                    overflow: 'visible',
                    template: function (row) {
                        var content = '';
                        content = content + '\
                            <a href="#/loans/view/' + row.id + '" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\
							<i class="la la-folder-open"></i>\
						</a>\
						</div>\
						\
						';
                        if (isSuperAdmin && row.status === 'To-be-Given') {
                            content = content + '\
                            <a href="#/issue-collect-money/issue/' + row.User.id + '/' + row.id + '" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\
							<i class="la la-edit"></i>\
						</a>\
						\
						';
                        if (actionsRights && (actionsRights['cancelLoanBasedOnStatusNotGiven'] || actionsRights['closeLoan'] || actionsRights['cancelLoanBasedOnStatus'])) {
                            content = content + '\
                                    <div>\
                                    <select id="abc" class="status-row-' + row.id + '">\
                                      <option value="" disabled selected>Choose</option>\
                                    \ '
                            if (actionsRights['closeLoan']) {

                                content = content + '\
                                <option class="status-row-' + row.id + '" value="Closed">Close</option>\
                                \ '
                            }
                            if (row.status === 'To-be-Given' && actionsRights['cancelLoanBasedOnStatusNotGiven']) {
                                content = content + '\
                                <option class="status-row-' + row.id + '" value="Cancel">Cancel</option>\
                                \ '
                            } else if (row.status !== 'To-be-Given' && actionsRights['cancelLoanBasedOnStatus']) {
                                content = content + '\
                                <option class="status-row-' + row.id + '" value="Cancel">Cancel</option>\
                                \ '
                            }
                            content = content + '\
                                 </select>\
                                \ '
                        } else {
                            return '';
                        }
                        }
                        return content;
                    }
                }

            ]
        });
        datatable.on('change', '[class^="status-row-"]', function (e) {

            var id = $(e.target).prop('class');
            var data = {status: ''};
            data.status = $(e.target).prop('value');
            id = id.replace('status-row-', '');
            $.ajax({
                url: baseUrl + '/loan/' + id,
                method: 'put',
                data: JSON.stringify(data),
                headers: headers
            }).done(datatable.load);
        });
        function subTableInit(e) {
            var datatable2 = $('<div/>').attr('id', 'child_data_ajax_' + e.data.id).appendTo(e.detailCell).mDatatable({
                data: {
                    type: 'remote',
                    source: {
                        read: {
                            method: 'GET',
                            url: baseUrl + '/collection',
                            headers: headers,
                            map: function (raw) {
                                // sample data mapping
                                var dataSet = raw;
                                if (typeof raw.data !== 'undefined') {
                                    dataSet = raw.data;
                                }
                                return dataSet;
                            }
                        }
                    },
                    pageSize: 10,
                    serverPaging: true,
                    serverFiltering: false,
                    serverSorting: true
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
                        theme: 'default'
                    }
                },

                sortable: true,

                // columns definition
                columns: [
                    {
                        field: 'amount',
                        title: 'Amount',
                        filterable: false
                    },
                    {
                        field: 'date',
                        title: 'Date',
                        filterable: false, // disable or enable filtering
                        //width: 80
                        template: function (row) {
                            return DateFormat.format.date(row.date, 'D MMM yyyy');
                        }
                    },
                    {
                        field: 'retry_date',
                        title: 'Retry Date (if not paid)',
                        filterable: false, // disable or enable filtering
                        // width: 80
                        template: function (row) {
                            return DateFormat.format.date(row.retry_date, 'D MMM yyyy');
                        }
                    },
                    {
                        field: 'status',
                        title: 'status',
                        filterable: false
                    },
                    {
                        field: 'Actions',
                        //width: 100,
                        title: 'Actions',
                        sortable: false,
                        overflow: 'visible',
                        template: function (row) {
                            var content = '';
                            content = content + '\
                            <a href="#/collections/view/' + row.id + '" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\
							<i class="la la-folder-open"></i>\
						</a>\
						\
						';
                            if (isSuperAdmin && row.status === 'To-be-Collected') {
                                content = content + '\
                            <a href="#/issue-collect-money/collect/' + row.Loan.User.id + '/' + row.id + '" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\
							<i class="la la-edit"></i>\
						</a>\
						\
						';
                            }
                            return content;
                        }
                    }
                ]
            });
            var query2 = datatable2.getDataSourceQuery();
            query2['loan_id'] = e.data.id;
            var Loan = {
                association: "Loan",
                required: true
            };
            var user = {
                association: "User",
                required: true
            };
            var adminUser = {
                association: "AdminUser"
            };
            Loan['include']=[user];
            var include=[];
            include.push(Loan);
            include.push(adminUser);
            datatable2.setOption('include', include);
            datatable2.setDataSourceQuery(query2);
            datatable2.load();
        }

        query(filter);
        return datatable;
    };

    function query(filter) {
        var query = datatable.getDataSourceQuery();
        var include = ["Collection"];
        var user = {
            association: "User",
            required: true
        };
        if (currentCountry && !filter['country_id']) {
            user['where'] = {country_id: currentCountry};
        } else if (filter['country_id']) {
            user['where'] = {country_id: filter['country_id']};
        }
        if (filter['user_id']) {
            if (user['where']) {
                user['where']['id'] = filter['user_id']
            } else {
                user['where'] = {id: filter['user_id']};
            }
        }
        include.push(user);
        datatable.setOption('include', include);

        if (filter['start_date'] && filter['end_date']) {
            query['created_at'] = {$between: [filter['start_date'], filter['end_date']]};
        } else {
            delete query.created_at;
        }
        if (filter['status']) {
            query['status'] = filter['status'];
        } else {
            delete query.status;
        }
        if (filter['admin_user_id']) {
            query['admin_user_id'] = filter['admin_user_id'];
        } else {
            delete query.admin_user_id;
        }
        delete query.country_id;
        datatable.setDataSourceQuery(query);
        datatable.load();
    }

    return {
        // public functions
        init: function (filter, baseUrlParam) {
            baseUrl = baseUrlParam;
            return demo(filter);
        },

        query: function (filter) {
            if (datatable) {
                query(filter);
            }
            else {
                demo(filter);
            }
        }
    };
}();