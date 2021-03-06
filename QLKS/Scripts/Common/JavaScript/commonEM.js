function Datepicker() {
    $('body').on('focus', ".mydatepicker", function () {
        $(this).datepicker({
            autoclose: true,
            todayHighlight: true,
            format: 'dd/mm/yyyy',
        })
            .mask('99/99/9999')
            .next().on(ace.click_event, function () {
                $(this).prev().focus();
            });
        $(this).keyup(function (e) {
            if (46 == e.keyCode || 8 == e.keyCode || 9 == e.keyCode) {
                var $this = $(this);
                if ($this.val() == "__/__/____")
                    $this.val("");
            }
        });
    });
}

//hunglt check empty string
function str_Empty(e) {
    switch (e) {
        case "":
        case 0:
        case "0":
        case null:
        case false:
        case typeof this == "undefined":
            return true;
        default:
            return false;
    }
}

function ajaxindicatorstart(text) {
    var dm = location.protocol + "//" + location.host + "/";
    //console(dm);
    if (jQuery('body').find('#resultLoading').attr('id') != 'resultLoading') {
        jQuery('body').append('<div id="resultLoading" style="display:none"><div><img src="' + dm + 'images/ajax-loader.gif"><div>' + text + '</div></div><div class="bg"></div></div>');
    }

    jQuery('#resultLoading').css({
        'width': '100%',
        'height': '100%',
        'position': 'fixed',
        'z-index': '10000000',
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'margin': 'auto'
    });

    jQuery('#resultLoading .bg').css({
        'opacity': '0.7',
        'width': '100%',
        'height': '100%',
        'position': 'absolute',
        'top': '0'
    });

    jQuery('#resultLoading>div:first').css({
        'width': '250px',
        'height': '75px',
        'text-align': 'center',
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'margin': 'auto',
        'font-size': '16px',
        'z-index': '10',
        'color': '#000',
        'font-weight': 'bold'
    });

    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeIn(300);
    jQuery('body').css('cursor', 'wait');
}

function ajaxindicatorstop() {
    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeOut(300);
    jQuery('body').css('cursor', 'default');
}

//join list ids, names
function joinObj(arr, attr) {
    var out = [];
    for (var i = 0; i < arr.length; i++) {
        out.push(arr[i][attr]);
    }
    return out.join("; ");
}
//autocomplete email (cuongph)
function autocomplete(obj) {
    var availableTags = [
        "@gmail.com", "@yahoo.com", "@outlook.com", "@icloud.com", "@protonmail.com", "@hotmail.com",
        "@mail.com", "@aol.com", "@yandex.ru", "@zylker.com", "@gmx.com", "@aim.com"
        //"@uef.edu.vn", "@fpt.net", "@windsorplazahotel.com", "@cqs_tech.com.tw",
        //"@vnn.vn", "@pvu.edu.vn", "@cp.com.vn", "@scg.co.th"
    ];
    var list = [];
    var text = obj.value;
    if (text.indexOf("@") == text.length - 1)
        text = text.replace("@", "");
    var index = text.indexOf("@");
    if (text && text.length > 0 && (index < 0 || index == text.length - 1)) {
        for (var i = 0; i < availableTags.length; i++) {
            list.push(text + availableTags[i]);
        }
        emailAutocomplete = $(obj).autocomplete({
            source: list
        });
    }
}

function GetAlertText(iTotal, obj, sMessCode) {
    var i;
    for (i = 0; i <= iTotal; i++) {
        if (obj[0][i] == sMessCode) {
            return obj[1][i];
            break;
        }
    }
}

var strToastTitle = 'Thông báo - Alert';
function ToastrError(iTotal, obj, sMess) {
    var i;
    for (i = 0; i <= iTotal; i++) {
        if (obj[0][i] == sMess) {
            snMsg = obj[1][i];
            toastr.error(snMsg, strToastTitle);
            return false;
        }
    }
    return false;
}
function ToastrInfo(iTotal, obj, sMess) {
    var i;
    for (i = 0; i <= iTotal; i++) {
        if (obj[0][i] == sMess) {
            snMsg = obj[1][i];
            toastr.info(snMsg, strToastTitle);
            return false;
        }
    }
    return false;
}
function ToastrSuccess(iTotal, obj, sMess) {
    var i;
    for (i = 0; i <= iTotal; i++) {
        if (obj[0][i] == sMess) {
            snMsg = obj[1][i];
            toastr.success(snMsg, strToastTitle);
            return false;
        }
    }
    return false;
}
function ToastrWarning(iTotal, obj, sMess) {
    var i;
    for (i = 0; i <= iTotal; i++) {
        if (obj[0][i] == sMess) {
            snMsg = obj[1][i];
            toastr.warning(snMsg, strToastTitle);
            return false;
        }
    }
    return false;
}
var AccND = {
    configs: {
        pageSize: 25,
        pageIndex: 1,
        baseApi: '/api',
        accApiKey: 'Bearer CkbE4uMLfCj66I0mkMdXMA=='
    },
    unflattern: function (arr) {
        var tree = [],
            mappedArr = {},
            arrElem,
            mappedElem;

        // First map the nodes of the array to an object -> create a hash table.
        for (var i = 0, len = arr.length; i < len; i++) {
            arrElem = arr[i];
            mappedArr[arrElem.id] = arrElem;
            mappedArr[arrElem.id]['children'] = [];
        }
        for (var id in mappedArr) {
            if (mappedArr.hasOwnProperty(id)) {
                mappedElem = mappedArr[id];
                // If the element is not at the root level, add it to its parent array of children.
                if (mappedElem.parentid) {
                    mappedArr[mappedElem['parentid']]['children'].push(mappedElem);
                }
                // If the element is at the root level, add it to first level elements array.
                else {
                    tree.push(mappedElem);
                }
            }
        }
        return tree;
    },
    confirm: function (message, okCallback) {
        bootbox.confirm({
            message: message,
            buttons: {
                confirm: {
                    label: 'Đồng ý',
                    className: "btn-success btn-sm",
                },
                cancel: {
                    label: 'Hủy',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result === true) {
                    okCallback();
                }
            }
        });
    }
}

function initComboTree(cboTreeId, pUrl, pRequired, pPanelHeight) {
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            var data = [];
            $.each(response, function (i, item) {
                data.push({
                    id: item.Id,
                    text: item.NameCompare,
                    parentid: item.ParentId,
                    isparent: item.IsParent,
                    name: item.Name,
                    balancetype: item.BalanceType
                });
            });
            var arr = AccND.unflattern(data);
            $('#' + cboTreeId).combotree({
                data: arr,
                required: pRequired,
                PanelHeight: pPanelHeight,
                icons: [{
                    iconCls: 'icon-clear',
                    handler: function (e) {
                        $(e.data.target).combotree('clear');
                    }
                }],
                onBeforeSelect: function (node) {
                    if (node.isparent) {
                        return false;
                    }
                    return true;
                },
                validType: 'validCombotree["' + "#" + cboTreeId + '"]'
            });
        }
    });
}

//datnt combotree cho chọn nhiều giá trị
function initComboTreeMultiSelect(cboTreeId, pUrl, pRequired, pPanelHeight) {
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            var data = [];
            $.each(response, function (i, item) {
                data.push({
                    id: item.Id,
                    text: item.NameCompare,
                    parentid: item.ParentId,
                    isparent: item.IsParent,
                    name: item.Name,
                    balancetype: item.BalanceType
                });
            });
            var arr = AccND.unflattern(data);
            $('#' + cboTreeId).combotree({
                data: arr,
                required: pRequired,
                PanelHeight: pPanelHeight,
                icons: [{
                    iconCls: 'icon-clear',
                    handler: function (e) {
                        $(e.data.target).combotree('clear');
                    }
                }],
                onBeforeSelect: function (node) {
                    if (node.isparent) {
                        return false;
                    }
                    return true;
                },
                //validType: 'validCombotree["' + "#" + cboTreeId + '"]'
            });
        }
    });
}

//init combobox chung cho hệ thống
function initComboBox(cboBoxId, pUrl, pRequired, pPanelHeight, pDefaultValue) {
    $.get(pUrl, function (response) {
        if (response.length > 0) {
            $('#' + cboBoxId).combobox({
                data: response,
                required: pRequired,
                panelHeight: pPanelHeight,
                valueField: 'Id',
                textField: 'NameCompare',
                icons: [{
                    iconCls: 'icon-clear',
                    handler: function (e) {
                        $(e.data.target).combobox('clear');
                    }
                }],
                onLoadSuccess: function () {
                    $('#' + cboBoxId).combobox('setValue', pDefaultValue);
                },
                validType: 'inList["' + "#" + cboBoxId + '"]'
            });
        }
    });
}
function initComboBox_Currency(cboBoxId, pUrl, pRequired, pPanelHeight, pDefaultValue, txtExchangeRateValue) {
    $.get(pUrl, function (response) {
        if (response.length > 0) {
            $('#' + cboBoxId).combobox({
                data: response,
                required: pRequired,
                panelHeight: pPanelHeight,
                valueField: 'Id',
                textField: 'NameCompare',
                icons: [{
                    iconCls: 'icon-clear',
                    handler: function (e) {
                        $(e.data.target).combobox('clear');
                    }
                }],
                onLoadSuccess: function () {
                    $('#' + cboBoxId).combobox('setValue', pDefaultValue);
                },
                onSelect: function (record) {
                    if (record) {
                        if (txtExchangeRateValue != '') {
                            $("#" + txtExchangeRateValue + "").val(record.DefaultValue);
                        }
                    }
                },
                onUnselect: function () {
                    if (txtExchangeRateValue != '') {
                        $("#" + txtExchangeRateValue + "").val('');
                    }
                },
                validType: 'inList["' + "#" + cboBoxId + '"]'
            });
        }
    });
}
function initComboBox_DefaultAccount(cboBoxId, pUrl, pRequired, pPanelHeight, pDefaultValue, cboDefaultAccountID) {
    $.get(pUrl, function (response) {
        if (response.length > 0) {
            $('#' + cboBoxId).combobox({
                data: response,
                required: pRequired,
                panelHeight: pPanelHeight,
                valueField: 'Id',
                textField: 'NameCompare',
                onLoadSuccess: function () {
                    $('#' + cboBoxId).combobox('setValue', pDefaultValue);
                },
                onSelect: function (record) {
                    if (record) {
                        if (cboDefaultAccountID != '') {
                            $("#" + cboDefaultAccountID + "").combotree('setValue', record.DefaultAccountID);
                        }
                    }
                },
                onUnselect: function () {
                    if (cboDefaultAccountID != '') {
                        $("#" + cboDefaultAccountID + "").combotree('setValue', '');
                    }
                },
                validType: 'inList["' + "#" + cboBoxId + '"]'
            });
        }
    });
}

//autocomplex master
function InitAutoCompletex_Master(routes, title, pMinLength, txtLookupSearch, txtLookupSearchID, txtLookupSearchName, txtLookupSearchOther1, txtLookupSearchOther2) {
    $("#" + txtLookupSearch + "").combobox({
        label: title + ' (*)',
        loader: function (param, success, error) {
            var urlAuto = AccND.configs.baseApi + "/Common/autocomplex/" + routes + "?prefix=";
            var pQuery = param.q || '';
            if (pQuery.length <= pMinLength) { return false }
            $.ajax({
                type: "GET",
                url: urlAuto + pQuery.toLowerCase(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.length > 0) {
                        var items = $.map(data, function (item, index) {
                            return {
                                id: item.Id,
                                name: item.NameCompare,
                                other1: item.Other1,
                                other2: item.Other2,
                                other3: item.Other3
                            };
                        });
                        success(items);
                    }
                },
                error: function () {
                    error.apply(this, arguments);
                }
            });
        },
        onSelect: function (record) {
            if (record) {
                $("#" + txtLookupSearchID + "").val(record.id);
                $("#" + txtLookupSearchName + "").val(record.name);
                $("#" + txtLookupSearchOther1 + "").val(record.other1);
                $("#" + txtLookupSearchOther2 + "").val(record.other2);
            }
        },
        onUnselect: function () {
            $("#" + txtLookupSearchID + "").val('');
            $("#" + txtLookupSearchName + "").val('');
            $("#" + txtLookupSearchOther1 + "").val('');
            $("#" + txtLookupSearchOther2 + "").val('');
        },
        validType: 'inList["' + "#" + txtLookupSearch + '"]'
    });
}

//validate ID không gõ dấu
function isValidID(validChars) { //truyền chuỗi regex vào
    //var validChars = /[A-Za-z0-9]/;
    var keyChar = String.fromCharCode(event.which || event.keyCode);
    return (validChars.test(keyChar) ? keyChar : false);
}

// CuongTQ
function InitAutoCompletexCombo(routes, title, pMinLength, txtLookupSearch, txtLookupSearchID, txtLookupSearchName, txtLookupSearchOther1, txtLookupSearchOther2, pRequired, pDefaultValue, pDefaultText) {
    $("#" + txtLookupSearch + "").combobox({
        label: title ? (title + ' (*)') : "",
        required: pRequired,
        loader: function (param, success, error) {
            //console.log(param, pDefaultValue, param.q)
            if (param.q === undefined && pDefaultValue && pDefaultValue !== "") {
                $("[id$=" + txtLookupSearch + "]").combobox("setValue", pDefaultValue);
                $("[id$=" + txtLookupSearch + "]").combobox("setText", pDefaultText);
            }
            var urlAuto = AccND.configs.baseApi + "/Common/autocomplex/" + routes + "?prefix=";
            var pQuery = param.q || pDefaultValue || '';
            if (pQuery.length <= pMinLength) { return false }
            $.ajax({
                type: "GET",
                url: urlAuto + pQuery.toLowerCase(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    var items = $.map(data, function (item, index) {
                        return {
                            id: item.Id,
                            name: item.NameCompare,
                            other1: item.Other1,
                            other2: item.Other2,
                            other3: item.Other3
                        };
                    });
                    success(items);
                },
                error: function () {
                    error.apply(this, arguments);
                }
            });
        },
        icons: [{
            iconCls: 'icon-clear',
            handler: function (e) {
                $(e.data.target).combobox('clear');
            }
        }],
        onSelect: function (record) {
            if (record) {
                $("[id$=" + txtLookupSearchID + "]").val(record.id);
                $("[id$=" + txtLookupSearchName + "]").val(record.name);
                $("[id$=" + txtLookupSearchOther1 + "]").val(record.other1);
                $("[id$=" + txtLookupSearchOther2 + "]").val(record.other2);
            }
        },
        onUnselect: function () {
            $("[id$=" + txtLookupSearchID + "]").val('');
            $("[id$=" + txtLookupSearchName + "]").val('');
            $("[id$=" + txtLookupSearchOther1 + "]").val('');
            $("[id$=" + txtLookupSearchOther2 + "]").val('');
        },
        validType: 'inList["' + "#" + txtLookupSearch + '"]'
    });
}

function initBindingGirdComboTree(pUrl) {
    var arr = [];
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            var data = [];
            $.each(response, function (i, item) {
                data.push({
                    id: item.Id,
                    text: item.NameCompare,
                    text1: item.Name,
                    parentid: item.ParentId,
                    isparent: item.IsParent
                });
            });
            arr = AccND.unflattern(data);
        }
    });
    return arr;
}

function initBindingGirdComboTreeDepartment(pUrl) {
    var arr = [];
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            var data = [];
            $.each(response, function (i, item) {
                data.push({
                    id: item.Id,
                    text: item.NameCompare,
                    parentid: item.ParentId,
                    isparent: item.IsParent,
                    AccountIDAssetDefault: item.AccountIDAssetDefault,
                    ExpenseIDAssetDefault: item.ExpenseIDAssetDefault,
                    levelId: item.LevelId
                });
            });
            arr = AccND.unflattern(data);
        }
    });
    return arr;
}

function initBindingGirdComboTreeAccount(pUrl) {
    var arr = [];
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            var data = [];
            $.each(response, function (i, item) {
                data.push({
                    id: item.Id,
                    text: item.NameCompare,
                    parentid: item.ParentId,
                    isparent: item.IsParent,
                    DepartmentDetail: item.DepartmentDetail,
                    ConstructionDetail: item.ConstructionDetail,
                    JobDetail: item.JobDetail,
                    ExpenseDetail: item.ExpenseDetail,
                    PartnerDetail: item.PartnerDetail,
                    CashBookDetail: item.CashBookDetail,
                    BankDetail: item.BankDetail
                });
            });
            arr = AccND.unflattern(data);
        }
    });
    return arr;
}

function initComboTreeAccount(cboTreeId, pUrl, pRequired, pPanelHeight) {
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            var data = [];
            $.each(response, function (i, item) {
                data.push({
                    id: item.Id,
                    text: item.NameCompare,
                    parentid: item.ParentId,
                    isparent: item.IsParent,
                    DepartmentDetail: item.DepartmentDetail,
                    ConstructionDetail: item.ConstructionDetail,
                    JobDetail: item.JobDetail,
                    ExpenseDetail: item.ExpenseDetail
                });
            });
            var arr = AccND.unflattern(data);
            $('#' + cboTreeId).combotree({
                data: arr,
                required: pRequired,
                PanelHeight: pPanelHeight,
                icons: [{
                    iconCls: 'icon-clear',
                    handler: function (e) {
                        $(e.data.target).combotree('clear');
                    }
                }],
                onBeforeSelect: function (node) {
                    if (node.isparent) {
                        return false;
                    }
                    return true;
                }
            });
        }
    });
}

function initComboBoxHardCode(cboBoxId, pData, pRequired, pPanelHeight, pDefaultValue) {
    $('#' + cboBoxId).combobox({
        data: pData,
        required: pRequired,
        panelHeight: pPanelHeight,
        valueField: 'Id',
        textField: 'NameCompare',
        icons: [{
            iconCls: 'icon-clear',
            handler: function (e) {
                $(e.data.target).combobox('clear');
            }
        }],
        onLoadSuccess: function () {
            $('#' + cboBoxId).combobox('setValue', pDefaultValue);
        },
        validType: 'inList["' + "#" + cboBoxId + '"]'
    });
}

function initGetEmployeeIdByAccountLogin(pUrl, accLogin) {
    var str = '';
    $.ajax({
        url: pUrl + "?accountLogin=" + accLogin,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            if (response.Success) {
                str = response.Message;
            }
        }
    });
    return str;
}

// End
// get data combobox inside grid
function initBindingGirdComboBox(pUrl) {
    var arr = [];
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            arr = response;
        },
        error: function (err) {
            debugger
        }
    });
    return arr;
}

//autocomplex master
function InitAutoCompletex_Master_Partner(pMinLength, txtLookupSearch, txtLookupSearchID, txtLookupSearchName, txtLookupSearchOther1, txtLookupSearchOther2, txtLookupSearchOther4, txtLookupSearchOther7, txtLookupSearchOther8, cboDefaultAccountID) {
    $("#" + txtLookupSearch + "").combobox({
        label: 'Chọn đối tượng (*)',
        prompt: 'Vui lòng nhập ít nhất ' + pMinLength + ' ký tự',
        loader: function (param, success, error) {
            var urlAuto = AccND.configs.baseApi + "/Common/autocomplex/partner?prefix=";
            var pQuery = param.q || '';
            if (pQuery.length <= pMinLength) { return false }
            $.ajax({
                type: "GET",
                url: urlAuto + pQuery.toLowerCase(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.length > 0) {
                        var items = $.map(data, function (item, index) {
                            return {
                                id: item.Id,
                                namecompare: item.NameCompare,
                                name: item.Name,
                                defaultaccId: item.DefaultAccountID,
                                other1: item.Other1,
                                other2: item.Other2,
                                other3: item.Other3,
                                other4: item.Other4,
                                other7: item.Other7,
                                other8: item.Other8,
                            };
                        });
                        success(items);
                    }
                },
                error: function () {
                    error.apply(this, arguments);
                }
            });
        },
        onSelect: function (record) {
            if (record) {
                $("#" + txtLookupSearchID + "").val(record.id);
                $("#" + txtLookupSearchName + "").val(record.name);
                $("#" + txtLookupSearchOther1 + "").val(record.other1);
                $("#" + txtLookupSearchOther2 + "").val(record.other2);
                $("#" + txtLookupSearchOther4 + "").val(record.other4);
                $("#" + txtLookupSearchOther7 + "").val(record.other7);
                $("#" + txtLookupSearchOther8 + "").val(record.other8);
                if (cboDefaultAccountID != '') {
                    $("#" + cboDefaultAccountID + "").combotree('setValue', record.defaultaccId);
                }
            }
        },
        onUnselect: function () {
            $("#" + txtLookupSearchID + "").val('');
            $("#" + txtLookupSearchName + "").val('');
            $("#" + txtLookupSearchOther1 + "").val('');
            $("#" + txtLookupSearchOther2 + "").val('');
            $("#" + txtLookupSearchOther4 + "").val('');
            $("#" + txtLookupSearchOther7 + "").val('');
            $("#" + txtLookupSearchOther8 + "").val('');
            if (cboDefaultAccountID != '') {
                $("#" + cboDefaultAccountID + "").combotree('setValue', '');
            }
        },
        validType: 'inList["' + "#" + txtLookupSearch + '"]'
    });
}

function InitAutoCompletex_Master_Partner_Construction(pMinLength, txtLookupSearch, txtLookupSearchID, txtLookupSearchName, txtLookupSearchOther1, txtLookupSearchOther2, txtLookupSearchOther4, txtLookupSearchOther7, txtLookupSearchOther8, txtLookupSearchOther9, cboDefaultAccountID) {
    $("#" + txtLookupSearch + "").combobox({
        label: 'Chọn đối tượng (*)',
        prompt: 'Vui lòng nhập ít nhất ' + pMinLength + ' ký tự',
        loader: function (param, success, error) {
            var urlAuto = AccND.configs.baseApi + "/Common/autocomplex/partnerConstruction?prefix=";
            var pQuery = param.q || '';
            if (pQuery.length <= pMinLength) { return false }
            $.ajax({
                type: "GET",
                url: urlAuto + pQuery.toLowerCase(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    console.log("data", data);
                    if (data.length > 0) {
                        var items = $.map(data, function (item, index) {
                            return {
                                id: item.Id,
                                namecompare: item.NameCompare,
                                name: item.Name,
                                defaultaccId: item.DefaultAccountID,
                                other1: item.Other1,
                                other2: item.Other2,
                                other3: item.Other3,
                                other4: item.Other4,
                                other7: item.Other7,
                                other8: item.Other8
                            };
                        });
                        success(items);
                    }
                },
                error: function () {
                    error.apply(this, arguments);
                }
            });
        },
        onSelect: function (record) {
            if (record) {
                $("#" + txtLookupSearchID + "").val(record.id);
                $("#" + txtLookupSearchName + "").val(record.name);
                $("#" + txtLookupSearchOther1 + "").val(record.other1);
                $("#" + txtLookupSearchOther2 + "").val(record.other2);
                $("#" + txtLookupSearchOther4 + "").val(record.other4);
                $("#" + txtLookupSearchOther7 + "").val(record.other7);
                $("#" + txtLookupSearchOther8 + "").val(record.other8);
                $("#" + txtLookupSearchOther9 + "").val(record.defaultaccId);
                if (cboDefaultAccountID != '') {
                    $("#" + cboDefaultAccountID + "").combotree('setValue', record.defaultaccId);
                }
            }
        },
        onUnselect: function () {
            $("#" + txtLookupSearchID + "").val('');
            $("#" + txtLookupSearchName + "").val('');
            $("#" + txtLookupSearchOther1 + "").val('');
            $("#" + txtLookupSearchOther2 + "").val('');
            $("#" + txtLookupSearchOther4 + "").val('');
            $("#" + txtLookupSearchOther7 + "").val('');
            $("#" + txtLookupSearchOther8 + "").val('');
            $("#" + txtLookupSearchOther9 + "").val('');
            if (cboDefaultAccountID != '') {
                $("#" + cboDefaultAccountID + "").combotree('setValue', '');
            }
        },
        validType: 'inList["' + "#" + txtLookupSearch + '"]'
    });
}

//auto EMP
function InitAutoCompletex_Master_Emp(pMinLength, txtLookupSearch, txtLookupSearchID, txtLookupSearchName, txtLookupSearchOther1, txtLookupSearchOther2, txtLookupSearchOther4) {
    $("#" + txtLookupSearch + "").combobox({
        label: 'Chọn đối tượng (*)',
        prompt: 'Vui lòng nhập ít nhất ' + pMinLength + ' ký tự',
        loader: function (param, success, error) {
            var urlAuto = AccND.configs.baseApi + "/Common/autocomplex/empactive?prefix=";
            var pQuery = param.q || '';
            if (pQuery.length <= pMinLength) { return false }
            $.ajax({
                type: "GET",
                url: urlAuto + pQuery.toLowerCase(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.length > 0) {
                        var items = $.map(data, function (item, index) {
                            return {
                                id: item.Id,
                                namecompare: item.NameCompare,
                                name: item.Name,
                                other1: item.Other1,
                                other2: item.Other2,
                                other3: item.Other3,
                                other4: item.Other4
                            };
                        });
                        success(items);
                    }
                },
                error: function () {
                    error.apply(this, arguments);
                }
            });
        },
        onSelect: function (record) {
            if (record) {
                $("#" + txtLookupSearchID + "").val(record.id);
                $("#" + txtLookupSearchName + "").val(record.name);
                $("#" + txtLookupSearchOther1 + "").val(record.other1);
                $("#" + txtLookupSearchOther2 + "").val(record.other2);
                $("#" + txtLookupSearchOther4 + "").val(record.other4);
            }
        },
        onUnselect: function () {
            $("#" + txtLookupSearchID + "").val('');
            $("#" + txtLookupSearchName + "").val('');
            $("#" + txtLookupSearchOther1 + "").val('');
            $("#" + txtLookupSearchOther2 + "").val('');
            $("#" + txtLookupSearchOther4 + "").val('');
        },
        validType: 'inList["' + "#" + txtLookupSearch + '"]'
    });
}

//autocomplete Partner in DataGrid
var loaderAutocompletePartnerInGrid = function (param, success, error) {
    var urlAuto = AccND.configs.baseApi + "/Common/autocomplex/partner?prefix=";
    var pQuery = param.q || '';
    if (pQuery.length <= 2) { return false }
    $.ajax({
        type: "GET",
        url: urlAuto + pQuery.toLowerCase(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.length > 0) {
                var items = $.map(data, function (item, index) {
                    return {
                        id: item.Id,
                        namecompare: item.NameCompare,
                        name: item.Name,
                        defaultaccId: item.DefaultAccountID,
                        other1: item.Other1,
                        other2: item.Other2,
                        other3: item.Other3,
                        other4: item.Other4
                    };
                });
                success(items);
            }
        },
        error: function () {
            error.apply(this, arguments);
        }
    });
}

//
function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

// PhuLV: Convert data to combo tree data
function convertToCombotreeData(dataObj) {
    var arr = [];

    var data = [];
    $.each(dataObj, function (i, item) {
        data.push({
            id: item.Id,
            text: item.NameCompare,
            parentid: item.ParentId,
            isparent: item.IsParent
        });
    });
    arr = AccND.unflattern(data);

    return arr;
}

function convertToCombotreeAccountData(dataObj) {
    var arr = [];

    var data = [];
    $.each(dataObj, function (i, item) {
        data.push({
            id: item.Id,
            text: item.NameCompare,
            parentid: item.ParentId,
            isparent: item.IsParent,
            DepartmentDetail: item.DepartmentDetail,
            ConstructionDetail: item.ConstructionDetail,
            JobDetail: item.JobDetail,
            ExpenseDetail: item.ExpenseDetail
        });
    });
    arr = AccND.unflattern(data);

    return arr;
}

function getDataFromApiSync(pUrl) {
    var arr = [];
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            arr = response;
        }
    });
    return arr;
}

function getDataFromApiSyncParams(pUrl, params) {
    var arr = [];
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        data: params,
        async: false,
        success: function (response) {
            arr = response;
        }
    });
    return arr;
}

function getDataFromApiKeySyncParams(pUrl, params) {
    var arr = [];
    $.ajax({
        url: pUrl,
        headers: { 'api-key': AccND.configs.accApiKey },
        type: 'GET',
        dataType: 'json',
        data: params,
        async: false,
        success: function (response) {
            arr = response;
        }
    });
    return arr;
}

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

//hunglt đọc số thành chữ
function ACCToString(number) {
    var s = number.toString();
    var numberWords = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
    var layer = ["", "nghìn", "triệu", "tỷ"];

    var i, j, unit, dozen, hundred;
    var str = " ";
    var booAm = false;
    var decS = 0;
    try {
        decS = parseFloat(s);
    }
    catch
    {
    }
    if (decS < 0) {
        decS = -decS;
        s = decS.toString();
        booAm = true;
    }
    i = s.length;
    if (i == 0)
        str = numberWords[0] + str;
    else {
        j = 0;
        while (i > 0) {
            unit = parseInt(s.substr(i - 1, 1));
            i--;
            if (i > 0)
                dozen = parseInt(s.substr(i - 1, 1));
            else
                dozen = -1;
            i--;
            if (i > 0)
                hundred = parseInt(s.substr(i - 1, 1));
            else
                hundred = -1;
            i--;
            if ((unit > 0) || (dozen > 0) || (hundred > 0) || (j == 3))
                str = layer[j] + str;
            j++;
            if (j > 3) j = 1;
            if ((unit == 1) && (dozen > 1))
                str = "một " + str;
            else {
                if ((unit == 5) && (dozen > 0))
                    str = "lăm " + str;
                else if (unit > 0)
                    str = numberWords[unit] + " " + str;
            }
            if (dozen < 0)
                break;
            else {
                if ((dozen == 0) && (unit > 0)) str = "lẻ " + str;
                if (dozen == 1) str = "mười " + str;
                if (dozen > 1) str = numberWords[dozen] + " mươi " + str;
            }
            if (hundred < 0) break;
            else {
                if ((hundred > 0) || (dozen > 0) || (unit > 0)) str = numberWords[hundred] + " trăm " + str;
            }
            str = " " + str;
        }
    }
    if (booAm) str = "Âm " + str;
    return str + "đồng chẵn";
}

//combotree cho chọn node cha
function initComboTreeSelectParent(cboTreeId, pUrl, pRequired, pPanelHeight) {
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            var data = [];
            $.each(response, function (i, item) {
                data.push({
                    id: item.Id,
                    text: item.NameCompare,
                    parentid: item.ParentId,
                    isparent: item.IsParent,
                    name: item.Name,
                    balancetype: item.BalanceType,
                    start_date: item.StartDate,
                    end_date: item.EndDate
                });
            });
            var arr = AccND.unflattern(data);
            $('#' + cboTreeId).combotree({
                data: arr,
                required: pRequired,
                PanelHeight: pPanelHeight,
                icons: [{
                    iconCls: 'icon-clear',
                    handler: function (e) {
                        $(e.data.target).combotree('clear');
                    }
                }],
                validType: 'validCombotreeSelectParent["' + "#" + cboTreeId + '"]'
            });
        }
    });
}

//hoangnv methor show popup transaction 
function ShowInsertAndShowDetailInTransaction(transactionID, rowKey, isInsert, tranDate) {
    var
        //ASSET
        A01 = '',
        A02 = '/EMPageEntry.aspx?ModuleID=ACCA&ParentID=9143&Ascx=MdlACCA/Form/ACCA_frmAssetChange.ascx&FunctionID=9135',
        A03 = '/EMPageEntry.aspx?ModuleID=ACCA&ParentID=9143&Ascx=MdlACCA/Form/ACCA_frmAssetInventory.ascx&FunctionID=9220',
        BTL = '/EMPageEntry.aspx?ModuleID=ACCA&ParentID=9143&Ascx=MdlACCA/Form/ACCA_frmVoucherAssetLiquidationEntry.ascx&FunctionID=9374',
        //PURCHASE
        P01 = '/EMPageEntry.aspx?ModuleID=ACCP&ParentID=9068&Ascx=MdlACCP/Form/ACCP_frmPurchaseEntry.ascx&FunctionID=9072',
        P02 = '',
        PC01 = 'EMPageEntry.aspx?ModuleID=ACCP&ParentID=9189&Ascx=MdlACCP/Form/ACCP_frmPurchaseContractEntry.ascx&FunctionID=9208';
        R01 = '/EMPageEntry.aspx?ModuleID=ACCP&ParentID=9068&Ascx=MdlACCP/Form/ACCP_frmAppointItem.ascx&FunctionID=9138',
        R02 = '/EMPageEntry.aspx?ModuleID=ACCP&ParentID=9189&Ascx=MdlACCP/Form/ACCP_frmPurchaseProposalToDepartmentPurchase.ascx&FunctionID=9315',
        O01 = '/EMPageEntry.aspx?ModuleID=ACCP&ParentID=9068&Ascx=MdlACCP/Form/ACCP_frmPurchaseOrderEntry.ascx&FunctionID=9168',
        //SALE
        S01 = '/EMPageEntry.aspx?ModuleID=ACCS&ParentID=9041&Ascx=MdlACCS/Form/ACCS_frmSaleEntry.ascx&FunctionID=9090',
        S02 = '',
        //VOUCHER
        V01 = '/EMPageEntry.aspx?ModuleID=ACCE&ParentID=9058&Ascx=MdlACCE/Form/ACCE_frmVoucherEntry.ascx&FunctionID=9066',
        V02 = '/EMPageEntry.aspx?ModuleID=ACCE&ParentID=9058&Ascx=MdlACCE/Form/ACCE_frmVoucherPayslipEntry.ascx&FunctionID=9078',
        V03 = '/EMPageEntry.aspx?ModuleID=ACCE&ParentID=9058&Ascx=MdlACCE/Form/ACCE_frmVoucherBankAccountEntry.ascx&FunctionID=9076',
        V04 = '/EMPageEntry.aspx?ModuleID=ACCE&ParentID=9058&Ascx=MdlACCE/Form/ACCE_frmVoucherPayslipBankAccountEntry.ascx&FunctionID=9080',
        V05 = '/EMPageEntry.aspx?ModuleID=ACCE&ParentID=9058&Ascx=MdlACCE/Form/ACCE_frmTransferMoneyToBank.ascx&FunctionID=9126',
        PR01 = '/EMPageEntry.aspx?ModuleID=ACCE&ParentID=9058&Ascx=MdlACCE/Form/ACCE_frmPaymentRequest.ascx&FunctionID=9184',
        PR_CFO = '/EMPageEntry.aspx?ModuleID=ACCE&ParentID=9058&Ascx=MdlACCE/Form/ACCE_frmPaymentRequestCFO.ascx&FunctionID=9298',
        PR_CEO = '/EMPageEntry.aspx?ModuleID=ACCE&ParentID=9058&Ascx=MdlACCE/Form/ACCE_frmPaymentRequestCEO.ascx&FunctionID=9299',
        PR_PKT = '/EMPageEntry.aspx?ModuleID=ACCE&ParentID=9058&Ascx=MdlACCE/Form/ACCE_frmPaymentRequestPKT.ascx&FunctionID=9300',
        PR_LKHC = '/EMPageEntry.aspx?ModuleID=ACCE&ParentID=9058&Ascx=MdlACCE/Form/ACCE_frmPaymentRequestLKHC.ascx&FunctionID=9301',
        //GENERAL
        V06 = '/EMPageEntry.aspx?ModuleID=ACCT&ParentID=9058&Ascx=MdlACCT/Form/ACCT_frmVoucherGeneralAccountingEntry.ascx&FunctionID=9085',
        //WAREHOUSE
        W01 = '/EMPageEntry.aspx?ModuleID=ACCW&ParentID=9069&Ascx=MdlACCW/Form/ACCW_frmInputWarehouseTransaction.ascx&FunctionID=9127',
        W02 = '/EMPageEntry.aspx?ModuleID=ACCW&ParentID=9069&Ascx=MdlACCW/Form/ACCW_frmOutputWarehouseTransaction.ascx&FunctionID=9118',
        W03 = '/EMPageEntry.aspx?ModuleID=ACCW&ParentID=9069&Ascx=MdlACCW/Form/ACCW_frmWarehouseTransfer.ascx&FunctionID=9075',
        W04 = '/EMPageEntry.aspx?ModuleID=ACCW&ParentID=9069&Ascx=MdlACCW/Form/ACCW_frmUsingInventoryDelivery.ascx&FunctionID=9156',
        W05 = '',
        W06 = '',
        W090 = '',
        //
        W03Approve = '/EMPageEntry.aspx?ModuleID=ACCW&ParentID=9069&Ascx=MdlACCW/Form/ACCW_frmApproveTransfer.ascx&FunctionID=9101',
        W03Approve1 = '/EMPageEntry.aspx?ModuleID=ACCW&ParentID=9069&Ascx=MdlACCW/Form/ACCW_frmApproveTransferInventory.ascx&FunctionID=9214',
        //GENERAL
        L01 = '/EMPageEntry.aspx?ModuleID=HRM&ParentID=9193&Ascx=MdlHRM/Form/HRM_frmVoucherSalaryAccountingEntry.ascx&FunctionID=9335';

    var CX02 = '/EMPageEntry.aspx?ModuleID=CTT&ParentID=9251&Ascx=MdlCTT/Form/CTT_frmInputWarehouseConstruction.ascx&FunctionID=9278';
    var CX01 = '/EMPageEntry.aspx?ModuleID=CTT&ParentID=9251&Ascx=MdlCTT/Form/CTT_frmOutputWarehouseConstruction.ascx&FunctionID=9284';
    var CX03 = '/EMPageEntry.aspx?ModuleID=CTT&ParentID=9251&Ascx=MdlCTT/Form/CTT_frmWarehouseTransferConstruction.ascx&FunctionID=9288';
    var CX03Approve = '/EMPageEntry.aspx?ModuleID=CTT&ParentID=9251&Ascx=MdlCTT/Form/CTT_frmApproveTransferConstruction.ascx&FunctionID=9297';
    var CM01 = '/EMPageEntry.aspx?ModuleID=CTT&ParentID=9319&Ascx=MdlCTT/Form/CTT_frmOrderConstructionMaterialsEntry.ascx&FunctionID=9340';

    switch (transactionID) {
        case 'A01':
            GetTractionUrl(A01, rowKey, isInsert, tranDate); break;
        case 'A02':
            GetTractionUrl(A02, rowKey, isInsert, tranDate); break;
        case 'A03':
            GetTractionUrl(A03, rowKey, isInsert, tranDate); break;
        case 'BTL':
            GetTractionUrl(BTL, rowKey, isInsert, tranDate); break;
        case 'P01':
            GetTractionPurchaseUrl(P01, rowKey, isInsert, tranDate); break;
        case 'P02':
            GetTractionPurchaseUrl(P02, rowKey, isInsert, tranDate); break;
        case 'PC01':
            GetTractionPurchaseUrl(PC01, rowKey, isInsert, tranDate); break;
        case 'R01':
            GetTractionPurchaseUrl(R01, rowKey, isInsert, tranDate); break;
        case 'R02':
            GetTractionPurchaseUrl(R02, rowKey, isInsert, tranDate); break;
        case 'O01':
            GetTractionPurchaseUrl(O01, rowKey, isInsert, tranDate); break;
        case 'S01':
            GetTractionSaleUrl(S01, rowKey, isInsert, tranDate); break;
        case 'S02':
            GetTractionSaleUrl(S02, rowKey, isInsert, tranDate); break;
        case 'V01':
            GetTractionUrl(V01, rowKey, isInsert, tranDate); break;
        case 'V02':
            GetTractionUrl(V02, rowKey, isInsert, tranDate); break;
        case 'V03':
            GetTractionUrl(V03, rowKey, isInsert, tranDate); break;
        case 'V04':
            GetTractionUrl(V04, rowKey, isInsert, tranDate); break;
        case 'V05':
            GetTractionUrl(V05, rowKey, isInsert, tranDate); break;
        case 'V06':
            GetTractionUrl(V06, rowKey, isInsert, tranDate); break;
        case 'W01':
            GetTractionUrl(W01, rowKey, isInsert, tranDate); break;
        case 'W02':
            GetTractionUrl(W02, rowKey, isInsert, tranDate); break;
        case 'W03':
            GetTractionUrl(W03, rowKey, isInsert, tranDate); break;
        case 'W04':
            GetTractionUrl(W04, rowKey, isInsert, tranDate); break;
        case 'W05':
            GetTractionUrl(W05, rowKey, isInsert, tranDate); break;
        case 'W06':
            GetTractionUrl(W06, rowKey, isInsert, tranDate); break;
        case 'W090':
            GetTractionUrl(W090, rowKey, isInsert, tranDate); break;
        case 'W03Approve':
            GetTractionUrl(W03Approve, rowKey, isInsert, tranDate); break;
        case 'W03Approve1':
            GetTractionUrl(W03Approve1, rowKey, isInsert, tranDate); break;
        case 'PR01':
            GetTractionUrl(PR01, rowKey, isInsert, tranDate); break;
        case 'PR_CFO':
            GetTractionUrl(PR_CFO, rowKey, isInsert, tranDate); break;
        case 'PR_CEO':
            GetTractionUrl(PR_CEO, rowKey, isInsert, tranDate); break;
        case 'PR_PKT':
            GetTractionUrl(PR_PKT, rowKey, isInsert, tranDate); break;
        case 'PR_LKHC':
            GetTractionUrl(PR_LKHC, rowKey, isInsert, tranDate); break;
        case 'CX02':
            GetTractionUrl(CX02, rowKey, isInsert, tranDate); break;
        case 'CX01':
            GetTractionUrl(CX01, rowKey, isInsert, tranDate); break;
        case 'CX03':
            GetTractionUrl(CX03, rowKey, isInsert, tranDate); break;
        case 'CX03Approve':
            GetTractionUrl(CX03Approve, rowKey, isInsert, tranDate); break;
        case 'CM01':
            GetTractionUrl(CM01, rowKey, isInsert, tranDate); break;
        case 'L01':
            GetTractionUrl(L01, rowKey, isInsert, tranDate); break;
    }
}

//hoangnv methor child show popup transaction 
function GetTractionUrl(transactionUrl, rowKey, isInsert, tranDate) {
    if (!isInsert)
        transactionUrl = transactionUrl + '&rowKey=' + rowKey + '&TranDate=' + tranDate;
    openUserControlHtml(transactionUrl, 1050, 630);
}

//hoangnv methor child show popup transaction Purchase
function GetTractionPurchaseUrl(transactionUrl, rowKey, isInsert, tranDate) {
    if (!isInsert)
        transactionUrl = transactionUrl + '&PurchaseId=' + rowKey + '&TranDate=' + tranDate;
    openUserControlHtml(transactionUrl, 1050, 630);
}

//hoangnv methor child show popup transaction Sale
function GetTractionSaleUrl(transactionUrl, rowKey, isInsert, tranDate) {
    if (!isInsert)
        transactionUrl = transactionUrl + '&SaleId=' + rowKey + '&TranDate=' + tranDate;
    openUserControlHtml(transactionUrl, 1050, 630);
}

//hunglt add cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//hunglt end cookie

// PhuLV: autocomplete item
function InitAutoCompleteItem(pMinLength, txtItemNameSearch, txtItemID, txtItemName, txtMainUnitID, cboUnit) {
    $("[id$=" + txtItemNameSearch + "]").combobox({
        label: 'Chọn vật tư (*)',
        prompt: 'Nhập ít nhất ' + pMinLength + ' ký tự',
        loader: function (param, success, error) {
            var urlAuto = AccND.configs.baseApi + '/ACCI/UnitConvert/item?searchName=';
            var pQuery = param.q || '';
            if (pQuery.length < pMinLength) {
                return false;
            }
            $.ajax({
                type: "GET",
                url: urlAuto + pQuery.toLowerCase(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.length > 0) {
                        var items = $.map(data, function (item, index) {
                            return {
                                id: item.ItemID,
                                namecompare: item.ItemID + ', ' + item.ItemName,
                                name: item.ItemName,
                                MainUnitID: item.MainUnitID
                            };
                        });
                        success(items);
                    }
                },
                error: function () {
                    error.apply(this, arguments);
                }
            });
        },
        onSelect: function (record) {
            if (record) {
                $("[id$=" + txtItemID + "]").val(record.id);
                $("[id$=" + txtItemName + "]").val(record.name);
                $("[id$=" + txtMainUnitID + "]").val(record.MainUnitID);
                $("[id$=" + cboUnit + "]").prop("disabled", false);
            }
        },
        onUnselect: function () {
            $("[id$=" + txtItemID + "]").val('');
            $("[id$=" + txtItemName + "]").val('');
            $("[id$=" + txtMainUnitID + "]").val('');
            $("[id$=" + cboUnit + "]").val('').change();
            $("[id$=" + cboUnit + "]").prop("disabled", true);
        },
        validType: 'inList["' + "#" + txtItemNameSearch + '"]'
    });
}

// PhuLV
function PL_InitAutocompletePartner(pMinLength, txtValueSearch, txtPartnerID, txtPartnerName, txtPartnerTaxName, txtPartnerAddress, txtPartnerPhone, txtPartnerFax, txtPartnerEmail, txtPartnerTaxNumber, cboDefaultAccountID) {
    $("#" + txtValueSearch + "").combobox({
        label: 'Chọn đối tượng (*)',
        prompt: 'Vui lòng nhập ít nhất ' + pMinLength + ' ký tự',
        loader: function (param, success, error) {
            var urlAuto = AccND.configs.baseApi + "/Common/autocomplex/partner?prefix=";
            var pQuery = param.q || '';
            if (pQuery.length < pMinLength) { return false }
            $.ajax({
                type: "GET",
                url: urlAuto + pQuery.toLowerCase(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.length > 0) {
                        var items = $.map(data, function (item, index) {
                            return {
                                id: item.Id,
                                namecompare: item.NameCompare,
                                partnerName: item.Name,
                                defaultAccountId: item.DefaultAccountID,
                                partnerAddress: item.Other1,
                                partnerTaxNumber: item.Other2,
                                partnerPhone: item.Other3,
                                partnerTaxName: item.Other4,
                                partnerFax: item.Other5,
                                partnerEmail: item.Other6
                            };
                        });
                        success(items);
                    }
                },
                error: function () {
                    error.apply(this, arguments);
                }
            });
        },
        onSelect: function (record) {
            if (record) {
                $("#" + txtPartnerID + "").val(record.id);
                $("#" + txtPartnerName + "").val(record.partnerName);
                $("#" + txtPartnerTaxName + "").val(record.partnerTaxName);
                $("#" + txtPartnerAddress + "").val(record.partnerAddress);
                $("#" + txtPartnerPhone + "").val(record.partnerPhone);
                $("#" + txtPartnerFax + "").val(record.partnerFax);
                $("#" + txtPartnerEmail + "").val(record.partnerEmail);
                $("#" + txtPartnerTaxNumber + "").val(record.partnerTaxNumber);
                if (cboDefaultAccountID != '') {
                    $("#" + cboDefaultAccountID + "").combotree('setValue', record.defaultAccountId);
                }
            }
        },
        onUnselect: function () {
            $("#" + txtPartnerID + "").val('');
            $("#" + txtPartnerName + "").val('');
            $("#" + txtPartnerTaxName + "").val('');
            $("#" + txtPartnerAddress + "").val('');
            $("#" + txtPartnerPhone + "").val('');
            $("#" + txtPartnerFax + "").val('');
            $("#" + txtPartnerEmail + "").val('');
            $("#" + txtPartnerTaxNumber + "").val('');
            if (cboDefaultAccountID != '') {
                $("#" + cboDefaultAccountID + "").combotree('setValue', '');
            }
        },
        validType: 'inList["' + "#" + txtValueSearch + '"]'
    });
}

//DatNT
//---------Convert data JobTile to tree data-----------//
function convertToTreeData(rows) {

    function exists(rows, parent) {
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].JobId == parent) return true;
        }
        return false;
    }

    var nodes = [];
    // get the top level nodes
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (!exists(rows, row.Parent)) {
            nodes.push({
                id: row.JobId,
                text: row.JobId + ' - ' + row.JobName,
                parentid: row.Parent,
                isparent: true
            });
        }
    }

    var toDo = [];
    for (var i = 0; i < nodes.length; i++) {
        toDo.push(nodes[i]);
    }
    while (toDo.length) {
        var node = toDo.shift();    // the parent node
        // get the children nodes
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            if (row.Parent == node.id) {
                var child = { id: row.JobId, text: row.JobId + ' - ' + row.JobName, parentid: row.Parent, isparent: false };
                if (node.children) {
                    node.children.push(child);
                } else {
                    node.children = [child];
                }
                toDo.push(child);
            }
        }
    }
    return nodes;
}

function initBindingGridComboTreeDepartmentLevel1(pUrl) {
    var arr = [];
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            arr = convertRow(response);
        }
    });
    return arr;
}
function initBindingComboTreeDepartmentLevel1(cboTreeId, pUrl, pRequired, pPanelHeight) {
    var arr = [];
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            arr = convertRow(response);

            $('#' + cboTreeId).combotree({
                data: arr,
                required: pRequired,
                PanelHeight: pPanelHeight,
                icons: [{
                    iconCls: 'icon-clear',
                    handler: function (e) {
                        $(e.data.target).combotree('clear');
                    }
                }],
                onBeforeSelect: function (node) {
                    if (node.isparent) {
                        return false;
                    }
                    return true;
                }
            });
        }
    });
    return arr;
}

function initBindingGirdComboTreeJobTitle(pUrl) {
    var arr = [];
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            arr = convertToTreeData(response);
        }
    });
    return arr;
}

function initBindingComboTreeJobTitle(cboTreeId, pUrl, pRequired, pPanelHeight) {
    var arr = [];
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            arr = convertToTreeData(response);

            $('#' + cboTreeId).combotree({
                data: arr,
                required: pRequired,
                PanelHeight: pPanelHeight,
                icons: [{
                    iconCls: 'icon-clear',
                    handler: function (e) {
                        $(e.data.target).combotree('clear');
                    }
                }],
                onBeforeSelect: function (node) {
                    if (node.isparent) {
                        return false;
                    }
                    return true;
                }
            });
        }
    });
    return arr;
}

//init combobox WorkType chung cho hệ thống
function initComboBoxWorkType(cboBoxId, pUrl, pRequired, pPanelHeight, pDefaultValue) {
    $.get(pUrl, function (response) {
        if (response.length > 0) {
            $('#' + cboBoxId).combobox({
                data: response,
                required: pRequired,
                panelHeight: pPanelHeight,
                valueField: 'WorkTypeID',
                textField: 'WorkTypeDescription',
                icons: [{
                    iconCls: 'icon-clear',
                    handler: function (e) {
                        $(e.data.target).combobox('clear');
                    }
                }],
                onLoadSuccess: function () {
                    $('#' + cboBoxId).combobox('setValue', pDefaultValue);
                },
                validType: 'inList["' + "#" + cboBoxId + '"]'
            });
        }
    });
}

function initComboBoxMultipleSelect(cboBoxId, pUrl, pDefaultValue) {
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            if (response != null && response.length > 0) {
                $.each(response,
                    function (i, item) {
                        $('#' + cboBoxId).append($('<option>',
                            {
                                value: item.Id,
                                text: item.NameCompare
                            }));
                    });
                $('#' + cboBoxId).val(pDefaultValue).trigger('change');
            }
        }
    });
}

function SetRequiredControlForm(controlForm) {
    controlForm.style.borderColor = "red";
}

function ResetRequiredControlForm(controlForm) {
    controlForm.style.borderColor = "#D5D5D5";
}

function ValidateControlForm(requiredList) {
    let flag = true;
    if (requiredList.length > 0) {
        for (var i = 0; i < requiredList.length; i++) {
            if (requiredList[i].value.trim() === '') {
                SetRequiredControlForm(requiredList[i]);
                flag = false;
            } else {
                ResetRequiredControlForm(requiredList[i]);
            }
        }
    }
    return flag;
}

function ResetValidateControlForm(requiredList) {
    if (requiredList.length > 0) {
        for (var i = 0; i < requiredList.length; i++) {
            ResetRequiredControlForm(requiredList[i]);
        }
    }
}

function initCheckValue(pUrl) {
    var arr = [];
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            $.each(response, function (i, item) {
                arr.push(item.Id);
            });
        }
    });
    return arr;
}


//hunglt search combotree cho chọn node cha, không bắt valid
function initComboTreeSearchParent(cboTreeId, pUrl, pRequired, pPanelHeight) {
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            var data = [];
            $.each(response, function (i, item) {
                data.push({
                    id: item.Id,
                    text: item.NameCompare,
                    parentid: item.ParentId,
                    isparent: item.IsParent,
                    name: item.Name,
                    balancetype: item.BalanceType
                });
            });
            var arr = AccND.unflattern(data);
            $('#' + cboTreeId).combotree({
                data: arr,
                required: pRequired,
                PanelHeight: pPanelHeight,
                icons: [{
                    iconCls: 'icon-clear',
                    handler: function (e) {
                        $(e.data.target).combotree('clear');
                    }
                }],
            });
        }
    });
}

function FromToDatePickerControl(fromDateId, toDateId) {
    $("[id$=" + fromDateId + "]").datepicker({ format: 'dd/mm/yyyy' });
    $("[id$=" + toDateId + "]").datepicker({ format: 'dd/mm/yyyy' });

    $("[id$=" + fromDateId + "]").datepicker().on('changeDate',
        function (ev) {
            $("[id$=" + toDateId + "]").datepicker('setStartDate', ev.date);
        });

    $("[id$=" + toDateId + "]").datepicker().on('changeDate',
        function (ev) {
            $("[id$=" + fromDateId + "]").datepicker('setEndDate', ev.date);
        });
}

function change_alias(alias) {
    if (alias) {
        var str = alias;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
            " ");
        str = str.replace(/ + /g, " ");
        str = str.trim();
        return str;
    }
    return '';
}

function ParseStrToDate(str) {
    try {
        var mdy = str.split('/');
        return new Date(mdy[2], mdy[1] - 1, mdy[0]);
    } catch (err) {
        return null;
    }
}

function GetDateDiff(first, second) {
    try {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    } catch (err) {
        return 0;
    }
}

function AddDayToDate(date, days) {
    try {
        var endDate = new Date(date);
        endDate.setDate(date.getDate() + days);
        return endDate;
    } catch (err) {
        return null;
    }
}

function getMaxClosingDate(FunctionID, OrganizationID) {
    var minDate = '';
    var objParams = {
        FunctionID: FunctionID,
        OrganizationID: OrganizationID
    }
    $.ajax({
        type: "GET",
        url: AccND.configs.baseApi + '/Common/GetMaxClosingDate',
        dataType: 'json',
        data: objParams,
        async: false,
        success: function (data) {
            if (data.Success === true) {
                minDate = data.Data.ClosingDate;
            }
        },
        error: function () {
            error.apply(this, arguments);
        }
    });
    return minDate;
}

//DatNT viết hoa chữ cái đầu của chuỗi string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//hunglt progress
function showProgressBackPage(strMsg) {
    setTimeout(function () {
        window.close();
    }, 2000);
    $.messager.progress({
        msg: strMsg,
        border: 'thin',
        style: {
            right: '',
            bottom: ''
        }
    });
}
function closeProgressBackPage() {
    $.messager.progress('close');
}

//SANGDEV lấy nhiều giá trị và có button checkall
function initComboTreeMultiSelectAll(cboTreeId, pUrl, pRequired, pPanelHeight) {
    $.ajax({
        url: pUrl,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response) {
            var data = [{
                id: 'all',
                text: 'Tất cả',
                parentid: null,
                isparent: true,
                name: 'Tất cả'
            }];
            $.each(response, function (i, item) {
                data.push({
                    id: item.Id,
                    text: item.NameCompare,
                    parentid: 'all',
                    isparent: item.IsParent,
                    name: item.Name,
                    balancetype: item.BalanceType
                });
            });
            var arr = AccND.unflattern(data);
            $('#' + cboTreeId).combotree({
                data: arr,
                required: pRequired,
                PanelHeight: pPanelHeight,
                icons: [{
                    iconCls: 'icon-clear',
                    handler: function (e) {
                        $(e.data.target).combotree('clear');
                    }
                }],
                onBeforeSelect: function (node) {
                    if (node.isparent) {
                        return false;
                    }
                    return true;
                },
            });
        }
    });
}