//== Class definition

var DatatableRemoteAjaxDemo = function () {
    //== Private functions
    var baseUrl = 'http://localhost:3000/api/admin/users/user-activity-log'
    // basic demo
    var demo = function () {

        var datatable = $('.m_datatable').mDatatable({
            // datasource definition
            data: {
               // type: 'remote',
                source: {
                    read: {
                        // sample GET method
                        method: 'get',
                        //url: 'http://keenthemes.com/metronic/preview/inc/api/datatables/demos/default.php',
                        url: baseUrl,
                        headers: {"authorization": localStorage.getItem('token')},
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
                        pageSizeSelect: [ 10, 20, 30, 50, 100],
                    },
                },
            },

            search: {
            },

            // columns definition
            columns: [
                {
                    field: 'admin_users',
                    title: 'User Name',
                    filterable: false, // disable or enable filtering
                    width: 150,
                    template: function (row) {
                        return row.fname+' '+row.mname+' '+row.lname;
                    }
                },
                {
                    field: 'Action',
                    title: 'Action',
                    filterable: false, // disable or enable filtering
                    width: 200
                },
                {
                    field: 'pay_load',
                    title: 'Pay Load',
                    filterable: false, // disable or enable filtering
                    width: 150
                }],
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