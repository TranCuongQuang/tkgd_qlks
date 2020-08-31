var app = angular.module('QLKS', ['ui.select2', 'ui.bootstrap', 'datatables']);
app.controller('LoginCtrl', function ($scope, $http, $timeout, $window) {
    $scope.txtUserName = "";
    $scope.txtPassWord = "";

    //angular.element(document).ready(function () {
    //});

    $scope.Login = function () {
        var rek = Validate();
        if (!rek) {
            toastr.warning("Vui lòng điền đầy đủ dữ liệu yêu cầu.");
            return false;
        } else {
            var params = {
                userName: $scope.txtUserName,
                passWord: $scope.txtPassWord
            }

            //console.log("params", params);
            $http({
                url: `/WebServiceCTQ.aspx?action=Login`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: params
            }).then(function (response) {
                console.log("Login response:", response);
                if (response.data.Status == -1) {
                    toastr.warning(response.data.Message);
                } else {
                    window.location.href = "/BookingRoom.aspx";
                }
            }, function (err) {
                toastr.error("Xảy ra lỗi trong quá trình thực thi.");
                console.log(err);
            });
        }
    }

    required = function (i) {
        requiredList[i].style.borderColor = "red";
    }

    reset_effect = function (i) {
        requiredList[i].style.borderColor = "#D5D5D5";
    }

    Validate = function () {
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

// JS
var requiredList = document.getElementsByClassName('entry_required');