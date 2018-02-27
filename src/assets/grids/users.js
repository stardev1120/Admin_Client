var Datatable_Users_AJAX_DEMO = function () {
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
        datatable = $('.m_datatable_users').mDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: 'GET',
                        url: baseUrl + '/user',
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
                theme: 'default',
                class: '',
                scroll: false,
                footer: false
            },
            sortable: true,
            pagination: true,
            toolbar: {
                items: {
                    pagination: {
                        pageSizeSelect: [10, 20, 50, 100]
                    }
                }
            },
            // columns definition
            columns: [
                {
                    field: 'id',
                    title: 'Id',
                    filterable: false, // disable or enable filtering
                    width: 50
                },
                {
                    field: 'email',
                    title: 'Email',
                    filterable: false, // disable or enable filtering
                    width: 200
                },
                {
                    field: 'fname',
                    title: 'Name',
                    filterable: false, // disable or enable filtering
                    //width: 150,
                    template: function (row) {
                        var userName = row.fname ? row.fname + ' ' : '';
                        userName += row.mname ? row.mname + ' ' : ' ';
                        userName += row.lname ? row.lname : '';
                        return userName;
                    }
                },
                {
                    field: 'phone_number',
                    title: 'Phone',
                    filterable: false
                },
                {
                    field: 'status',
                    title: 'Status',
                    filterable: false
                },
                {
                    field: 'created_at',
                    title: 'Sign up date',
                    filterable: false,
                    sortable: 'desc',
                    template: function (row) {
                        return DateFormat.format.date(row.created_at, 'D MMM yyyy hh:mm ss');
                    }
                },
                {
                    field: 'Actions',
                    //width: 110,
                    title: 'Actions',
                    sortable: false,
                    overflow: 'visible',
                    template: function (row) {
                        return '\<a href="#/users/view/' + row.id + '" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="View details">\
							<i class="la la-edit"></i>\
						</a>\
						\
					';
                    }
                }]
        });
        query(filter);
        return datatable;
    };

    function query(filter) {
        var query = datatable.getDataSourceQuery();
        if (currentCountry && !filter['country_id']) {
            query['country_id'] = currentCountry;
        } else {
            if (filter['country_id']) {
                query['country_id'] = filter['country_id'];
            } else {
                delete query.country_id
            }
        }
        if (filter['email']) {
            query['email'] = {$like: filter['email'] + '%'};
        } else {
            delete query.email;
        }

        if (filter['name']) {
            query['fname'] = {$like: filter['name'] + '%'};
        } else {
            delete query.fname;
        }

        if (filter['phone_number']) {
            query['phone_number'] = {$like: filter['phone_number'] + '%'};
        } else {
            delete query.phone_number;
        }

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
        datatable.setDataSourceQuery(query);
        datatable.load();
    }

    return {
        // public functions
        init: function (filter, baseUrlParam) {
            baseUrl = baseUrlParam
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