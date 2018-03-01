var Datatable_Leads_AJAX_DEMO = function () {
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
              //  headers['country_id'] = currentCountry;
            }
        }
    }
    var demo = function (filter) {
        datatable = $('.m_datatable_non_support').mDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: 'GET',
                        url: baseUrl + '/non-supported-country-lead',
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
                pageSize: 10,
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
                theme: 'default', // datatable theme
                class: '', // custom wrapper class
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false // display/hide footer
            },

            // column sorting
            sortable: true,
            include: "",

            pagination: true,

            toolbar: {
                // toolbar items
                items: {
                    pagination: {
                        // page size select
                        pageSizeSelect: [10, 20, 50, 100]
                    }
                }
            },
            // columns definition
            columns: [
                {
                    field: 'country',
                    title: 'Country',
                    // sortable: 'asc', // default sort
                    filterable: true, // disable or enable filtering
                    width: 100
                }, {
                    field: 'email',
                    title: 'Email',
                    // sortable: 'asc', // default sort
                    //filterable: true, // disable or enable filtering
                    width: 300
                },
                {
                    field: 'ip_address',
                    title: 'IP Address',
                    // sortable: 'asc', // default sort
                    filterable: false
                },
                {
                    field: 'gps_location',
                    title: 'GPS Location',
                    filterable: false, // disable or enable filtering
                    //width: 50,
                    template: function (row) {
                        return row.gps_location ? row.gps_location : {'lat': '-', 'long': '-'};
                    }
                },
                {
                    field: 'created_at',
                    title: 'Create Date',
                    filterable: false, // disable or enable filtering
                    //width: 50,
                    template: function (row) {
                        return moment(row.created_at).format('D MMM YYYY');
                    }
                }]
        });

        query(filter);
        return datatable;
    };

    function query(filter) {
        var query = datatable.getDataSourceQuery();

        if (filter['country']) {
            query['country'] = {$like: filter['country'] + '%'};
        } else {
            delete query.country;
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