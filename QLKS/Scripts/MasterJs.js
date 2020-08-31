var datatableLanguage = {
    "emptyTable": "Không có dữ liệu",
    "lengthMenu": "Xem _MENU_ mục",
    "zeroRecords": "Không tìm thấy dòng nào phù hợp",
    "info": "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
    "infoEmpty": "Đang xem 0 đến 0 trong tổng số 0 mục",
    "infoFiltered": "(được lọc từ _MAX_ dòng)",
    "processing": "Đang tải dữ liệu.",
    "search": "Tìm kiếm",
    "paginate": {
        "previous": "❮",
        "next": "❯"
    }
};

var ckeditorDefaultConfig = {
    extraPlugins: 'easyimage',
    language: 'vi',
    //htmlEncodeOutput: true,
    toolbar: [
        { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
        { name: 'document', groups: ['mode', 'document', 'doctools'], items: ['Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates'] },
        //{ name: 'clipboard', groups: ['clipboard', 'undo'], items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker'], items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
        { name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'], items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
        //{ name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'], items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
        { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
        { name: 'insert', items: [/* 'Image', */'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
    ]
};

function TranformPhone(phone, displayNum) {
    if (phone != null && phone != undefined && (phone > displayNum)) {
        var PhoneLength = phone.toString().length;
        var coverPart = phone.substring(0, PhoneLength - displayNum);
        var displayPart = phone.substr(PhoneLength - displayNum);

        var coverPartTranform = coverPart.replace(/./g, "*");
        //console.log(coverPartTranform + displayPart);

        return coverPartTranform + displayPart;
    }
    else return phone
}

function getParamFromUrl(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getHourString(d) {
    //var d = new Date();
    //var x = document.getElementById("demo");
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    return (h + ":" + m + ":" + s);
}

String.prototype.toNum = function (defaultNum) {
    if (!defaultNum)
        defaultNum = 0;
    var value = parseInt(this, defaultNum);
    if (value == NaN)
        return defaultNum;
    return value;
}

String.prototype.jsonToVNDate = function () {
    if (this != null && this.indexOf("Date") >= 0) {
        var date = moment(this.toString());
        return date.format("DD/MM/YYYY");
    }
    return "";
}
String.prototype.JsonToDate = function () {
    if (this != null && this.indexOf("Date") >= 0) {
        var myString = this.toString().replace(/\D/g, '').toNum();
        var date = new Date(myString);
        return date;
    }
    return null;
}

Object.defineProperty(Object.prototype, "enumToList", {
    value: function () {
        var arr = [];
        for (var key in this) {
            arr.push({ Key: key, Value: window.CampaignStatusEnum[key] });
        }
        return arr;
    },
    enumerable: false
});

var moduleExportExcel = function () {
    app.factory('Excel',
        function ($window) {
            var uri = 'data:application/vnd.ms-excel;base64,',
                template =
                    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
                format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
            return {
                tableToExcel: function (tableId, worksheetName) {
                    var table = document.querySelector(tableId),
                        ctx = { worksheet: worksheetName, table: table.innerHTML },
                        href = uri + base64(format(template, ctx));
                    return href;
                }
            };
        });
}

var RemoveTypeVietNames = function (str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

var numericOnly = function () {
    app.directive('numericOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$formatters.push(function (inputValue) {
                    if (inputValue == null)
                        return '';
                    inputValue = inputValue.toString().replace(/[^\d.-]/g, '');

                    return inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                });
                modelCtrl.$parsers.push(function (inputValue) {
                    var transformedInput = inputValue ? inputValue.replace(/[^\d\.]/g, '') : "";
                    if (transformedInput != "") {
                        transformedInput = parseFloat(transformedInput).toString();
                    }
                    transformedInput = transformedInput.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    });
}

var convertToNumber = function () {
    app.directive('convertToNumber', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (val) {
                    return val != null ? parseInt(val, 10) : null;
                });
                ngModel.$formatters.push(function (val) {
                    return val != null ? '' + val : null;
                });
            }
        };
    });
}

var displayPhone = function (num) {
    app.filter('displayPhone', function () {
        return function (tel) {
            if (!tel) { return ''; }
            var phoneLength = tel.toString().length;
            var coverPart = tel.substring(0, phoneLength - num);
            var displayPart = tel.substr(phoneLength - num);
            var coverPartTranform = coverPart.replace(/./g, "*");
            return coverPartTranform + displayPart;
        };
    });
}

var inputNumberIntegerOnly = function () {
    app.directive('inputNumberIntegerOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$formatters.push(function (inputValue) {
                    if (inputValue == null)
                        return '';
                    inputValue = inputValue.toString().replace(/[^\d.-]/g, '');

                    return inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, "");
                });
                modelCtrl.$parsers.push(function (inputValue) {
                    var transformedInput = inputValue ? inputValue.replace(/[^\d\.]/g, '') : "";
                    if (transformedInput != "") {
                        transformedInput = parseFloat(transformedInput).toString();
                    }
                    transformedInput = transformedInput.replace(/\B(?=(\d{3})+(?!\d))/g, "");

                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    });
}

var datePicker = function () {
    app.directive('datepicker',
        [
            function () {
                return {
                    require: '?ngModel',
                    restrict: 'A',
                    scope: {
                        date: '=ngModel'
                    },
                    link: function (scope, element, attr, ngModel) {
                        console.log(scope.date);
                        //element = $(element);
                        element.datetimepicker({
                            format: 'DD/MM/YYYY',
                            defaultDate: scope.date
                        });
                        element.on('dp.change',
                            function (event) {
                                scope.$apply(function () {
                                    ngModel.$setViewValue(event.date._d);
                                });
                            });
                    }
                };
            }
        ]);
}

var datetimePicker = function () {
    app.directive('datetimepicker',
        [
            function () {
                return {
                    require: '?ngModel',
                    restrict: 'A',
                    scope: {
                        date: '=ngModel'
                    },
                    link: function (scope, element, attr, ngModel) {
                        console.log(scope.date);
                        //element = $(element);
                        element.datetimepicker({
                            format: 'DD/MM/YYYY HH:MM:SS',
                            defaultDate: scope.date
                        });
                        element.on('dp.change',
                            function (event) {
                                scope.$apply(function () {
                                    ngModel.$setViewValue(event.date._d);
                                });
                            });
                    }
                };
            }
        ]);
}

var getParamFromUrl = function (sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

var angularAppConfigHttpProvider = function (app) {
    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(['$location', '$injector', '$q', function ($location, $injector, $q) {
            return {
                'request': function (config) {
                    config.headers["X-Requested-With"] = 'XMLHttpRequest';
                    return config;
                },
                'response': function (rejection) {
                    // debugger;
                    if (rejection.data.Status != null) {
                        if (rejection.data.Status != 0) {
                            if (rejection.data.Status === -2) {
                                $("#loginModal").modal("show");
                            }
                            if (toastr)
                                toastr.error(rejection.data.Message);
                        }
                        return rejection.data;
                    }

                    return rejection;
                },
                'responseError': function (rejection) {
                    toastr.error("Lỗi " + rejection.status + " ! Liên hệ admin.");
                    return rejection;
                }
            };
        }
        ]);
    }]);

    app.directive('numberOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$formatters.push(function (inputValue) {
                    if (inputValue == null)
                        return '';
                    inputValue = inputValue.toString().replace(/[^\d.-]/g, '');

                    return inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                });
                modelCtrl.$parsers.push(function (inputValue) {
                    console.log(inputValue);
                    var transformedInput = inputValue ? inputValue.replace(/[^\d\.]/g, '') : "";
                    var dot = "";

                    if (transformedInput != "") {
                        if (transformedInput.indexOf(".") == 0)
                            transformedInput = "0" + transformedInput;

                        if (transformedInput.indexOf(".") > 0) {
                            var l = transformedInput.split('.');
                            transformedInput = l[0] + '.' + l[1];
                            dot = transformedInput.substr(transformedInput.indexOf("."));
                            transformedInput = transformedInput.substr(0, transformedInput.indexOf("."));
                        }

                        transformedInput = parseFloat(transformedInput).toString();
                    }

                    transformedInput = transformedInput.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + dot;

                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    });

    app.directive('phoneFormat', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$formatters.push(function (inputValue) {
                    if (inputValue == null)
                        return '';
                    inputValue = inputValue.toString().replace(/[^\d]/g, '');
                    return inputValue;
                });
                modelCtrl.$parsers.push(function (inputValue) {
                    var transformedInput = inputValue ? inputValue.replace(/[^\d]/g, '') : "";

                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    });
}

var validCompareTo = function () {
    app.directive('validCompareTo', function () {
        return {
            require: 'ngModel',
            scope: {
                reference: '=validCompareTo'
            },
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue, $scope) {
                    var noMatch = viewValue != scope.reference;
                    ctrl.$setValidity('noMatch', !noMatch);
                    return (noMatch) ? noMatch : !noMatch;
                });

                scope.$watch("reference", function (value) {
                    ctrl.$setValidity('noMatch', value === ctrl.$viewValue);
                });
            }
        }
    });
}