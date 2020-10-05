var app = angular.module('QLKS', ['ui.select2', 'ui.bootstrap', 'datatables', 'angular.filter']);
app.controller('BookingRoomCtrl', function ($scope, $http, $timeout, $window) {
    $scope.RoomList = [];
    $scope.CustomerList = [];
    $scope.txtRoomId = "";
    $scope.ddlCustomer = "";
    $scope.ddlFloorSearch = "";
    $scope.ddlStatusSearch = "";
    $scope.ddlRoomTypeSearch = "";
    $scope.txtRoomIdSearch = "";
    $scope.txtFromDate = moment().format("DD/MM/YYYY");
    $scope.txtToDate = moment().format("DD/MM/YYYY");
    $scope.txtUnitPrice = 0;
    $scope.txtTotalMoney = 0;

    // customer
    $scope.txtCustomer = "";
    $scope.txtPhone = "";
    $scope.txtEmail = "";
    $scope.txtAddress = "";
    $scope.txtBirthday = "";
    $scope.txtCMND = "";
    $scope.radGT = "1";
    $scope.CustomerNew = {};

    angular.element(document).ready(function () {
        $scope.GetRoom();
        $scope.GetCustomer();
    });

    $scope.ClearData = function () {
        $scope.txtRoomId = "";
        $scope.ddlCustomer = "";
        $scope.txtFromDate = moment().format("DD/MM/YYYY");
        $scope.txtToDate = moment().format("DD/MM/YYYY");
        $scope.txtUnitPrice = 0;
        $scope.txtTotalMoney = 0;
        $scope.txtQuantityProduct = 1;
        $scope.lblTotalMoneyProduct = 0;
        $scope.CustomerNew = {};
    }

    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.showModal = function (item) {
        //console.log("item", item);
        $scope.ClearData();
        if (item.TrangThai == 0) {
            $scope.ItemRoom = item;
            $scope.txtRoomId = item.MaPhong;
            $scope.txtUnitPrice = item.DonGia;
            var days = moment($scope.txtToDate, "DD/MM/YYYY").diff(moment($scope.txtFromDate, "DD/MM/YYYY"), "days") + 1;
            $scope.txtTotalMoney = days * item.DonGia;

            $("#modalBooking").modal();
        } else {
            toastr.warning("Phòng đã đặt không thể đặt nữa. Xin vui lòng chọn phòng trống.");
        }
    }

    $scope.GetRoom = function () {
        var params = {
            MaPhong: $scope.txtRoomIdSearch,
            TenPhong: "",
            Lau: $scope.ddlFloorSearch,
            TrangThai: $scope.ddlStatusSearch,
            LoaiPhong: $scope.ddlRoomTypeSearch,
        }
        $http({
            url: `/WebServiceCP.aspx?action=GetRoomList`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: params
        }).then(function (response) {
            var temp = response.data.Data;
            console.log("GetRoom", response);
            $scope.RoomList = temp;
        }, function (err) {
            $scope.RoomList = [];
            console.log(err);
        });
    }

    $scope.GetCustomer = function () {
        var params = {
            MaKH: "",
            TenKH: ""
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
            $scope.CustomerList = temp;

            if ($scope.CustomerNew && $scope.CustomerNew.MaKH) {
                setTimeout(function () {
                    $scope.ddlCustomer = $scope.CustomerNew.MaKH.toString();
                    $scope.safeApply($scope.ddlCustomer);
                }, 200);
            }

            setTimeout(function () {
                $("#ddlCustomer").select2().trigger('change')
            }, 200);

            console.log("$scope.CustomerNew", $scope.CustomerNew);
            console.log("GetCustomer", response);
        }, function (err) {
            $scope.CustomerList = [];
            console.log(err);
        });
    }

    $scope.ChangeToDate = function () {
        if (!$scope.txtToDate || $scope.txtToDate == "") {
            toastr.warning("Không được bỏ trống ngày đến.");
            return;
        }

        if (moment($scope.txtToDate, "DD/MM/YYYY").isBefore(moment($scope.txtFromDate, "DD/MM/YYYY").format("YYYY-MM-DD"))) {
            toastr.warning("Đến ngày phải lớn hơn từ ngày.");
            return;
        }

        var days = moment($scope.txtToDate, "DD/MM/YYYY").diff(moment($scope.txtFromDate, "DD/MM/YYYY"), "days") + 1;
        $scope.txtTotalMoney = days * $scope.txtUnitPrice;
    }

    $scope.ChangeFromDate = function () {
        if (!$scope.txtFromDate || $scope.txtFromDate == "") {
            toastr.warning("Không được bỏ trống ngày đến.");
            return;
        }

        if (moment($scope.txtToDate, "DD/MM/YYYY").isBefore(moment($scope.txtFromDate, "DD/MM/YYYY").format("YYYY-MM-DD"))) {
            toastr.warning("Từ ngày phải nhỏ hơn đến ngày.");
            return;
        }

        var days = moment($scope.txtToDate, "DD/MM/YYYY").diff(moment($scope.txtFromDate, "DD/MM/YYYY"), "days") + 1;
        $scope.txtTotalMoney = days * $scope.txtUnitPrice;
    }

    $scope.SaveBookingRoom = function () {
        if (!$scope.ddlCustomer || $scope.ddlCustomer == "") {
            toastr.warning("Vui lòng chọn khách hàng.");
            return;
        }

        if (!$scope.txtToDate || $scope.txtToDate == "") {
            toastr.warning("Không được bỏ trống ngày đến.");
            return;
        }

        if (!$scope.txtFromDate || $scope.txtFromDate == "") {
            toastr.warning("Không được bỏ trống ngày đến.");
            return;
        }

        if (moment($scope.txtToDate, "DD/MM/YYYY").isBefore(moment($scope.txtFromDate, "DD/MM/YYYY").format("YYYY-MM-DD"))) {
            toastr.warning("Đến ngày phải lớn hơn từ ngày.");
            return;
        }

        var params = {
            MaKH: $scope.ddlCustomer,
            MaPhong: $scope.txtRoomId,
            NgayBD: moment($scope.txtFromDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
            NgayKT: moment($scope.txtToDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
            TongTien: $scope.txtTotalMoney,
            DonGia: $scope.txtUnitPrice
        }
        $http({
            url: `/WebServiceCTQ.aspx?action=SaveBookingRoom`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: params
        }).then(function (response) {
            console.log("SaveBookingRoom", response);
            if (response.data.Status == 0) {
                toastr.success(response.data.Message);
                $scope.GetRoom();
                $("#modalBooking").modal("hide");
            } else {
                toastr.warning(response.data.Message);
            }
        }, function (err) {
            console.log(err);
        });
    }

    $scope.ShowModalCustomer = function () {
        $scope.txtCustomerName = "";
        $scope.txtPhone = "";
        $scope.txtEmail = "";
        $scope.txtAddress = "";
        $scope.txtBirthday = "";
        $scope.CustomerNew = {};

        $("#modalBooking").modal("hide");
        $("#modalCustomer").modal();
    }

    $scope.CloseModalCustomer = function () {
        $("#modalBooking").modal();
    }

    $scope.InsertCustomer = function () {
        var checkRequired = validForm();
        if (!checkRequired) {
            toastr.warning("Vui lòng điền đầy đủ thông tin !");
            return false;
        }
        var params = {
            TenKH: $scope.txtCustomerName,
            SDT: $scope.txtPhone,
            Email: $scope.txtEmail,
            DiaChi: $scope.txtAddress,
            NgaySinh: moment($scope.txtBirthday, "DD/MM/YYYY").format("YYYY-MM-DD"),
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
            console.log("InsertCustomer", response);
            if (response.data.Message === "SUCCESS") {
                $scope.CustomerNew = response.data.Data;
                $scope.GetCustomer();
                toastr.success("Lưu thành công !");
                $("#modalCustomer").modal("hide");
                $("#modalBooking").modal();
            } else {
                toastr.error("Lưu thất bại !");
            }
        }, function (err) {
            toastr.error("Xảy ra lỗi trong quá trình thực thi.");
            console.log(err);
        });
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
})
var requiredList = document.getElementsByClassName('input-required');