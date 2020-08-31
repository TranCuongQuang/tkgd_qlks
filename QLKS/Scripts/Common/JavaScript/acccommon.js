function convertRow(rows) {
    function exists(rows, parentId) {
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].id == parentId) return true;
        }
        return false;
    }

    var nodes = [];
    // get the top level nodes
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (!exists(rows, row.parentId)) {
            nodes.push({
                id: row.id,
                text: row.text,
                iconCls: row.iconCls,
                parentId: row.parentId,
                checked: row.checked,
                levelID: row.levelID,
                areaid: row.areaid,
                code: row.code
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
            if (row.parentId == node.id) {
                var child = {
                    id: row.id,
                    text: row.text,
                    iconCls: row.iconCls,
                    parentId: row.parentId,
                    checked: row.checked,
                    levelID: row.levelID,
                    areaid: row.areaid,
                    code: row.code
                };
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

function titlename(value, row, index) {
    if (row.titlename) {
        return row.titlename;
    } else {
        return value;
    }
}
function mydateformatter(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y;
}
function mydateparser(s) {
    if (!s) return new Date();
    var ss = (s.split('/'));
    var d = parseInt(ss[0], 10);
    var m = parseInt(ss[1], 10);
    var y = parseInt(ss[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y, m - 1, d);
    } else {
        return new Date();
    }
}
function mydatetimeformatter(date) {
    var y = date.getFullYear(); var h = date.getHours();
    var m = date.getMonth() + 1; var M = date.getMinutes()
    var d = date.getDate(); var s = date.getSeconds();
    return (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y + ' ' + (h < 10 ? ('0' + h) : h) + ':' + (M < 10 ? ('0' + M) : M) + ':' + (s < 10 ? ('0' + s) : s);
}
function mydatetimeparser(s) {
    if (!s) return new Date();
    var s1 = s.split(' ');
    var ss = (s1[0].split('/'));
    var d = parseInt(ss[0], 10);
    var m = parseInt(ss[1], 10);
    var y = parseInt(ss[2], 10);
    var ss1 = (s1[1].split(':'));
    var h = parseInt(ss1[0], 10);
    var M = parseInt(ss1[1], 10);
    var s = parseInt(ss1[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d) && !isNaN(h) && !isNaN(M) && !isNaN(s)) {
        return new Date(y, m - 1, d, h, M, s, 0);
    } else {
        return new Date();
    }
}
function inoutname(value, row, index) {
    if (row.inoutname) {
        return row.inoutname;
    } else {
        return value;
    }
}
function isyesswitch(value, row, index) {
    if (value == "on") {
        return "Có";
    } else {
        return "Không";
    }
}
$.extend($.fn.datagrid.defaults.editors, {
    switchbutton: {
        init: function (container, options) {
            var input = $('<input>').appendTo(container);
            input.switchbutton(options);
            return input;
        },
        getValue: function (target) {
            return $(target).switchbutton('options').checked;
        },
        setValue: function (target, value) {
            $(target).switchbutton(value ? 'check' : 'uncheck');
        },
        resize: function (target, width) {
            $(target).switchbutton('resize', { width: width, height: 22 });
        }
    }
});
function getValidDate(s, e) {
    var ss = (s.split('/'));
    var d = parseInt(ss[0], 10);
    var m = parseInt(ss[1], 10);
    var y = parseInt(ss[2], 10);
    var sd = new Date(y, m - 1, d);
    ss = (e.split('/'));
    d = parseInt(ss[0], 10);
    m = parseInt(ss[1], 10);
    y = parseInt(ss[2], 10);
    var ed = new Date(y, m - 1, d);
    if (sd <= ed) {
        return true
    } else {
        return false
    }
}

$.extend($.fn.validatebox.defaults.rules, {
    greaterThan: {
        validator: function (value, param) {
            return parseInt(value) > parseInt(param[0]);
        },
        message: 'Dữ liệu không hợp lệ.'
    },
    confirmPass: {
        validator: function (value, param) {
            var pass = $(param[0]).passwordbox('getValue');
            return value == pass;
        },
        message: 'Mật khẩu chưa trùng khớp!'
    },
    confirmCapcha: {
        validator: function (value, param) {
            var pass = $(param[0]).textbox('getValue');
            return value == pass;
        },
        message: 'Chưa trùng khớp!'
    },
    inList: {
        validator: function (value, param) {
            var c = $(param[0]);
            var opts = c.combobox('options');
            var data = c.combobox('getData');
            var exists = false;
            for (var i = 0; i < data.length; i++) {
                if (value == data[i][opts.textField]) {
                    exists = true;
                    break;
                }
            }
            return exists;
        },
        message: 'Dữ liệu không hợp lệ.'
    },
    validComboInGrid: {
        validator: function (value, param) {
            var c = $(param[0]);
            var field = param[1]
            var row = c.datagrid('getSelected');
            var index = c.datagrid('getRowIndex', row);
            var edCombo = c.datagrid('getEditor', { index: index, field: field }).target;
            var data = edCombo.combobox('getData')
            var opts = edCombo.combobox('options');
            //console.log("row", row, "index", index, "param", param, 'edDebitDepartmentID', 'data', data, 'opts', opts)
            var exists = false;
            for (var i = 0; i < data.length; i++) {
                if (value == data[i][opts.textField]) {
                    exists = true;
                    break;
                }
            }
            return exists;
        },
        message: 'Dữ liệu không hợp lệ.'
    },
    validCombobox: {
        validator: function (value, param) {
            var c = $(param[0]);
            var data = c.combobox('getData');
            //console.log("row", row, "index", index, "param", param, 'edDebitDepartmentID', 'data', data, 'opts', opts)
            var exists = false;
            for (var i = 0; i < data.length; i++) {
                if (value == data[i]['Name']) {
                    exists = true;
                    break;
                }
            }
            return exists;
        },
        message: 'Dữ liệu không hợp lệ.'
    },
    validCombotree: {
        validator: function (value, param) {
            var c = $(param[0]);
            //var root = c.combotree('tree').tree('getRoots');
            //var root1 = c.combotree('tree').tree('getRoot');
            //var data1 = c.combotree('tree').tree('getData', root1.target);
            var data = c.combotree('tree').tree('getChildren');
            //console.log("children", data)
            var exists = false;
            for (var i = 0; i < data.length; i++) {
                if (value == data[i]['text'] && !data[i]['isparent']) {
                    exists = true;
                    break;
                }
            }
            return exists;
        },
        message: 'Dữ liệu không hợp lệ.'
    },
    validCombotreeSelectParent: {
        validator: function (value, param) {
            var c = $(param[0]);
            //var root = c.combotree('tree').tree('getRoots');
            //var root1 = c.combotree('tree').tree('getRoot');
            //var data1 = c.combotree('tree').tree('getData', root1.target);
            var data = c.combotree('tree').tree('getChildren');
            //console.log("children", data)
            var exists = false;
            for (var i = 0; i < data.length; i++) {
                if (value == data[i]['text']) {
                    exists = true;
                    break;
                }
            }
            return exists;
        },
        message: 'Dữ liệu không hợp lệ.'
    },
    validCombotreeInGrid: {
        validator: function (value, param) {
            var c = $(param[0]);
            var field = param[1];
            var row = c.datagrid('getSelected');
            var index = c.datagrid('getRowIndex', row);
            var edCombo = c.datagrid('getEditor', { index: index, field: field }).target;
            //console.log("row", row, "index", index, "param", param)
            var data = edCombo.combotree('tree').tree('getChildren');
            //console.log("children", data)
            var exists = false;
            for (var i = 0; i < data.length; i++) {
                if ((value == data[i]['text'] || value == data[i]['id']) && !data[i]['isparent']) {
                    exists = true;
                    break;
                }
            }
            return exists;
        },
        message: 'Dữ liệu không hợp lệ.'
    },
    validCombotreeSelectParentInGrid: {
        validator: function (value, param) {
            var c = $(param[0]);
            var field = param[1]
            var row = c.datagrid('getSelected');
            var index = c.datagrid('getRowIndex', row);
            var edCombo = c.datagrid('getEditor', { index: index, field: field }).target;
            //console.log("row", row, "index", index, "param", param)
            var data = edCombo.combotree('tree').tree('getChildren');
            //console.log("children", data)
            var exists = false;
            for (var i = 0; i < data.length; i++) {
                if ((value == data[i]['text'] || value == data[i]['id'])) {
                    exists = true;
                    break;
                }
            }
            return exists;
        },
        message: 'Dữ liệu không hợp lệ.'
    },
    validDate: {
        validator: function (value, param) {
            var date = $.fn.datebox.defaults.parser(value);
            var s = $.fn.datebox.defaults.formatter(date);
            return s == value;
        },
        message: 'Dữ liệu không hợp lệ.'
    },
    validRangeDate: {
        validator: function (value, param) {
            var c = $(param[0]);
            var field = param[1]
            var row = c.datagrid('getSelected');
            var minDate = row[field];
            var mdate = $.fn.datebox.defaults.parser(minDate);
            var date = $.fn.datebox.defaults.parser(value);
            var s = $.fn.datebox.defaults.formatter(date);
            var exists = false;
            if (mdate <= date && s == value) {
                exists = true;
            }
            return exists;
        },
        message: 'Dữ liệu không hợp lệ.'
    },
    validRangeDateValue: {
        validator: function (value, param) {
            var field = param[0];
            var mdate = $.fn.datebox.defaults.parser(field);
            var date = $.fn.datebox.defaults.parser(value);
            var s = $.fn.datebox.defaults.formatter(date);
            var exists = false;
            if (mdate <= date && s == value) {
                exists = true;
            }
            return exists;
        },
        message: 'Dữ liệu không hợp lệ.'
    },
    validRangeDateTwoValue: {
        validator: function (value, param) {
            var c = $(param[0]);
            var field = param[1];
            var d = param[2];
            var row = c.datagrid('getSelected');
            var minDate = row[field];
            var mdate = $.fn.datebox.defaults.parser(minDate);
            var m2date = $.fn.datebox.defaults.parser(d);
            var date = $.fn.datebox.defaults.parser(value);
            var s = $.fn.datebox.defaults.formatter(date);
            var exists = false;
            if (mdate <= date && m2date <= date && s == value) {
                exists = true;
            }
            return exists;
        },
        message: 'Dữ liệu không hợp lệ.'
    },
    validAmount: {
        validator: function (value, param) {
            var c = $(param[0]);
            var field = param[1];
            var field2 = param[2];
            var checkSLTon = param[3];
            if (checkSLTon === 'true') {
                var row = c.datagrid('getSelected');
                var index = c.datagrid('getRowIndex', row);
                var edVolume = c.datagrid('getEditor', { index: index, field: field2 }).target;
                var edVolumeExist = c.datagrid('getEditor', { index: index, field: field }).target;
                var exists = false;
                if (parseFloat(edVolume.numberbox('getText')) <= parseFloat(edVolumeExist.numberbox('getText'))) {
                    edVolume.numberbox('textbox').parent().css("border-color", "#D5D5D5");
                    exists = true;
                }
                else {
                    edVolume.numberbox('textbox').parent().css("border-color", "red");
                }
            } else {
                exists = true;
            }
            return exists;
        },
        message: 'Dữ liệu không hợp lệ.'
    }
});

// PhuLV: format date dd/MM/yyyy
$.fn.datebox.defaults.formatter = function (date) {
    /*var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return m + '/' + d + '/' + y;*/
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y;
}

// PhuLV: parser string to Date
$.fn.datebox.defaults.parser = function (s) {
    if (!s) return new Date();
    var ss = s.split('\/');
    var d = parseInt(ss[0], 10);
    var m = parseInt(ss[1], 10);
    var y = parseInt(ss[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y, m - 1, d);
    } else {
        return new Date();
    }
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
function dateDiff(startDate, endDate) {
    var date1 = new Date(mydateparser(startDate));
    var date2 = new Date(mydateparser(endDate));
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays + 1;
}
// note that month is 0-based, like in the Date object. Adjust if necessary.
function getNumberOfDays(year, month) {
    var isLeap = ((year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0));
    return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}
function startTime() {
    document.getElementById('txt').innerHTML = mydatetimeformatter(new Date());
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}
$.extend($.fn.textbox.methods, {
    addClearBtn: function (jq, iconCls) {
        return jq.each(function () {
            var t = $(this);
            var opts = t.textbox('options');
            opts.icons = opts.icons || [];
            opts.icons.unshift({
                iconCls: iconCls,
                handler: function (e) {
                    $(e.data.target).textbox('clear').textbox('textbox').focus();
                    $(this).css('visibility', 'hidden');
                }
            });
            t.textbox();
            if (!t.textbox('getText')) {
                t.textbox('getIcon', 0).css('visibility', 'hidden');
            }
            t.textbox('textbox').bind('keyup', function () {
                var icon = t.textbox('getIcon', 0);
                if ($(this).val()) {
                    icon.css('visibility', 'visible');
                } else {
                    icon.css('visibility', 'hidden');
                }
            });
        });
    }
});
function loaderWSE(opts, param, success, error) {
    if (!opts.url) return false;
    $.ajax({
        type: opts.method,
        url: opts.url,
        data: JSON.stringify(param),
        dataType: 'json',
        success: function (data) {
            if (data.Success === false) {
                error(data);
            } else {
                success(data.Results);
            }
        },
        error: function () {
            error.apply(this, arguments);
        }
    });
}
function addTab(title, url, plugin, iconCls) {
    if ($('#tab').tabs('exists', title)) {
        $('#tab').tabs('select', title);
    } else {
        $('#tab').tabs('add', {
            title: title,
            id: 'tabPanel' + plugin,
            cache: true,
            href: url + '.html',
            closable: true,
            //iconCls: iconCls,
            loadingMessage: 'Đang tải ...',
            extractor: function (data) {
                data = $.fn.panel.defaults.extractor(data);
                return data;
            }
        });
    }
}

//filter combotree
$.fn.combotree.defaults.editable = true;
$.extend($.fn.combotree.defaults.keyHandler, {
    up: function () {
        console.log('up')
    },
    down: function () {
        console.log('down')
    },
    enter: function () {
        console.log('enter')
    },
    query: function (q) {
        var t = $(this).combotree('tree');
        var nodes = t.tree('getChildren');
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.text.toLowerCase().indexOf(q.toLowerCase()) >= 0) {
                $(node.target).show();
            } else {
                $(node.target).hide();
            }
        }
        var opts = $(this).combotree('options');
        if (!opts.hasSetEvents) {
            opts.hasSetEvents = true;
            var onShowPanel = opts.onShowPanel;
            opts.onShowPanel = function () {
                var nodes = t.tree('getChildren');
                for (var i = 0; i < nodes.length; i++) {
                    $(nodes[i].target).show();
                }
                onShowPanel.call(this);
            }
            $(this).combo('options').onShowPanel = opts.onShowPanel;
        }
    }
});
//end filter combotree

function loaderEasyUIGrid(opts, param, success, error) {
    if (!opts.url) {
        return false;
    }
    $.ajax({
        type: opts.method,
        url: opts.url,
        data: JSON.stringify(param),
        dataType: 'json',
        success: function (data) {
            if (data.Success === true) {
                success(data.Data);
            } else {
                error(data);
            }
        },
        error: function () {
            error.apply(this, arguments);
        }
    });
}

//InitAutoCompletex_Search
function InitAutoCompletex_Search(pAttribute, pMinLength, pUrl) {
    $("#" + pAttribute + "").select2({
        minimumInputLength: pMinLength,
        ajax: {
            url: pUrl,
            type: 'GET',
            dataType: 'json',
            data: function (params) {
                return {
                    prefix: params.term
                };
            },
            processResults: function (data, params) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            text: item.NameCompare,
                            id: item.Id
                        };
                    })
                };
            }
        }
    });
}

//hunglt resize combobox datagrid
$.extend($.fn.datagrid.defaults.editors, {
    combobox: {
        init: function (container, options) {
            var combo = $('<input type="text">').appendTo(container);
            combo.combobox(options || {});
            return combo;
        },
        destroy: function (target) {
            $(target).combobox('destroy');
        },
        getValue: function (target) {
            if ($(target).combobox('options').multiple) {
                return $(target).combobox('getValues');
            } else {
                return $(target).combobox('getValue');
            }
        },
        setValue: function (target, value) {
            if ($(target).combobox('options').multiple) {
                $(target).combobox('setValues', value ? ($.isArray(value) ? value : [value]) : []);
            } else {
                $(target).combobox('setValue', value);
            }
        },
        resize: function (target, width) {
            $(target).combobox('resize', width)
        }
    },
    combotree: {
        init: function (container, options) {
            var combo = $('<input type="text">').appendTo(container);
            combo.combotree(options || {});
            return combo;
        },
        destroy: function (target) {
            $(target).combotree('destroy');
        },
        getValue: function (target) {
            if ($(target).combotree('options').multiple) {
                return $(target).combotree('getValues');
            } else {
                return $(target).combotree('getValue');
            }
        },
        setValue: function (target, value) {
            if ($(target).combotree('options').multiple) {
                $(target).combotree('setValues', value ? ($.isArray(value) ? value : [value]) : []);
            } else {
                $(target).combotree('setValue', value);
            }
        },
        resize: function (target, width) {
            $(target).combotree('resize', width)
        }
    }
});

//phân trang datagrid
function pagerFilter(data) {
    if (typeof data.length == 'number' && typeof data.splice == 'function') {
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        onSelectPage: function (pageNum, pageSize) {
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh', {
                pageNumber: pageNum,
                pageSize: pageSize
            });
            dg.datagrid('loadData', data);
        }
    });
    if (!data.originalRows) {
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}

// PhuLV - post form with parameters
function postForm(path, params, method) {
	method = method || 'post';

	var form = document.createElement('form');
	form.setAttribute('method', method);
	form.setAttribute('action', path);

	for (var key in params) {
		if (params.hasOwnProperty(key)) {
			var hiddenField = document.createElement('input');
			hiddenField.setAttribute('type', 'hidden');
			hiddenField.setAttribute('name', key);
			hiddenField.setAttribute('value', params[key]);

			form.appendChild(hiddenField);
		}
	}

	document.body.appendChild(form);
	form.submit();
}

// PhuLV - Get sort column name from index
function GetSortColumnNameFromIndex(colIndex, list) {
	var sortColumn = '';
	$.each(list, function (index, obj) {
		if (index === colIndex) {
			sortColumn = obj.data;
			return false;
		}
	});
	return sortColumn;
}

function getFloat(number) {
	var result = parseFloat(number);
	return isNaN(result) ? 0 : result;
}

function getInt(number) {
	var result = parseInt(number);
	return isNaN(result) ? 0 : result;
}