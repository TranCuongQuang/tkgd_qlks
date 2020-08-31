using Newtonsoft.Json;
using QLKS.Class;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace QLKS
{
    public partial class WebServiceCTQ : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var action = Request.Params["Action"];
            Response.ContentType = "application/json; charset=utf-8";

            switch (action)
            {
                #region Login

                case "Login":
                    Response.Write(JsonConvert.SerializeObject(Login()));
                    Response.End();
                    break;

                #endregion Login

                case "SaveBookingRoom":
                    Response.Write(JsonConvert.SerializeObject(SaveBookingRoom()));
                    Response.End();
                    break;

                case "UpdateBookingRoom":
                    Response.Write(JsonConvert.SerializeObject(UpdateBookingRoom()));
                    Response.End();
                    break;

                case "PaymentBookingRoom":
                    Response.Write(JsonConvert.SerializeObject(PaymentBookingRoom()));
                    Response.End();
                    break;

                case "GetBookingRoom":
                    Response.Write(JsonConvert.SerializeObject(GetBookingRoom()));
                    Response.End();
                    break;

                default:

                    Response.End();
                    break;
            }
        }

        private AjaxReponseModel<dynamic> Login()
        {
            var response = new AjaxReponseModel<dynamic>(AjaxReponseStatusEnum.Success);
            var data = new StreamReader(Request.InputStream).ReadToEnd();
            var dym = JsonConvert.DeserializeObject<dynamic>(data);

            string userName = dym.userName;
            string passWord = dym.passWord;

            using (var db = new qlksEntities())
            {
                var user = db.tblNhanViens.SingleOrDefault(w => w.MatKhau == passWord && w.TenDangNhap == userName);

                if (user != null)
                {
                    response.Message = "Đăng nhập thành công.";
                    Session["UserLogin"] = user;
                }
                else
                {
                    response.Status = AjaxReponseStatusEnum.Fail;
                    response.Message = "Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu.";
                }
            };

            return response;
        }

        private AjaxReponseModel<dynamic> SaveBookingRoom()
        {
            var response = new AjaxReponseModel<dynamic>(AjaxReponseStatusEnum.Success);
            var data = new StreamReader(Request.InputStream).ReadToEnd();
            var dym = JsonConvert.DeserializeObject<BookingRoomModel>(data);
            tblNhanVien userLogin = Session["UserLogin"] as tblNhanVien;

            try
            {
                using (var db = new qlksEntities())
                {
                    tblPhieuDatPhong datPhong = new tblPhieuDatPhong()
                    {
                        MaKH = dym.MaKH,
                        MaPhong = dym.MaPhong,
                        MaNV = userLogin.MaNV,
                        NgayBD = dym.NgayBD,
                        NgayKT = dym.NgayKT,
                        TongTien = dym.TongTien,
                        DonGia = dym.DonGia
                    };

                    db.tblPhieuDatPhongs.Add(datPhong);
                    var numberSave = db.SaveChanges();

                    if (numberSave > 0)
                    {
                        var room = db.tblPhongs.FirstOrDefault(f => f.MaPhong == dym.MaPhong);
                        if (room != null)
                        {
                            room.TrangThai = true;
                        }

                        if (dym.SanPhamPhong != null && dym.SanPhamPhong.Length != 0)
                        {
                            List<tblSanPhamPhong> listSPP = new List<tblSanPhamPhong>();
                            foreach (var item in dym.SanPhamPhong)
                            {
                                tblSanPhamPhong dichVuPhong = new tblSanPhamPhong()
                                {
                                    MaPhieuDP = datPhong.MaPhieuDP,
                                    MaSP = item.MaSP,
                                    SoLuong = item.SoLuong,
                                    DonGia = item.DonGia,
                                    ThanhTien = item.ThanhTien
                                };
                                listSPP.Add(dichVuPhong);
                            }

                            db.tblSanPhamPhongs.AddRange(listSPP);
                        }

                        db.SaveChanges();

                        response.Message = "Đặt phòng thành công.";
                    }
                    else
                    {
                        response.Status = AjaxReponseStatusEnum.Fail;
                        response.Message = "Đặt phòng thất bại.";
                    }
                };
            }
            catch (Exception e)
            {
                response.Status = AjaxReponseStatusEnum.Fail;
                response.Message = "Đặt phòng thất bại (Exception).";
            }

            return response;
        }

        private AjaxReponseModel<dynamic> UpdateBookingRoom()
        {
            var response = new AjaxReponseModel<dynamic>(AjaxReponseStatusEnum.Success);
            var data = new StreamReader(Request.InputStream).ReadToEnd();
            var dym = JsonConvert.DeserializeObject<BookingRoomModel>(data);

            try
            {
                using (var db = new qlksEntities())
                {
                    var room = db.tblPhongs.FirstOrDefault(f => f.MaPhong == dym.MaPhong);
                    if (room != null)
                    {
                        room.TrangThai = true;
                    }

                    if (dym.SanPhamPhong != null && dym.SanPhamPhong.Length != 0)
                    {
                        foreach (var item in dym.SanPhamPhong)
                        {
                            if (item.MaSPP != null && item.MaSPP != 0)
                            {
                                var dvp = db.tblSanPhamPhongs.FirstOrDefault(f => f.MaPhieuDP == dym.MaPhieuDP && f.MaSPP == item.MaSPP);
                                dvp.SoLuong = item.SoLuong;
                                dvp.ThanhTien = item.ThanhTien;
                            }
                            else
                            {
                                tblSanPhamPhong dichVuPhong = new tblSanPhamPhong()
                                {
                                    MaPhieuDP = dym.MaPhieuDP,
                                    MaSP = item.MaSP,
                                    SoLuong = item.SoLuong,
                                    DonGia = item.DonGia,
                                    ThanhTien = item.ThanhTien
                                };
                                db.tblSanPhamPhongs.Add(dichVuPhong);
                            }
                        }
                    }

                    db.SaveChanges();

                    response.Message = "Cập nhật thành công.";
                };
            }
            catch (Exception e)
            {
                response.Status = AjaxReponseStatusEnum.Fail;
                response.Message = "Cập nhật thất bại (Exception).";
            }

            return response;
        }

        private AjaxReponseModel<dynamic> PaymentBookingRoom()
        {
            var response = new AjaxReponseModel<dynamic>(AjaxReponseStatusEnum.Success);
            var data = new StreamReader(Request.InputStream).ReadToEnd();
            var dym = JsonConvert.DeserializeObject<BookingRoomModel>(data);

            try
            {
                using (var db = new qlksEntities())
                {
                    var pdp = db.tblPhieuDatPhongs.FirstOrDefault(f => f.MaPhieuDP == dym.MaPhieuDP);
                    if (pdp != null)
                    {
                        pdp.TrangThai = true;

                        var p = db.tblPhongs.FirstOrDefault(f => f.MaPhong == pdp.MaPhong);
                        if (p != null)
                        {
                            p.TrangThai = false;
                        }

                        db.SaveChanges();

                        response.Message = "Trả phòng thành công.";
                    }
                    else
                    {
                        response.Status = AjaxReponseStatusEnum.Fail;
                        response.Message = "Trả phòng thất bại.";
                    }
                };
            }
            catch (Exception e)
            {
                response.Status = AjaxReponseStatusEnum.Fail;
                response.Message = "Trả phòng thất bại (Exception).";
            }

            return response;
        }

        private AjaxReponseModel<dynamic> GetBookingRoom()
        {
            var response = new AjaxReponseModel<dynamic>(AjaxReponseStatusEnum.Success);
            var roomId = int.Parse(Request.Params["RoomId"]);
            var customerId = int.Parse(Request.Params["CustomerId"]);
            var phone = Request.Params["Phone"];
            var maPhieuDP = int.Parse(Request.Params["MaPhieuDP"]);

            using (var db = new qlksEntities())
            {
                var list = db.tblPhieuDatPhongs.Where(w => (maPhieuDP == 0 || w.MaPhieuDP == maPhieuDP) && (roomId == 0 || w.MaPhong == roomId) && (customerId == 0 || w.MaKH == customerId) && (phone == "" || w.tblKhachHang.SDT == phone)).Select(s => new
                {
                    s.MaPhieuDP,
                    s.MaPhong,
                    s.MaKH,
                    s.MaNV,
                    s.NgayBD,
                    s.NgayKT,
                    s.DonGia,
                    s.TongTien,
                    TrangThai = s.TrangThai == null ? false : true,
                    s.tblKhachHang.TenKH,
                    s.tblKhachHang.SDT,
                    s.tblPhong.TenPhong,
                    SanPhamPhong = s.tblSanPhamPhongs.Select(s2 => new
                    {
                        s2.MaSPP,
                        s2.MaPhieuDP,
                        s2.MaSP,
                        s2.tblSanPham.TenSP,
                        s2.SoLuong,
                        s2.DonGia,
                        s2.ThanhTien
                    }).ToList()
                }).ToList();

                response.Data = list;
            };

            return response;
        }
    }
}