var app = angular.module('QLKS', ['ui.select2', 'ui.bootstrap', 'datatables']);
app.controller('ProductManagementCtrl', function ($scope, $http, $timeout, $window) {

    $scope.dataTable = [];
    var requiredList = document.getElementsByClassName('input-required');

    $scope.dtOptions = {
        "bStateSave": true,
        "aLengthMenu": [[15, 50, 100, -1], [15, 50, 100, 'All']],
        "bSort": true,
        "language": window.datatableLanguage
    };

    angular.element(document).ready(function () {
        $scope.searchProduct();
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
            var maSP = _self.data('value');
            $scope.getProductByID(maSP);
        } else {
            $("#titleheader").text("Thông tin");
            $("#insert").hide();
            $("#update").hide();
            var maSP = _self.data('value');
            $scope.getProductByID(maSP);
        }
    });

    $(document).on("click", "#DeleteProduct", function (e) {
        e.preventDefault();
        var _self = $(this);
        var maSP = _self.data('value');
        $scope.DeleteProduct(maSP);
    });

    $scope.searchProduct = function () {
        var params = {
            MaSP: $("#ProductID").val(),
            TenSP: $("#ProductName").val()
        }
        $http({
            url: `/WebServiceCP.aspx?action=GetProductList`,
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

    $scope.getProductByID = function (ID) {
        var params = {
            MaSP: ID
        }
        $http({
            url: `/WebServiceCP.aspx?action=GetProductByID`,
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

    $scope.InsertProduct = function () {
        var checkRequired = validForm();
        if (!checkRequired) {
            toastr.warning("Vui lòng điền đầy đủ thông tin !");
            return false;
        }
        var params = {
            TenSP: $("#txtMProductName").val(),
            DonGia: $("#txtMAmount").val()
        }
        $http({
            url: `/WebServiceCP.aspx?action=CreateProduct`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: params
        }).then(function (response) {
            if (response.data.Message === "SUCCESS") {
                $scope.searchProduct();
                toastr.success("Lưu thành công !");
            } else {
                toastr.error("Lưu thất bại !");
            }
        }, function (err) {
            toastr.error("Xảy ra lỗi trong quá trình thực thi.");
            console.log(err);
        });
    }

    $scope.UpdateProduct = function () {
        var checkRequired = validForm();
        if (!checkRequired) {
            toastr.warning("Vui lòng điền đầy đủ thông tin !");
            return false;
        }
        var params = {
            MaSP: $("#txtMProductID").val(),
            TenSP: $("#txtMProductName").val(),
            DonGia: $("#txtMAmount").val()
        }
        $http({
            url: `/WebServiceCP.aspx?action=UpdateProduct`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: params
        }).then(function (response) {
            if (response.data.Message === "SUCCESS") {
                $scope.searchProduct();
                toastr.success("Lưu thành công !");
            } else {
                toastr.error("Lưu thất bại !");
            }
        }, function (err) {
            toastr.error("Xảy ra lỗi trong quá trình thực thi.");
            console.log(err);
        });
    }

    $scope.DeleteProduct = function (maSP) {
        if (confirm("Bạn có chắc muốn xoá dữ liệu ???")) {
            var params = {
                MaSP: maSP
            }
            $http({
                url: `/WebServiceCP.aspx?action=DeleteProduct`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: params
            }).then(function (response) {
                console.log("response:", response);
                if (response.data.Message === "SUCCESS") {
                    $scope.searchProduct();
                    toastr.success("Xoá thành công !");
                } else if (response.data.Message === "PDP_EXIST") {
                    toastr.warning("Sản phẩm đang được sử dụng !");
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
        $("#txtMProductID").val(e.MaSP);
        $("#txtMProductName").val(e.TenSP);
        $("#txtMAmount").val(e.DonGia);
    }
    clearValueModal = function () {
        $("#txtMProductID").val("");
        $("#txtMProductName").val("");
        $("#txtMAmount").val("");
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