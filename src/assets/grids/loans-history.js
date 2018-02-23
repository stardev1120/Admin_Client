var Datatable_Loan_History_AJAX_DEMO = function () {
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
        datatable = $('.m_datatable_loan_histroy').mDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {

                    read: {
                        method: 'GET',
                        url: baseUrl + '/loan-history',
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

            // columns definition
            columns: [
                {
                    field: 'bank_id',
                    title: 'Bank Id',
                    filterable: false // disable or enable filtering
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
                    filterable: false, // disable or enable filtering
                    //width: 70
                    template: function (row) {
                        return row.ammount_taken+' ' + row.currency;
                    }
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
                    title: 'Status',
                    filterable: false
                },
                {
                    field: 'amount_pending',
                    title: 'Amount Pending',
                    filterable: false, // disable or enable filtering
                    // width: 70
                    template: function (row) {
                        return row.amount_pending+ ' ' + row.currency;
                    }
                },
                {
                    field: 'AdminUser',
                    title: 'Admin User',
                    filterable: false, // disable or enable filtering
                    // width: 70
                    template: function (row) {
                        if (row.AdminUser) {
                            return row.AdminUser.name;
                        } else {
                            return '';
                        }

                    }
                },
                {
                    field: 'created_at',
                    title: 'Date',
                    filterable: false, // disable or enable filtering
                    //width: 80
                    template: function (row) {
                        return DateFormat.format.date(row.created_at, 'D MMM yyyy hh:mm ss');
                    }
                }
            ]
        });
        query(filter);
        return datatable;
    };

    function query(filter) {
        var query = datatable.getDataSourceQuery();
        var include = [];
        var user = {
            association: "User"
            //  required: true
        };
        var adminUser = {
            association: "AdminUser"
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
        if (filter['user_name']) {
            if (user['where']) {
                user['where']['fname'] = {$like: filter['user_name'] + '%'};
            } else {
                user['where'] = {fname: {$like: filter['user_name'] + '%'}};
            }
        }
        if (filter['admin_user_id']) {
            adminUser['where'] = {id: filter['admin_user_id']};
        } else {
            delete query.admin_user_id;
        }

        if (filter['company_id']) {
            if (adminUser['where']) {
                adminUser['where']['company_id'] = filter['company_id'];
            } else {
                adminUser['where'] = {company_id: filter['company_id']};
            }
        }
        include.push(user);
        include.push(adminUser);
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
        if (filter['loan_id']) {
            query['loan_id'] = filter['loan_id'];
        } else {
            delete query.status;
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
