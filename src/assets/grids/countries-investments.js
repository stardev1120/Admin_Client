var Datatable_Countries_Investments_AJAX_DEMO = function () {
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
                headers['country_id'] = currentCountry;
            }
        }
    }
    var demo = function (filter) {
        datatable = $('.m_datatable-countries-investments').mDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: 'GET',
                        headers: headers,
                        url: baseUrl + '/country-investment/country',
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

            search: {
                // input: $('#m_form_name')
            },

            // columns definition
            columns: [
                {
                    field: 'amount_available',
                    title: 'Amount Available',
                    filterable: false
                }, {
                    field: 'status',
                    title: 'Status',
                    // sortable: 'asc', // default sort
                    filterable: false
                },

                {
                    field: 'Actions',
                    //width: 110,
                    title: 'Actions',
                    sortable: false,
                    overflow: 'visible',
                    template: function (row) {
                        return '\
                            <a href="#/countries-investments/' + row.id + '/' + $('#country_id_1').val() + '" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\
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
                    }
                }]
        });

        datatable.on('click', '[id^="delete-row-"]', function (e) {
            var id = $(e.target).prop('id');
            id = id.replace('delete-row-', '');
            console.log(id, 'e');

            $.ajax({
                url: baseUrl + '/' + id,
                method: 'delete',
                headers: headers
            }).done(datatable.load);
        });
        query(filter);
        return datatable;
    };

    function query(filter) {
        var query = datatable.getDataSourceQuery();

        if (filter['country_id']) {
            query['country_id'] = filter['country_id'];
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