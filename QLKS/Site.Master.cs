using System;
using System.Web.UI;

namespace QLKS
{
    public partial class SiteMaster : MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                tblNhanVien user = Session["UserLogin"] as tblNhanVien;
                lblUserLogin.InnerText = user.TenNV;
                var html = "";

                html += "<li class='active'><a href='BookingRoom.aspx'><i class='menu-icon fa fa-tachometer'></i><span class='menu-text'>Đặt phòng</span></a><b class='arrow'></b></li>" +
                        "<li class=''><a href='BookingRoomManager.aspx'><i class='menu-icon fa fa-tachometer'></i><span class='menu-text'>Danh sách đặt phòng</span></a><b class='arrow'></b></li>";

                if (user.ChucVu == "QL")
                {
                    html += "<li class=''><a href='CustomerManagement.aspx'><i class='menu-icon fa fa-tachometer'></i><span class='menu-text'>QL khách hàng</span></a><b class='arrow'></b></li>" +
                            "<li class=''><a href='ProductManagement.aspx'><i class='menu-icon fa fa-tachometer'></i><span class='menu-text'>QL sản phẩm</span></a><b class='arrow'></b></li>";
                }

                listMenu.InnerHtml = html;
            }
        }
    }
}