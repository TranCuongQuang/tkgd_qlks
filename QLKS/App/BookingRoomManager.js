var app = angular.module('QLKS', ['ui.select2', 'ui.bootstrap', 'datatables', 'angular.filter']);
app.controller('BookingRoomManagerCtrl', function ($scope, $http, $timeout, $window) {
    $scope.RoomList = [];
    $scope.CustomerList = [];
    $scope.BookingRoomList = [];
    $scope.ChooseProductList = [];
    $scope.ddlCustomer = "";
    $scope.ddlRoom = "";
    $scope.ddlProduct = "";
    $scope.txtPhone = "";
    $scope.txtRoomId = "";
    $scope.txtCustomer = "";
    $scope.txtFromDate = "";
    $scope.txtToDate = "";
    $scope.txtUnitPrice = 0;
    $scope.txtTotalMoney = 0;
    $scope.txtQuantityProduct = 1;
    $scope.lblTotalMoneyProduct = 0;
    $scope.ChooseBookingRoom = {};
    $scope.txtAllTotalMoney = 0;
    $scope.ShowBtnPrint = false;

    $scope.dtOptions = {
        "bStateSave": true,
        "aLengthMenu": [[15, 50, 100, -1], [15, 50, 100, 'All']],
        "bSort": true,
        "language": window.datatableLanguage
    };

    angular.element(document).ready(function () {
        $scope.GetRoom();
        $scope.GetCustomer();
        $scope.GetProduct();
    });

    $scope.GetRoom = function () {
        var params = {
            MaPhong: "",
            TenPhong: "",
            TrangThai: ""
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
            console.log("GetCustomer", response);
        }, function (err) {
            $scope.CustomerList = [];
            console.log(err);
        });
    }

    $scope.GetProduct = function () {
        var params = {
            MaSP: "",
            TenSP: ""
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
            $scope.ProductList = temp;
            console.log("GetProduct", response);
        }, function (err) {
            $scope.ProductList = [];
            console.log(err);
        });
    }

    $scope.GetBookingRoom = function () {
        var roomId = $scope.ddlRoom;
        var customerId = $scope.ddlCustomer;
        var phone = $scope.txtPhone;
        var maPhieuDP = 0;

        if (!roomId || roomId == "") {
            toastr.warning("Vui lòng chọn phòng.");
            return;
        }

        if (!customerId || customerId == "") {
            toastr.warning("Vui lòng chọn khách hàng.");
            return;
        }

        $http({
            url: `/WebServiceCTQ.aspx?action=GetBookingRoom&RoomId=${roomId}&CustomerId=${customerId}&Phone=${phone}&MaPhieuDP=${maPhieuDP}`,
            method: "GET",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: {}
        }).then(function (response) {
            var temp = response.data.Data;
            console.log("GetBookingRoom", response);
            $scope.BookingRoomList = temp;
            if (temp.length == 0) {
                toastr.warning("Không tìm thấy danh sách phòng đã đặt.")
            }
        }, function (err) {
            $scope.BookingRoomList = [];
            console.log(err);
        });
    }

    $scope.ClearData = function () {
        $scope.ChooseProductList = [];
        $scope.ddlProduct = "";
        $scope.txtRoomId = "";
        $scope.txtCustomer = "";
        $scope.txtFromDate = "";
        $scope.txtToDate = "";
        $scope.txtUnitPrice = 0;
        $scope.txtTotalMoney = 0;
        $scope.txtQuantityProduct = 1;
        $scope.lblTotalMoneyProduct = 0;
        $scope.ChooseBookingRoom = {};
        $scope.ShowBtnPrint = false;
    }

    $scope.EditBookingRoom = function (item) {
        console.log("EditBookingRoom", item);

        $scope.ClearData();
        $scope.ChooseBookingRoom = item;
        $scope.txtRoomId = item.MaPhong;
        $scope.txtCustomer = item.TenKH;
        $scope.txtFromDate = moment(item.NgayBD).format("DD/MM/YYYY");
        $scope.txtToDate = moment(item.NgayKT).format("DD/MM/YYYY");
        $scope.txtUnitPrice = item.DonGia;
        $scope.txtTotalMoney = item.TongTien;
        $scope.ChooseProductList = item.SanPhamPhong;
        $scope.SumMoneyProduct();

        $("#modalBooking").modal();
    }

    $scope.ChooseProduct = function () {
        if (!$scope.ddlProduct || $scope.ddlProduct == "") {
            toastr.warning("Vui lòng chọn sản phẩm.");
            return;
        }

        if ($scope.txtQuantityProduct < 1) {
            toastr.warning("Số lượng phải lớn hơn 0.");
            return;
        }

        var itemExist = _.find($scope.ChooseProductList, { MaSP: parseInt($scope.ddlProduct) });
        if (itemExist) {
            //toastr.warning("Sản phẩm đã được chọn.");
            var item = _.find($scope.ChooseProductList, { MaSP: parseInt($scope.ddlProduct) });
            item.SoLuong = $scope.txtQuantityProduct;
            item.ThanhTien = item.SoLuong * item.DonGia;
            $scope.ddlProduct = "";
            $scope.SumMoneyProduct();
            return;
        }

        var item = _.find($scope.ProductList, { MaSP: parseInt($scope.ddlProduct) });
        item.SoLuong = $scope.txtQuantityProduct;
        item.ThanhTien = item.SoLuong * item.DonGia;
        $scope.ChooseProductList.push(item);
        $scope.ddlProduct = "";
        $scope.SumMoneyProduct();
        console.log("ChooseProduct", $scope.ChooseProductList);
    }

    $scope.RemoveChooseProduct = function (item) {
        var evens = _.remove($scope.ChooseProductList, function (n) {
            return n.MaSP == item.MaSP;
        });
        $scope.SumMoneyProduct();
        //console.log("RemoveChooseProduct", evens);
    }

    $scope.SumMoneyProduct = function () {
        var money = _.sumBy($scope.ChooseProductList, function (o) { return o.SoLuong * o.DonGia; });
        $scope.lblTotalMoneyProduct = money;
        $scope.txtAllTotalMoney = $scope.lblTotalMoneyProduct + $scope.txtTotalMoney;
        //console.log("SumMoneyProduct", money);
    }

    $scope.EditChooseProduct = function (item) {
        console.log("EditChooseProduct", item);

        $scope.txtQuantityProduct = item.SoLuong;
        $scope.ddlProduct = item.MaSP.toString();
    }

    $scope.UpdateBookingRoom = function () {
        var params = {
            MaPhieuDP: $scope.ChooseBookingRoom.MaPhieuDP,
            SanPhamPhong: $scope.ChooseProductList,
        }
        $http({
            url: `/WebServiceCTQ.aspx?action=UpdateBookingRoom`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: params
        }).then(function (response) {
            console.log("UpdateBookingRoom", response);
            if (response.data.Status == 0) {
                toastr.success(response.data.Message);
                $scope.GetBookingRoom();
                $("#modalBooking").modal("hide");
            } else {
                toastr.warning(response.data.Message);
            }
        }, function (err) {
            console.log(err);
        });
    }

    $scope.PaymentBookingRoom = function () {
        if (confirm("Bạn chắc chắn muốn trả phòng?")) {
            var params = {
                MaPhieuDP: $scope.ChooseBookingRoom.MaPhieuDP
            }
            $http({
                url: `/WebServiceCTQ.aspx?action=PaymentBookingRoom`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: params
            }).then(function (response) {
                console.log("PaymentBookingRoom", response);
                if (response.data.Status == 0) {
                    toastr.success(response.data.Message);
                    $scope.GetBookingRoom();
                    $scope.ShowBtnPrint = true;
                    //$("#modalBooking").modal("hide");
                } else {
                    toastr.warning(response.data.Message);
                }
            }, function (err) {
                console.log(err);
            });
        }
    }

    $scope.openPrintWHDetail = function () {
        var urlPrint = `Form_Print/PrintPaymentBookingRoom.html?preview=1&MaPhieuDP=${$scope.ChooseBookingRoom.MaPhieuDP}`;
        openPrintPreviewHtml(urlPrint, 'In hóa đơn', 1050, 550);
    }
})