var Datatable_Collections_History_AJAX_DEMO = function () {
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
             //   headers['country_id'] = currentCountry;
            }
        }
    }
    var demo = function (filter) {
        datatable = $('.m_datatable_collection_histroy').mDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: 'GET',
                        url: baseUrl + '/collection-history',
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

            // columns definition
            columns: [
                {
                    field: 'loan_id',
                    title: 'Loan Id',
                    filterable: false
                },
                {
                    field: 'amount',
                    title: 'Amount',
                    filterable: false, // disable or enable filtering
                    //width: 50
                    template: function (row) {
                        return row.amount+ ' ' + row.currency;
                    }
                },
                {
                    field: 'date',
                    title: 'Date of Collection',
                    filterable: false, // disable or enable filtering
                    //width: 50
                    template: function (row) {
                        return DateFormat.format.date(row.date, 'D MMM yyyy');
                    }
                },
                {
                    field: 'retry_date',
                    title: 'Retry Date',
                    filterable: false, // disable or enable filtering
                    //width: 50
                    template: function (row) {
                        return DateFormat.format.date(row.retry_date, 'D MMM yyyy');
                    }
                },
                {
                    field: 'status',
                    title: 'Status',
                    filterable: false
                },
                {
                    field: 'date_of_entry',
                    title: 'Date of Entry',
                    filterable: false, // disable or enable filtering
                    //width: 50
                    template: function (row) {
                        return DateFormat.format.date(row.date_of_entry, 'D MMM yyyy');
                    }
                },
                {
                    field: 'bank_response',
                    title: 'Bank Response',
                    filterable: false
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
        var adminUser = {
            association: "AdminUser",
            required: true
        };

        var loan = {
            association: "Loan",
            required: true
        };
        include.push(adminUser);
        include.push(loan);
        datatable.setOption('include', include);

        if (filter['collection_id']) {
            query['collection_id'] = filter['collection_id'];
        } else {
            delete query.collection_id;
        }

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
