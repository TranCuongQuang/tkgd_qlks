using System;
using System.Web.UI;

namespace QLKS.App_Code
{
    public class AuthenPage : Page
    {
        public void Page_PreInit(object sender, EventArgs e)
        {
            if (IsAuthenticated == false) // chưa đăng nhập
            {
                // chuyển sang trang đăng nhập
                Response.Redirect("Login.aspx");
            }
        }

        public bool IsAuthenticated
        {
            get
            {
                return (user_account != null);
            }
        }

        public tblNhanVien user_account
        {
            get
            {
                return Session["UserLogin"] as tblNhanVien;
            }
            set
            {
                if (value == null)
                {
                    Session.Remove("UserLogin");
                }
                else
                {
                    Session["UserLogin"] = value;
                }
            }
        }
    }
}