<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="BookingRoomManager.aspx.cs" Inherits="QLKS.BookingRoomManager" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div ng-app="QLKS" ng-controller="BookingRoomManagerCtrl">
        <div class="panel panel-primary">
            <div class="panel-heading">
                Tìm kiếm
            </div>
            <div class="panel-body">
                <div class="form-group col-md-4">
                    <label class="control-label">Phòng</label>
                    <select class="chosen-select form-control" id="ddlRoom" ng-model="ddlRoom" ui-select2 style="width: 100%">
                        <option value="">Chọn phòng</option>
                        <option ng-repeat="item in RoomList" value="{{item.MaPhong}}">{{item.TenPhong}}</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label class="control-label">Khách hàng</label>
                    <select class="chosen-select form-control" id="ddlCustomer" ng-model="ddlCustomer" ui-select2 style="width: 100%">
                        <option value="">Chọn khách hàng</option>
                        <option ng-repeat="item in CustomerList" value="{{item.MaKH}}">{{item.TenKH}}</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label class="control-label">Số điện thoại</label>
                    <input type="text" placeholder="Số điện thoại" class="form-control" ng-model="txtPhone" />
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
                Danh sách phòng đã đặt
            </div>
            <div class="panel-body table-qlks">
                <table id="dynamic-table" datatable="ng" dt-options="dtOptions" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Mã Phiếu</th>
                            <th>Tên KH</th>
                            <th>SĐT</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Đơn giá</th>
                            <th>Trạng thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="x in BookingRoomList">
                            <td>{{x.MaPhieuDP}}</td>
                            <th>{{x.TenKH}}</th>
                            <th>{{x.SDT}}</th>
                            <th>{{x.NgayBD | date : 'dd/MM/yyyy'}}</th>
                            <th>{{x.NgayKT | date : 'dd/MM/yyyy'}}</th>
                            <th>{{x.DonGia}}</th>
                            <th>{{x.TrangThai == true ? "Đã thanh toán" : "Chưa thanh toán"}}</th>
                            <td>
                                <div class="action-buttons text-center">
                                    <button type="button" class="btn " ng-class="{'btn-primary': x.TrangThai != true, 'btn-warning': x.TrangThai == true}" title="{{x.TrangThai == true ? 'Xem' : 'Sửa'}}" ng-click="EditBookingRoom(x)">
                                        <i class="ace-icon fa " ng-class="{'fa-pencil': x.TrangThai != true, 'fa-eye': x.TrangThai == true}"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                            Cập nhật
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="form-group col-md-6">
                            <label class="control-label">Mã phòng</label>
                            <input type="text" placeholder="Mã phòng" class="form-control" readonly="readonly" ng-model="txtRoomId" />
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">Khách hàng</label>
                            <input type="text" placeholder="Khách hàng" class="form-control" readonly="readonly" ng-model="txtCustomer" />
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">Từ ngày</label>
                            <input type="text" placeholder="Từ ngày" class="form-control" ng-model="txtFromDate" />
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">Đến ngày</label>
                            <input type="text" placeholder="Đến ngày" class="form-control" ng-model="txtToDate" />
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">Đơn giá</label>
                            <input type="text" placeholder="Đơn giá" class="form-control" readonly="readonly" ng-model="txtUnitPrice" />
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">Tổng tiền</label>
                            <input type="text" placeholder="Tổng tiền" class="form-control" readonly="readonly" ng-model="txtTotalMoney" />
                        </div>
                        <div class="form-group col-md-4">
                            <label class="control-label">Sản phẩm</label>
                            <select class="chosen-select form-control" id="ddlProduct" ng-model="ddlProduct" ui-select2 style="width: 100%">
                                <option value="">Chọn sản phẩm</option>
                                <option ng-repeat="item in ProductList" value="{{item.MaSP}}">{{item.TenSP}}</option>
                            </select>
                        </div>
                        <div class="form-group col-md-1 no-margin no-padding-left">
                            <label class="control-label">SL</label>
                            <input type="number" class="form-control" ng-model="txtQuantityProduct" />
                        </div>
                        <div class="form-group col-md-1">
                            <button type='button' class="btn btn-sm btn-primary pull-right" style="margin-top: 25px" ng-click="ChooseProduct()">
                                <i class="ace-icon fa fa-plus"></i>Chọn
                            </button>
                        </div>
                        <div class="form-group col-md-12 table-qlks">
                            <table class="table table-bordered  no-margin-bottom">
                                <thead>
                                    <tr>
                                        <th>Mã SP</th>
                                        <th>Tên SP</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="item in ChooseProductList">
                                        <td>{{item.MaSP}}</td>
                                        <td>{{item.TenSP}}</td>
                                        <td>{{item.SoLuong}}</td>
                                        <td>{{item.DonGia}}</td>
                                        <td class="text-center">
                                            <button type="button" class="btn btn-danger" title="Xóa khỏi danh sách" ng-click="RemoveChooseProduct(item)" ng-show="!item.MaSPP || item.MaSPP == 0">
                                                <i class="ace-icon fa fa-trash-o"></i>
                                            </button>
                                            <button type="button" class="btn btn-primary" title="Sửa" ng-click="EditChooseProduct(item)" ng-show="item.MaSPP && item.MaSPP != 0">
                                                <i class="ace-icon fa fa-pencil"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" class="text-center">Tổng tiền</td>
                                        <td colspan="2" class="text-center">{{lblTotalMoneyProduct}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="form-group col-md-12">
                            <label class="control-label">Thanh toán</label>
                            <input type="text" placeholder="Thanh toán" class="form-control" readonly="readonly" ng-model="txtAllTotalMoney" />
                        </div>
                    </div>
                    <div class="modal-footer form-button">
                        <button type='button' class="btn btn-sm btn-success pull-right" ng-click="PaymentBookingRoom()" ng-show="ChooseBookingRoom.TrangThai != true && ShowBtnPrint != true">
                            <i class="ace-icon fa fa-external-link"></i>Trả phòng
                        </button>
                        <button type='button' class="btn btn-sm btn-primary pull-right" ng-click="UpdateBookingRoom()" ng-show="ChooseBookingRoom.TrangThai != true && ShowBtnPrint != true">
                            <i class="ace-icon fa fa-save"></i>Lưu
                        </button>
                        <button type='button' class="btn btn-sm btn-primary pull-right" ng-click="openPrintWHDetail()" ng-show="ChooseBookingRoom.TrangThai == true || ShowBtnPrint == true">
                            <i class="ace-icon fa fa-print"></i>In phiếu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="App/BookingRoomManager.js"></script>
</asp:Content>