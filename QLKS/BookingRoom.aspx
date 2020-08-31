<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="BookingRoom.aspx.cs" Inherits="QLKS.BookingRoom" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div ng-app="QLKS" ng-controller="BookingRoomCtrl">
        <div class="panel panel-primary">
            <div class="panel-heading">
                Tìm kiếm
            </div>
            <div class="panel-body">
                <div class="form-group col-md-3">
                    <label class="control-label">Lầu</label>
                    <select class="chosen-select form-control" ng-model="ddlFlowSearch" ui-select2 style="width: 100%">
                        <option value="">Chọn lầu</option>
                        <%--<option ng-repeat="item in RoomList" value="{{item.MaPhong}}">{{item.TenPhong}}</option>--%>
                    </select>
                </div>
                <div class="form-group col-md-3">
                    <label class="control-label">Trạng thái</label>
                    <select class="chosen-select form-control" ng-model="ddlStatusSearch" ui-select2 style="width: 100%">
                        <option value="">Chọn trạng thái</option>
                        <%--<option ng-repeat="item in CustomerList" value="{{item.MaKH}}">{{item.TenKH}}</option>--%>
                    </select>
                </div>
                <div class="form-group col-md-3">
                    <label class="control-label">Loại phòng</label>
                    <select class="chosen-select form-control" ng-model="ddlRoomTypeSearch" ui-select2 style="width: 100%">
                        <option value="">Chọn loại phòng</option>
                        <%--<option ng-repeat="item in CustomerList" value="{{item.MaKH}}">{{item.TenKH}}</option>--%>
                    </select>
                </div>
                <div class="form-group col-md-3">
                    <label class="control-label">Mã phòng</label>
                    <input type="text" placeholder="Mã phòng" class="form-control" ng-model="txtRoomIdSearch" />
                </div>
                <div class="col-md-12 form-button">
                    <button class="btn btn-info" type="button" ng-click="GetBookingRoom()">
                        <i class="ace-icon fa fa-search"></i>Tìm kiếm
                    </button>
                </div>
            </div>
        </div>
        <div class="panel panel-primary">
            <div class="panel-heading">
                Đặt phòng
            </div>
            <div class="panel-body">
                <div style="margin-right: 2px" class="infobox infobox-small infobox-dark booking " ng-class="{'infobox-blue': item.TrangThai == 0, 'infobox-red': item.TrangThai == 1}" ng-click="showModal(item)" ng-repeat="item in RoomList">
                    <div class="infobox-chart">
                        <span class="ace-icon fa fa-home" style="font-size: 30px; vertical-align: middle;"></span>
                    </div>
                    <div class="infobox-data">
                        <div class="infobox-content">{{item.TenPhong}}</div>
                        <div class="infobox-content">{{item.StrTrangThai}}</div>
                    </div>
                </div>
            </div>
        </div>

        <div id="modalBooking" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header no-padding">
                        <div class="table-header" id="titleheader">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                <span class="white">&times;</span>
                            </button>
                            Thêm mới
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="form-group col-md-6">
                            <label class="control-label">Mã phòng</label>
                            <input type="text" placeholder="Mã phòng" class="form-control" readonly="readonly" ng-model="txtRoomId" />
                        </div>
                        <div class="form-group col-md-5">
                            <label class="control-label">Khách hàng</label>
                            <select class="chosen-select form-control" id="ddlCustomer" ng-model="ddlCustomer" ui-select2 style="width: 100%">
                                <option value="">Chọn khách hàng</option>
                                <option ng-repeat="item in CustomerList" value="{{item.MaKH}}">{{item.TenKH}}</option>
                            </select>
                        </div>
                        <div class="form-group col-md-1">
                            <button type='button' class="btn btn-sm btn-primary pull-right" style="margin-top: 25px" ng-click="ShowModalCustomer()">
                                <i class="ace-icon fa fa-plus"></i>Thêm
                            </button>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">Từ ngày</label>
                            <div class="input-group">
                                <input class="form-control date-picker" type="text" data-date-format="dd-mm-yyyy" ng-model="txtFromDate" ng-change="ChangeFromDate()" />
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">Đến ngày</label>
                            <div class="input-group">
                                <input class="form-control date-picker" type="text" data-date-format="dd-mm-yyyy" ng-model="txtToDate" ng-change="ChangeToDate()" />
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">Đơn giá</label>
                            <input type="text" placeholder="Đơn giá" class="form-control" readonly="readonly" ng-model="txtUnitPrice" />
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">Thành tiền</label>
                            <input type="text" placeholder="Thành tiền" class="form-control" readonly="readonly" ng-model="txtTotalMoney" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type='button' class="btn btn-sm btn-primary pull-right" ng-click="SaveBookingRoom()">
                            <i class="ace-icon fa fa-save"></i>Đặt phòng
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div id="modalCustomer" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog  modal-lg">
                <div class="modal-content">
                    <div class="modal-header no-padding">
                        <div class="table-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="CloseModalCustomer()">
                                <span class="white">&times;</span>
                            </button>
                            Thêm mới khách hàng
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="form-group col-sm-6">
                            <label class="control-label">Mã khách hàng</label>
                            <input type="text" placeholder="Mã khách hàng" class="form-control" readonly="readonly" />
                        </div>
                        <div class="form-group col-sm-6">
                            <label class=" control-label">Tên khách hàng</label>
                            <input type="text" placeholder="Tên khách hàng" class="form-control input-required" ng-model="txtCustomerName" />
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label">Số điện thoại</label>
                            <input type="text" placeholder="Số điện thoại" class="form-control input-required" ng-model="txtPhone" />
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label">Email</label>
                            <input type="text" placeholder="Email" class="form-control input-required" ng-model="txtEmail" />
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label">Địa chỉ</label>
                            <input type="text" placeholder="Địa chỉ" class="form-control input-required" ng-model="txtAddress" />
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label">Ngày sinh</label>
                            <div class="input-group">
                                <input class="form-control date-picker input-required" type="text" data-date-format="dd-mm-yyyy" ng-model="txtBirthday" />
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
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
                                        <input name="form-field-radio" type="radio" class="ace"  ng-model="radGT" value="1">
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
                    <button type='button' class="btn btn-sm btn-primary pull-right" ng-click="InsertCustomer()">
                        <i class="ace-icon fa fa-save"></i>Lưu
                    </button>
                </div>
            </div>
        </div>
    </div>
    <script src="App/BookingRoom.js"></script>
</asp:Content>