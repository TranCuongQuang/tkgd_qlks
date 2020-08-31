<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="CustomerManagement.aspx.cs" Inherits="QLKS.CustomerManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <%--<body class="no-skin">--%>
    <div ng-app="QLKS" ng-controller="CustomerManagementCtrl">

        <div class="panel panel-primary">
            <div class="panel-heading">
                Tìm kiếm
            </div>
            <div class="panel-body form-horizontal">
                <div class="form-group col-sm-6">
                    <label class="col-sm-4 control-label no-padding-right" for="form-field-1">Mã khách hàng</label>
                    <div class="col-md-8">
                        <input type="text" id="CustomerID" placeholder="Mã khách hàng" class="form-control" />
                    </div>
                </div>
                <div class="form-group col-sm-6">
                    <label class="col-sm-4 control-label no-padding-right" for="form-field-1">Tên khách hàng</label>
                    <div class="col-md-8">
                        <input type="text" id="CustomerName" placeholder="Tên khách hàng" class="form-control" />
                    </div>
                </div>
                <div class="col-md-12 form-button">
                    <button class="btn btn-info" type="button" ng-click="searchCustomer()">
                        <i class="ace-icon fa fa-search"></i>Tìm kiếm
                    </button>
                    <button class="btn btn-primary modal123" type="button" data-id="Create" ng-click="showModal()">
                        <i class="ace-icon fa fa-plus"></i>Thêm mới
                    </button>
                </div>
            </div>
        </div>

        <div class="panel panel-primary">
            <div class="panel-heading">
                Danh sách nhân viên
            </div>
            <div class="panel-body table-qlks">
                <table id="dynamic-table" datatable="ng" dt-options="dtOptions" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Mã NV</th>
                            <th>Tên NV</th>
                            <th>SĐT</th>
                            <th>Ngày sinh</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>CMND</th>
                            <th>Giới tính</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr ng-repeat="x in dataTable">
                            <td>{{x.MaKH}}</td>
                            <th>{{x.TenKH}}</th>
                            <th>{{x.SDT}}</th>
                            <th>{{x.NgaySinh}}</th>
                            <th>{{x.Email}}</th>
                            <th>{{x.DiaChi}}</th>
                            <th>{{x.CMND}}</th>
                            <th>{{x.GioiTinh ? "Nam":"Nữ"}}</th>
                            <td>
                                <div class="hidden-sm hidden-xs action-buttons">
                                    <a class="modal123 blue" href="#modal-table" role="button" data-toggle="modal" data-id="Info" data-value="{{x.MaKH}}" style="text-decoration: none; color: antiquewhite;">
                                        <i class="ace-icon fa fa-search-plus bigger-130"></i>
                                    </a>

                                    <a class="modal123 green" href="#modal-table" role="button" data-toggle="modal" data-id="Update" data-value="{{x.MaKH}}" style="text-decoration: none; color: antiquewhite;">
                                        <i class="ace-icon fa fa-pencil bigger-130"></i>
                                    </a>

                                    <a class="red" href="#" id="DeleteCustomer" data-value="{{x.MaKH}}">
                                        <i class="ace-icon fa fa-trash-o bigger-130"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="modal-table" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog" style="width: 850px!important; height: auto;">
                <div class="modal-content">
                    <div class="modal-header no-padding">
                        <div class="table-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                <span class="white">&times;</span>
                            </button>
                            Thêm mới khách hàng
                        </div>
                    </div>

                    <div class="modal-body">
                        <div class="form-group col-sm-6">
                            <label class="control-label">Mã khách hàng</label>
                            <input type="text" id="txtMCustomerID" placeholder="Mã khách hàng" class="form-control" readonly="readonly" />
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label">Tên khách hàng</label>
                            <input type="text" id="txtMCustomerName" placeholder="Tên khách hàng" class="form-control input-required" />
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label">Số điện thoại</label>
                            <input type="text" id="txtMSDT" placeholder="Số điện thoại" class="form-control input-required" />
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label">Email</label>
                            <input type="text" id="txtMEmail" placeholder="Email" class="form-control input-required" />
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label">Địa chỉ</label>
                            <input type="text" id="txtMAddress" placeholder="Địa chỉ" class="form-control input-required" />
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label">Ngày sinh</label>
                            <div class="input-group">
                                <input class="form-control date-picker input-required" id="txtMBirthday" type="text" data-date-format="dd-mm-yyyy" />
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar bigger-110"></i>
                                </span>
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label">CMND</label>
                            <input type="text" placeholder="CMND" class="form-control input-required" ng-model="txtCMND" />
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label">Giới tính</label>
                            <div style="margin-top: 10px">
                                <div class="radio-inline" style="padding-left: unset">
                                    <label>
                                        <input name="form-field-radio" type="radio" class="ace" ng-model="radGT" value="1">
                                        <span class="lbl">Nam</span>
                                    </label>
                                </div>
                                <div class="radio-inline">
                                    <label>
                                        <input name="form-field-radio" type="radio" class="ace" ng-model="radGT" value="0">
                                        <span class="lbl">Nữ</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type='button' id="insert" class="btn btn-sm btn-success pull-right" ng-click="InsertCustomer()">
                        <i class="ace-icon fa fa-save"></i>
                        Save
                    </button>
                    <button type='button' id="update" class="btn btn-sm btn-success pull-right" ng-click="UpdateCustomer()">
                        <i class="ace-icon fa fa-save"></i>
                        Save
                    </button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <%--</body>--%>

    <!-- inline scripts related to this page -->
    <script src="App/CustomerManagement.js"></script>
</asp:Content>