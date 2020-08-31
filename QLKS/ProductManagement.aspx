<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ProductManagement.aspx.cs" Inherits="QLKS.ProductManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <%--<body class="no-skin">--%>
        <div ng-app="QLKS" ng-controller="ProductManagementCtrl">

            <div class="panel panel-primary">
            <div class="panel-heading">
                Tìm kiếm
            </div>
            <div class="panel-body form-horizontal">
                <div class="form-group col-sm-6">
                    <label class="col-sm-4 control-label no-padding-right" for="form-field-1">Mã sản phẩm</label>
                    <div class="col-md-8">
                        <input type="text" id="ProductID" placeholder="Mã sản phẩm" class="form-control" />
                    </div>
                </div>
                <div class="form-group col-sm-6">
                    <label class="col-sm-4 control-label no-padding-right" for="form-field-1">Tên sản phẩm</label>
                    <div class="col-md-8">
                        <input type="text" id="ProductName" placeholder="Tên sản phẩm" class="form-control" />
                    </div>
                </div>
                <div class="col-md-12 form-button">
                    <button class="btn btn-info" type="button" ng-click="searchProduct()">
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
                Danh sách sản phẩm
            </div>
            <div class="panel-body table-qlks">
                <table id="dynamic-table" datatable="ng" dt-options="dtOptions" class="table table-bordered">
                    <thead>
                        <tr >
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Đơn giá</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr ng-repeat="x in dataTable">
                            <td>{{x.MaSP}}</td>
                            <th>{{x.TenSP}}</th>
                            <th>{{x.DonGia}}</th>

                            <td>
                                <div class="hidden-sm hidden-xs action-buttons">
                                    <a class="modal123 blue" href="#modal-table" role="button" data-toggle="modal" data-id="Info" data-value="{{x.MaSP}}" style="text-decoration: none; color: antiquewhite;">
                                        <i class="ace-icon fa fa-search-plus bigger-130"></i>
                                    </a>

                                    <a class="modal123 green" href="#modal-table" role="button" data-toggle="modal" data-id="Update" data-value="{{x.MaSP}}" style="text-decoration: none; color: antiquewhite;">
                                        <i class="ace-icon fa fa-pencil bigger-130"></i>
                                    </a>

                                    <a class="red" href="#" id="DeleteProduct" data-value="{{x.MaSP}}">
                                        <i class="ace-icon fa fa-trash-o bigger-130"></i>
                                    </a>
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="modal-table" class="modal fade" tabindex="-1">
            <div class="modal-dialog" style="width: 850px!important; height: auto;">
                <div class="modal-content">
                    <div class="modal-header no-padding">
                        <div class="table-header" id="titleheader">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                <span class="white">&times;</span>
                            </button>
                            Thêm mới
                        </div>
                    </div>

                    <div class="modal-body no-padding">
                        <div class="widget-main">
                            <div class="form-horizontal" role="form" style="height:auto;">
                                <div class="form-group col-sm-6" id="manv">
                                    <label class="col-sm-4 control-label no-padding-right" for="form-field-1-1">Mã sản phẩm</label>

                                    <div class="col-sm-8">
                                        <input type="text" id="txtMProductID" placeholder="Mã sản phẩm" class="form-control" readonly="readonly"/>
                                    </div>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right" for="form-field-1-1">Tên sản phẩm</label>

                                    <div class="col-sm-8">
                                        <input type="text" id="txtMProductName" placeholder="Tên sản phẩm" class="form-control input-required" />
                                    </div>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label class="col-sm-4 control-label no-padding-right" for="form-field-1">Đơn giá</label>

                                    <div class="col-sm-8">
                                        <input type="text" id="txtMAmount" placeholder="Đơn giá" class="form-control input-required" />
                                    </div>
                                </div>
                                <br />
                                <div class="hr hr-18 dotted hr-double"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer no-margin-top">
                    <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                        <i class="ace-icon fa fa-times"></i>
                        Close
                    </button>
                    <button type='button' id="insert" class="btn btn-sm btn-success pull-right" ng-click="InsertProduct()">
                        <i class="ace-icon fa fa-save"></i>
                        Save
                    </button>
                    <button type='button' id="update" class="btn btn-sm btn-success pull-right" ng-click="UpdateProduct()">
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
    <script src="App/ProductManagement.js"></script>
    
</asp:Content>
