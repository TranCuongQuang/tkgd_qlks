(function () {
    'use strict';
    var app = angular.module('qlks', []);
    app.controller("PrintInputWarehouseTransactionCtrl", printWarehouseCtrl);
    printWarehouseCtrl.$inject = ['$scope', '$http', '$window', '$timeout'];

    function printWarehouseCtrl($scope, $http, $window, $timeout) {
        $scope.loading = true;

        $scope.preview = 0;
        $scope.preview = parseInt(GetURLParameter('preview') ? GetURLParameter('preview') : 0);
        $scope.rowKey = parseInt(GetURLParameter('MaPhieuDP') ? GetURLParameter('MaPhieuDP') : 0);

        $scope.BookingRoomList = {};
        $scope.BookingRoomDetailList = [];
        $scope.lblTotalMoney = 0;
        $scope.lblTotalMoneyVN = "";

        $scope.GetBookingRoom = function () {
            var roomId = 0;
            var customerId = 0;
            var phone = '';
            var maPhieuDP = $scope.rowKey;

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
                if (temp.length != 0) {
                    $scope.BookingRoomList = temp[0];
                    $scope.BookingRoomDetailList =  $scope.BookingRoomList.SanPhamPhong;
                    var money = _.sumBy($scope.BookingRoomDetailList, function (o) { return o.ThanhTien; });
                    $scope.lblTotalMoneySPDV = money ;
                    $scope.lblTotalMoney = money + $scope.BookingRoomList.TongTien;
                    $scope.lblTotalMoneyVN = ACCToString($scope.lblTotalMoney);
                } else {
                    $scope.BookingRoomList = {};
                }
            }, function (err) {
                $scope.BookingRoomList = {};
                console.log(err);
            });
        }

        //call function when load form
        $scope.onPrintInit = function () {
            $scope.GetBookingRoom();
            if ($scope.preview === 0) {
                $timeout($window.print, 300);
            }
        }
    }
})();