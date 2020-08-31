<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="QLKS.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="utf-8" />
    <title>Login Page - Ace Admin</title>

    <meta name="description" content="User login page" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <link rel="stylesheet" href="Scripts/assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="Scripts/assets/font-awesome/4.5.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="Scripts/assets/css/fonts.googleapis.com.css" />
    <link href="Content/datatables.min.css" rel="stylesheet" />
    <link href="Content/jquery.dataTables.min.css" rel="stylesheet" />
    <link href="Content/select.dataTables.min.css" rel="stylesheet" />
    <link href="Scripts/assets/css/toastr.min.css" rel="stylesheet" />
    <!-- ace styles -->
    <link rel="stylesheet" href="Scripts/assets/css/ace.min.css" class="ace-main-stylesheet" />
    <link rel="stylesheet" href="Scripts/assets/css/ace-skins.min.css" />
    <link rel="stylesheet" href="Scripts/assets/css/ace-rtl.min.css" />
    <script src="Scripts/jquery.min.js"></script>

    <%--<script src="Scripts/assets/js/jquery-2.1.4.min.js"></script>--%>
    <%--<script src="Scripts/jquery-3.3.1.js"></script>--%>

    <script src="Scripts/assets/js/jquery.dataTables.min.js"></script>
    <script src="Scripts/assets/js/dataTables.select.min.js"></script>

    <%--Angular--%>
    <script data-require="angular.js@*" data-semver="Scripts" src="Scripts/assets/js/angular.min.js"></script>
    <script src="Scripts/assets/js/angular-block-ui.min.js"></script>
    <link href="Content/angular-block-ui.min.css" rel="stylesheet" />
    <script src="Scripts/assets/js/angular-select2.js"></script>
    <script src="Scripts/assets/js/angular-filter.min.js"></script>
    <script src="Scripts/assets/js/angular-datatables.min.js"></script>
    <script src="Scripts/assets/js/ui-bootstrap-tpls-2.5.0.min.js"></script>

    <script src="Scripts/assets/js/toastr.js"></script>
</head>
<body class="login-layout blur-login">
    <form runat="server">
        <div class="main-container" ng-app="QLKS" ng-controller="LoginCtrl">
            <div class="main-content">
                <div class="row">
                    <div class="col-sm-10 col-sm-offset-1">
                        <div class="login-container">
                            <div class="center">
                                <h1>
                                    <i class="ace-icon fa fa-leaf green"></i>
                                    <span class="white" id="id-text2">Đăng nhập</span>
                                </h1>
                            </div>
                            <div class="space-6"></div>
                            <div class="position-relative">
                                <div id="login-box" class="login-box visible widget-box no-border">
                                    <div class="widget-body">
                                        <div class="widget-main">
                                            <h4 class="header blue lighter bigger">
                                                <i class="ace-icon fa fa-coffee green"></i>
                                                Vui lòng nhập thông tin
                                            </h4>
                                            <div class="space-6"></div>

                                            <fieldset>
                                                <label class="block clearfix">
                                                    <span class="block input-icon input-icon-right">
                                                        <input type="text" class="form-control entry_required" placeholder="Tên đăng nhập" ng-model="txtUserName" />
                                                        <i class="ace-icon fa fa-user"></i>
                                                    </span>
                                                </label>
                                                <label class="block clearfix">
                                                    <span class="block input-icon input-icon-right">
                                                        <input type="password" class="form-control entry_required" placeholder="Mật khẩu" ng-model="txtPassWord" />
                                                        <i class="ace-icon fa fa-lock"></i>
                                                    </span>
                                                </label>
                                                <div class="space"></div>
                                                <div class="clearfix">
                                                    <button type="button" class=" pull-right btn btn-sm btn-primary" ng-click="Login()">
                                                        <i class="ace-icon fa fa-key"></i>
                                                        <span class="bigger-110">Đăng nhập</span>
                                                    </button>
                                                </div>
                                                <div class="space-4"></div>
                                            </fieldset>
                                        </div>
                                        <!-- /.widget-main -->
                                    </div>
                                    <!-- /.widget-body -->
                                </div>
                                <!-- /.login-box -->
                            </div>
                            <!-- /.position-relative -->
                        </div>
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.main-content -->
        </div>
        <!-- /.main-container -->
    </form>
    <script src="App/Login.js?v=1"></script>
</body>
</html>