var app = angular.module('QLKS', ['ui.select2', 'ui.bootstrap', 'datatables']);
app.controller('CustomerManagementCtrl', function ($scope, $http, $timeout, $window) {
    $scope.radGT = "1";
    $scope.txtCMND = "";

    $scope.dataTable = [];
    var requiredList = document.getElementsByClassName('input-required');

    $scope.dtOptions = {
        "bStateSave": true,
        "aLengthMenu": [[15, 50, 100, -1], [15, 50, 100, 'All']],
        "bSort": true,
        "language": window.datatableLanguage
    };

    angular.element(document).ready(function () {
        $scope.searchCustomer();
    });

    $(document).on("click", ".modal123", function (e) {
        e.preventDefault();
        var _self = $(this);
        var myBookId = _self.data('id');
        if (myBookId === "Create") {
            $("#titleheader").text("Thêm mới");
            $("#update").hide();
            $("#insert").show();
            clearValueModal();
        } else if (myBookId === "Update") {
            $("#titleheader").text("Cập nhật");
            $("#insert").hide();
            $("#update").show();
            var maKH = _self.data('value');
            $scope.getCustomerByID(maKH);
        } else {
            $("#titleheader").text("Thông tin");
            $("#insert").hide();
            $("#update").hide();
            var maKH = _self.data('value');
            $scope.getCustomerByID(maKH);
        }
    });

    $(document).on("click", "#DeleteCustomer", function (e) {
        e.preventDefault();
        var _self = $(this);
        var maKH = _self.data('value');
        $scope.DeleteCustomer(maKH);
    });

    $scope.searchCustomer = function () {
        var params = {
            MaKH: $("#CustomerID").val(),
            TenKH: $("#CustomerName").val()
        }
        $http({
            url: `/WebServiceCP.aspx?action=GetCustomerList`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: params
        }).then(function (response) {
            var temp = response.data.Data;
            if (temp.length > 0) {
                $scope.dataTable = temp;
            } else {
                $scope.dataTable = [];
            }
        }, function (err) {
            //toastr.error("Xảy ra lỗi trong quá trình thực thi.");
            $scope.dataTable = [];
            console.log(err);
        });
    }

    $scope.getCustomerByID = function (ID) {
        var params = {
            MaKH: ID
        }
        $http({
            url: `/WebServiceCP.aspx?action=GetCustomerByID`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: params
        }).then(function (response) {
            console.log("response:", response);
            var temp = response.data.Data;
            if (temp.length > 0) {
                setValueModal(temp[0]);
            }
        }, function (err) {
            //toastr.error("Xảy ra lỗi trong quá trình thực thi.");
            console.log(err);
        });
    }

    $scope.InsertCustomer = function () {
        var checkRequired = validForm();
        if (!checkRequired) {
            toastr.warning("Vui lòng điền đầy đủ thông tin !");
            return false;
        }
        var params = {
            TenKH: $("#txtMCustomerName").val(),
            SDT: $("#txtMSDT").val(),
            Email: $("#txtMEmail").val(),
            DiaChi: $("#txtMAddress").val(),
            NgaySinh: moment($("#txtMBirthday").val(), "DD/MM/YYYY").format("YYYY-MM-DD"),
            GioiTinh: $scope.radGT == "1" ? true : false,
            CMND: $scope.txtCMND
        }
        $http({
            url: `/WebServiceCP.aspx?action=CreateCustomer`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: params
        }).then(function (response) {
            if (response.data.Message === "SUCCESS") {
                $scope.searchCustomer();
                toastr.success("Lưu thành công !");
            } else {
                toastr.error("Lưu thất bại !");
            }
        }, function (err) {
            toastr.error("Xảy ra lỗi trong quá trình thực thi.");
            console.log(err);
        });
    }

    $scope.UpdateCustomer = function () {
        var checkRequired = validForm();
        if (!checkRequired) {
            toastr.warning("Vui lòng điền đầy đủ thông tin !");
            return false;
        }
        var params = {
            MaKH: $("#txtMCustomerID").val().trim(),
            TenKH: $("#txtMCustomerName").val().trim(),
            SDT: $("#txtMSDT").val().trim(),
            Email: $("#txtMEmail").val().trim(),
            DiaChi: $("#txtMAddress").val().trim(),
            NgaySinh: moment($("#txtMBirthday").val(), "DD/MM/YYYY").format("YYYY-MM-DD"),
            GioiTinh: $scope.radGT == "1" ? true : false,
            CMND: $scope.txtCMND
        }
        $http({
            url: `/WebServiceCP.aspx?action=UpdateCustomer`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: params
        }).then(function (response) {
            if (response.data.Message === "SUCCESS") {
                $scope.searchCustomer();
                toastr.success("Lưu thành công !");
            } else {
                toastr.error("Lưu thất bại !");
            }
        }, function (err) {
            toastr.error("Xảy ra lỗi trong quá trình thực thi.");
            console.log(err);
        });
    }

    $scope.DeleteCustomer = function (maKH) {
        if (confirm("Bạn có chắc muốn xoá dữ liệu ???")) {
            var params = {
                MaKH: maKH
            }
            $http({
                url: `/WebServiceCP.aspx?action=DeleteCustomer`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: params
            }).then(function (response) {
                console.log("response:", response);
                if (response.data.Message === "SUCCESS") {
                    $scope.searchCustomer();
                    toastr.success("Xoá thành công !");
                } else if (response.data.Message === "PDP_EXIST") {
                    toastr.warning("Khách hàng đã từng đặt phòng !");
                } else {
                    toastr.error("Xoá thất bại !");
                }
            }, function (err) {
                toastr.error("Xảy ra lỗi trong quá trình thực thi.");
                console.log(err);
            });
        }
    }

    setValueModal = function (e) {
        $("#txtMCustomerID").val(e.MaKH);
        $("#txtMCustomerName").val(e.TenKH);
        $("#txtMSDT").val(e.SDT);
        $("#txtMEmail").val(e.Email);
        $("#txtMAddress").val(e.DiaChi);
        $("#txtMBirthday").val(e.NgaySinh);

        $scope.radGT = e.GioiTinh ? "1" : "0";
        $scope.txtCMND = e.CMND;
    }
    clearValueModal = function () {
        $("#txtMCustomerID").val("");
        $("#txtMCustomerName").val("");
        $("#txtMSDT").val("");
        $("#txtMEmail").val("");
        $("#txtMAddress").val("");
        $("#txtMBirthday").val("");

        $scope.radGT = "1";
        $scope.txtCMND = "";
    }

    //valid
    function required(i) {
        requiredList[i].style.borderColor = "red";
    }

    function reset_effect(i) {
        requiredList[i].style.borderColor = "#D5D5D5";
    }

    function validForm() {
        var flag = true;
        if (requiredList.length > 0) {
            for (var i = 0; i < requiredList.length; i++) {
                if (requiredList[i].value.trim() === '') {
                    required(i);
                    flag = false;
                } else {
                    reset_effect(i);
                }
            }
        }

        return flag;
    }

    $scope.showModal = function () {
        $("#modal-table").modal();
    }
})