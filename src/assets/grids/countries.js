//== Class definition

var DatatableRemoteAjaxDemo = function () {
    //== Private functions
    var baseUrl = 'http://192.168.153.129:3000/api/admin/country'
    // basic demo
    var demo = function () {
        var currentUserString = localStorage.getItem('currentUser');
        var headers = {
            "content-type": "application/json"
        };
        if (currentUserString) {
            var currentUser = JSON.parse(currentUserString);
            if (currentUser) {
                var token = currentUser.token;
                headers['authorization'] = "JWT " + token;
                headers['country_id'] = currentUser.country_id ? currentUser.country_id : 1;
            }

        }
        var datatable = $('.m_datatable_countries').mDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        // sample GET method
                        method: 'GET',
                        headers: headers,
                        //url: 'http://keenthemes.com/metronic/preview/inc/api/datatables/demos/default.php',
                        url: baseUrl,
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
                pageSize: 5,
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
            include: "",

            pagination: true,

            toolbar: {
                // toolbar items
                items: {
                    // pagination
                    /*actions: {
                        delete: {
                            name: 'Delete All',
                            url: '/delete',
                            fn: function (ids) {
                                console.log(ids);
                            }
                        }
                    },*/
                    pagination: {
                        // page size select
                        pageSizeSelect: [5, 10, 20, 50, 100]
                    }
                }
            },

            search: {
                input: $('#name')
            },

            // columns definition
            columns: [
                /* {
                     field: 'select',
                     width: 20,
                     title: ' <input type="checkbox" name="selectall" id="selectall" value="all"/>',
                     sortable: false,
                     overflow: 'visible',
                     template: function (row) {
                         return '<input type="checkbox" id="select-' + row.id + '" data-value="'+row.id+'"/>';
                     },
                 },*/
                {
                    field: 'name',
                    title: 'Name',
                    // sortable: 'asc', // default sort
                    filterable: false, // disable or enable filtering
                    //width: 50,
                    // basic templating support for column rendering,
                    //template: '{{OrderID}} - {{ShipCountry}}',
                },
                {
                    field: 'country_code',
                    title: 'Code',
                    filterable: false, // disable or enable filtering
                    //width: 100
                }, {
                    field: 'status',
                    title: 'Status',
                    // sortable: 'asc', // default sort
                    filterable: false, // disable or enable filtering
                    //width: 100,
                    template: function (row) {
                        return row.status ? 'Active' : 'Inactive';
                    }
                    // basic templating support for column rendering,
                    //template: '{{OrderID}} - {{ShipCountry}}',
                },

                {
                    field: 'Actions',
                    // width: 110,
                    title: 'Actions',
                    sortable: false,
                    overflow: 'visible',
                    template: function (row) {
                        var dropup = (row.getDatatable().getPageSize() - row.getIndex()) <= 4 ? 'dropup' : '';
                        return '\
                            <a href="#/countries/' + row.id + '" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit details">\
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


        $('#name').on('input propertychange paste', function () {
            // shortcode to datatable.getDataSourceParam('query');
            var query = datatable.getDataSourceQuery();
            if ($(this).val()) {
                query.name = $(this).val();
            } else {
                delete query.name;
            }
            // shortcode to datatable.setDataSourceParam('query', query);
            datatable.setDataSourceQuery(query);
            datatable.load();
        }).val(typeof query.name !== 'undefined' ? query.name : '');

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
                method: 'delete',
                headers: headers,
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