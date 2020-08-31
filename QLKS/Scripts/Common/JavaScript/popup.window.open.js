//Js show popup
function openModalHtml_ACC(sWidth, sHeight, sTitle, sPath, sCollapsible, sMinimizable, sMaximizable, sAlign) {
    $('#indexWindow').window({
        width: sWidth,
        height: sHeight,
        modal: true,
        closed: true,
        iconCls: 'icon-changepass',
        title: sTitle,
        collapsible: sCollapsible,
        minimizable: sMinimizable,
        maximizable: sMaximizable,
        bodyCls: 'dv-table',
        extractor: function (data) {
            data = $.fn.panel.defaults.extractor(data);
            return data;
        }
    }).window('open').window('refresh', sPath).window(sAlign);
}

//JS show print html
function openPrintHtml(myURL, title, myWidth, myHeight) {
    var left = (screen.width - myWidth) / 2;
    var top = (screen.height - myHeight) / 4;
    params = 'width=' + myWidth;
    params += ', height=' + myHeight;
    params += ', top=' + top;
    params += ', left=' + left;
    params += ', fullscreen=yes';
    params += ', directories=no';
    params += ', location=no';
    params += ', menubar=no';
    params += ', resizable=no';
    params += ', scrollbars=no';
    params += ', status=no';
    params += ', toolbar=no';

    newwin = window.open(myURL, title, params);
    if (window.focus) {
        newwin.focus();
    }
    setTimeout(function () { newwin.close(); }, 10000);
    return false;
}
//JS show print html preview
function openPrintPreviewHtml(myURL, title, myWidth, myHeight) {
    var left = (screen.width - myWidth) / 2;
    var top = (screen.height - myHeight) / 4;
    params = 'width=' + myWidth;
    params += ', height=' + myHeight;
    params += ', top=' + top;
    params += ', left=' + left;
    params += ', fullscreen=yes';
    params += ', directories=no';
    params += ', location=no';
    params += ', menubar=no';
    params += ', resizable=no';
    params += ', scrollbars=no';
    params += ', status=no';
    params += ', toolbar=no';

    newwin = window.open(myURL, title, params);
    if (window.focus) { newwin.focus() }
    return false;
}
//JS show usercontrol
function openUserControl(idModal, urlUC) {
    $("[id$=indexWindowEntry]").html('');
    $.getJSON(AccND.configs.baseApi + '/Common/usercontrol/get?urlUC=' + urlUC,
        function (data) {
            $("[id$=indexWindowEntry]").html(data);
            $('#' + idModal + '').modal({
                backdrop: 'static',
                keyboard: false
            });
        });
}

function openUserControlHtml(urlUC, width, height) {
    width = width ? width : 1050;
    height = height ? height : 630;
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 6;
    params = 'width=' + width;
    params += ', height=' + screen.height;
    params += ', top=' + top;
    params += ', left=' + left;
    params += ', fullscreen=no';
    params += ', directories=no';
    params += ', location=no';
    params += ', menubar=no';
    params += ', resizable=yes';
    params += ', scrollbars=no';
    params += ', status=no';
    params += ', toolbar=no';
    params += ', copyhistory = no';
    newwin = window.open(urlUC, "Details", params);
    if (window.focus) { newwin.focus() }
    //window.onunload = function () {
    //    if (newwin && !newwin.closed) {
    //        newwin.close();
    //    }
    //};
}

function openUserControlHtmlCustomSize(urlUC, width, height) {
    width = width ? width : 1050;
    height = height ? height : 630;
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 6;
    params = 'width=' + width;
    params += ', height=' + height;
    params += ', top=' + top;
    params += ', left=' + left;
    params += ', fullscreen=no';
    params += ', directories=no';
    params += ', location=no';
    params += ', menubar=no';
    params += ', resizable=yes';
    params += ', scrollbars=no';
    params += ', status=no';
    params += ', toolbar=no';
    params += ', copyhistory = no';
    newwin = window.open(urlUC, "Details", params);
    if (window.focus) { newwin.focus() }
    //window.onunload = function () {
    //    if (newwin && !newwin.closed) {
    //        newwin.close();
    //    }
    //};
}

//CuongTQ
function OpenUrlDetail(rowKey) {
    var sPageURL = window.location.search.substring(1);
    var url = '/EMPageEntry.aspx?' + sPageURL + '&rowKey=' + rowKey;
    //window.open(url, '_self');
    openUserControlHtml(url, 1050, 630);
}

function OpenUrlNew() {
    var sPageURL = window.location.search.substring(1);
    var subIndex = sPageURL.toUpperCase().indexOf('&rowkey'.toUpperCase());
    var url = '/EMPageEntry.aspx?' + (subIndex > -1 ? sPageURL.substring(0, subIndex) : sPageURL);
    //console.log("subIndex", subIndex, "url", url);
    openUserControlHtml(url, 1050, 630);
}
//End

//hunglt show form import dữ liệu
function openUserControlCategoryImport(importfunctionId, categoryId, transactionId) {
    var url = '/EMPageEntry.aspx?ModuleID=ACCT&ParentID=9120&Ascx=MdlACCT/Form/ACCT_frmCategoryImport.ascx&FunctionID=9137&ImportCategoryId=' + categoryId + '&ImportFunctionID=' + importfunctionId + '&ImportTransactionID=' + transactionId;
    openUserControlHtml(url, 1200, 700);
}

//cuongph- Tạo bản sao phiếu
function OpenUrlDetailFromCopy(rowKey) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    //var url = '/EMPageEntry.aspx?' + sPageURL + '&rowKey=' + rowKey;
    const filtered = _.filter(sURLVariables, function (o) {
        return o.toLowerCase().indexOf("rowkey") > -1;
    });
    var temp = (sURLVariables[sURLVariables.length - 1] + sURLVariables[sURLVariables.length - 2]).length;
    var url = '/EMPageEntry.aspx?' + (filtered.length ? sPageURL.substring(0, (sPageURL.length - temp) - 2) : sPageURL) + '&rowKey=' + rowKey;
    //window.open(url, '_self');
    openUserControlHtml(url, 1050, 630);
}

function OpenUrlCopy() {
    var sPageURL = window.location.search.substring(1);
    var rowKey = GetURLParameter("rowKey");
    var sURLVariables = sPageURL.split('&');
    var url = '/EMPageEntry.aspx?' + sPageURL.substring(0, (sPageURL.length - sURLVariables[sURLVariables.length - 1].length) - 1) + '&rowKey=0' + '&tempKey=' + rowKey;
    window.location.href = url;
}
function ShowDetailFromPaymentRequest(rowKey) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    //var url = '/EMPageEntry.aspx?' + sPageURL + '&rowKey=' + rowKey;
    const filtered = _.filter(sURLVariables, function (o) {
        return o.toLowerCase().indexOf("rowkey") > -1;
    });
    var temp = (sURLVariables[sURLVariables.length - 1] + sURLVariables[sURLVariables.length - 2] + sURLVariables[sURLVariables.length - 3]).length;
    var url = '/EMPageEntry.aspx?' + (filtered.length ? sPageURL.substring(0, (sPageURL.length - temp) - 3) : sPageURL) + '&rowKey=' + rowKey;
    //window.open(url, '_self');
    openUserControlHtml(url, 1050, 630);
}