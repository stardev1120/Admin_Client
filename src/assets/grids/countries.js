var Datatable_Countries_AJAX_DEMO = function () {
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
        var actionsRights = JSON.parse($('#country_id_actions').val());
        datatable = $('.m_datatable_countries').mDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: 'GET',
                        headers: headers,
                        url: baseUrl + '/country',
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
                    field: 'name',
                    title: 'Name',
                    // sortable: 'asc', // default sort
                    filterable: false
                },
                {
                    field: 'country_code',
                    title: 'Code',
                    filterable: false
                }, {
                    field: 'status',
                    title: 'Status',
                    // sortable: 'asc', // default sort
                    filterable: false, // disable or enable filtering
                    //width: 100,
                    template: function (row) {
                        return row.status ? 'Active' : 'Inactive';
                    }
                },
                {
                    field: 'Actions',
                    // width: 110,
                    title: 'Actions',
                    sortable: false,
                    overflow: 'visible',
                    template: function (row) {
                        var content = '';
                        if (actionsRights) {
                            if (actionsRights['PUT']) {
                                content = content + '\
                            <a href="#/countries/' + row.id + '" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\
							<i class="la la-edit"></i>\
						</a>\
						\
						';
                            }
                            return content;
                        } else {
                            return '\
                            <a href="#/countries/' + row.id + '" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\
							<i class="la la-edit"></i>\
						</a>\
						\
					';
                        }

                    }
                }]
        });
        query(filter);
        return datatable;
    };

    function query(filter) {
        var query = datatable.getDataSourceQuery();

        if (filter['name']) {
            query['name'] = filter['name'];
        } else {
            delete query.name;
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
