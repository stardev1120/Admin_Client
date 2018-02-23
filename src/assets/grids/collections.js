var Datatable_Collections_AJAX_DEMO = function () {
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
            //    headers['country_id'] = currentCountry;
            }
        }
    }
    var demo = function (filter) {
        datatable = $('.m_datatable_collections').mDatatable({
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
                saveState: {
                    cookie: true,
                    webstorage: true
                },
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
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
                    pagination: {
                        // page size select
                        pageSizeSelect: [10, 20, 30, 50, 100]
                    }
                }
            },

            // columns definition
            columns: [
                {
                    field: 'Loan',
                    title: 'User',
                    filterable: false, // disable or enable filtering
                    //width: 80
                    template: function (row) {
                        if (row.Loan.User) {
                            var userName = row.Loan.User.fname ? row.Loan.User.fname + ' ' : '';
                            userName += row.Loan.User.mname ? row.Loan.User.mname + ' ' : ' ';
                            userName += row.Loan.User.lname ? row.Loan.User.lname : '';
                            return userName;
                        }
                        return '';
                    }
                }, {
                    field: '',
                    title: 'Loan',
                    filterable: false, // disable or enable filtering
                    //width: 80
                    template: function (row) {
                        if (row.Loan) {
                            return row.Loan.id
                        }
                        return '';
                    }
                },
                {
                    field: 'amount',
                    title: 'Amount',
                    filterable: false, // disable or enable filtering
                    //width: 80
                    template: function (row) {
                        return row.amount + ' ' + row.currency
                    }
                },
                {
                    field: 'date',
                    title: 'Date',
                    filterable: false, // disable or enable filtering
                    // width: 80,
                    template: function (row) {
                        return DateFormat.format.date(row.date, 'D MMM yyyy hh:mm ss');
                    }
                },
                {
                    field: 'retry_date',
                    title: 'Retry Date (if notpaid)',
                    filterable: false, // disable or enable filtering
                    // width: 80,
                    template: function (row) {
                        return DateFormat.format.date(row.retry_date, 'D MMM yyyy hh:mm ss');
                    }
                },
                {
                    field: 'status',
                    title: 'status',
                    filterable: false // disable or enable filtering
                    // width: 50
                }]
        });
        query(filter);
        return datatable;
    };

    function query(filter) {
        var query = datatable.getDataSourceQuery();
        var include = [];
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
        if (currentCountry && !filter['country_id']) {
            user['where'] = {country_id: currentCountry};
        } else if (filter['country_id']) {
            user['where'] = {country_id: filter['country_id']};
        }
        /*if (filter['user_id']) {
            if (user['where']) {
                user['where']['id'] = filter['user_id']
            } else {
                user['where'] = {id: filter['user_id']};
            }
        }*/
        if (filter['user_name']) {
            if (user['where']) {
                user['where']['fname'] = {$like: filter['user_name'] + '%'};
            } else {
                user['where'] = {fname: {$like: filter['user_name'] + '%'}};
            }
        }
        Loan['include']=[user];
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
        include.push(Loan);
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
