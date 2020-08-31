using Newtonsoft.Json;
using QLKS.Class;
using System;
using System.IO;
using System.Linq;

namespace QLKS
{
    public partial class WebServiceCP : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var a = Request;
            var action = Request.Params["Action"];
            Response.ContentType = "application/json; charset=utf-8";

            switch (action)
            {
                //KH
                case "GetCustomerList":
                    Response.Write(JsonConvert.SerializeObject(GetCustomerList()));
                    Response.End();
                    break;

                case "GetCustomerByID":
                    Response.Write(JsonConvert.SerializeObject(GetCustomerByID()));
                    Response.End();
                    break;

                case "CreateCustomer":
                    Response.Write(JsonConvert.SerializeObject(CreateCustomer()));
                    Response.End();
                    break;

                case "UpdateCustomer":
                    Response.Write(JsonConvert.SerializeObject(UpdateCustomer()));
                    Response.End();
                    break;

                case "DeleteCustomer":
                    Response.Write(JsonConvert.SerializeObject(DeleteCustomer()));
                    Response.End();
                    break;

                //Phong
                case "GetRoomList":
                    Response.Write(JsonConvert.SerializeObject(GetRoomList()));
                    Response.End();
                    break;

                case "GetRoomByID":
                    Response.Write(JsonConvert.SerializeObject(GetRoomByID()));
                    Response.End();
                    break;

                //Sản phẩm
                case "GetProductList":
                    Response.Write(JsonConvert.SerializeObject(GetProductList()));
                    Response.End();
                    break;

                case "GetProductByID":
                    Response.Write(JsonConvert.SerializeObject(GetProductByID()));
                    Response.End();
                    break;

                case "CreateProduct":
                    Response.Write(JsonConvert.SerializeObject(CreateProduct()));
                    Response.End();
                    break;

                case "UpdateProduct":
                    Response.Write(JsonConvert.SerializeObject(UpdateProduct()));
                    Response.End();
                    break;

                case "DeleteProduct":
                    Response.Write(JsonConvert.SerializeObject(DeleteProduct()));
                    Response.End();
                    break;

                default:
                    Response.End();
                    break;
            }
        }

        #region Khách hàng

        private AjaxReponseModel<dynamic> GetCustomerList()
        {
            var response = new AjaxReponseModel<dynamic>(AjaxReponseStatusEnum.Success);
            try
            {
                var data = new StreamReader(Request.InputStream).ReadToEnd();
                var dym = JsonConvert.DeserializeObject<dynamic>(data);
                string maKH = dym.MaKH;
                string tenKH = dym.TenKH;
                using (var ctx = new qlksEntities())
                {
                    var emp = ctx.tblKhachHangs.AsEnumerable()
                        .Where(st => (maKH == "" || st.MaKH == Convert.ToInt32(maKH)) && (tenKH == "" || st.TenKH == tenKH))
                        .Select(st => new
                        {
                            st.MaKH,
                            st.TenKH,
                            st.SDT,
                            NgaySinh = st.NgaySinh.GetValueOrDefault().ToString("dd-MM-yyyy"),
                            st.Email,
                            st.DiaChi,
                            st.CMND,
                            st.GioiTinh
                        }).ToList();
                    response.Data = emp;
                }
                return response;
            }
            catch (Exception e)
            {
                return response;
            }
            finally
            {
            }
        }

        private AjaxReponseModel<dynamic> GetCustomerByID()
        {
            var response = new AjaxReponseModel<dynamic>(AjaxReponseStatusEnum.Success);
            try
            {
                var data = new StreamReader(Request.InputStream).ReadToEnd();
                var dym = JsonConvert.DeserializeObject<Customer>(data);
                int maKH = dym.MaKH;
                using (var ctx = new qlksEntities())
                {
                    //var emp1 = ctx.tblNhanViens.ToList();
                    var emp = ctx.tblKhachHangs.AsEnumerable().Select(st => new
                    {
                        st.MaKH,
                        st.TenKH,
                        st.SDT,
                        NgaySinh = st.NgaySinh.GetValueOrDefault().ToString("dd-MM-yyyy"),
                        st.Email,
                        st.DiaChi,
                        st.CMND,
                        st.GioiTinh
                    }).Where(st => st.MaKH == maKH).ToList();
                    response.Data = emp;
                }
                return response;
            }
            catch (Exception e)
            {
                return response;
            }
            finally
            {
            }
        }

        private AjaxReponseModel<dynamic> CreateCustomer()
        {
            var response = new AjaxReponseModel<dynamic>(AjaxReponseStatusEnum.Success);
            try
            {
                var data = new StreamReader(Request.InputStream).ReadToEnd();
                var dym = JsonConvert.DeserializeObject<Customer>(data);

                using (var db = new qlksEntities())
                {
                    tblKhachHang kh = new tblKhachHang();
                    kh.TenKH = String.IsNullOrEmpty(dym.TenKH.ToString()) ? String.Empty : dym.TenKH.ToString().Trim();
                    kh.SDT = String.IsNullOrEmpty(dym.SDT.ToString()) ? String.Empty : dym.SDT.ToString().Trim();
                    kh.Email = String.IsNullOrEmpty(dym.Email.ToString()) ? String.Empty : dym.Email.ToString().Trim();
                    kh.DiaChi = String.IsNullOrEmpty(dym.DiaChi.ToString()) ? String.Empty : dym.DiaChi.ToString().Trim();
                    kh.NgaySinh = dym.NgaySinh;
                    kh.GioiTinh = dym.GioiTinh;
                    kh.CMND = dym.CMND;

                    db.tblKhachHangs.Add(kh);
                    db.SaveChanges();
                    response.Message = "SUCCESS";
                    response.Data = kh;
                };
                return response;
            }
            catch (Exception e)
            {
                response.Message = "ERROR";
                return response;
            }
            finally
            {
            }
        }

        private AjaxReponseModel<dynamic> UpdateCustomer()
        {
            var response = new AjaxReponseModel<dynamic>(AjaxReponseStatusEnum.Success);
            try
            {
                var data = new StreamReader(Request.InputStream).ReadToEnd();
                var dym = JsonConvert.DeserializeObject<Customer>(data);
                int maKH = dym.MaKH;
                using (var db = new qlksEntities())
                {
                    tblKhachHang kh = db.tblKhachHangs.SingleOrDefault(w => w.MaKH == maKH);
                    kh.TenKH = String.IsNullOrEmpty(dym.TenKH.ToString()) ? String.Empty : dym.TenKH.ToString().Trim();
                    kh.SDT = String.IsNullOrEmpty(dym.SDT.ToString()) ? String.Empty : dym.SDT.ToString().Trim();
                    kh.Email = String.IsNullOrEmpty(dym.Email.ToString()) ? String.Empty : dym.Email.ToString().Trim();
                    kh.DiaChi = String.IsNullOrEmpty(dym.DiaChi.ToString()) ? String.Empty : dym.DiaChi.ToString().Trim();
                    kh.NgaySinh = dym.NgaySinh;
                    kh.GioiTinh = dym.GioiTinh;
                    kh.CMND = dym.CMND;

                    db.SaveChanges();
                    response.Message = "SUCCESS";
                };

                return response;
            }
            catch (Exception e)
            {
                response.Message = "ERROR";
                return response;
            }
            finally
            {
            }
        }

        private AjaxReponseModel<dynamic> DeleteCustomer()
        {
            var response = new AjaxReponseModel<dynamic>(AjaxReponseStatusEnum.Success);
            try
            {
                var data = new StreamReader(Request.InputStream).ReadToEnd();
                var dym = JsonConvert.DeserializeObject<Customer>(data);
                int maKH = dym.MaKH;
                using (var db = new qlksEntities())
                {
                    tblKhachHang kh = db.tblKhachHangs.SingleOrDefault(w => w.MaKH == maKH);
                    tblPhieuDatPhong pdp = db.tblPhieuDatPhongs.SingleOrDefault(w => w.MaKH == maKH);
                    if (pdp != null && pdp.MaPhieuDP > 0)
                    {
                        response.Message = "PDP_EXIST";
                    }
                    else
                    {
                        db.tblKhachHangs.Remove(kh);
                        db.SaveChanges();
                        response.Message = "SUCCESS";
                    }
                };

                return response;
            }
            catch (Exception e)
            {
                response.Message = "ERROR";
                return response;
            }
            finally
            {
            }
        }

        #endregion Khách hàng

        #region Phòng

        private AjaxReponseModel<dynamic> GetRoomList()
        {
            var response = new AjaxReponseModel<dynamic>(AjaxReponseStatusEnum.Success);
            try
            {
                var data = new StreamReader(Request.InputStream).ReadToEnd();
                var dym = JsonConvert.DeserializeObject<dynamic>(data);
                string maPhong = dym.MaPhong;
                string tenPhong = dym.TenPhong;
                string trangThai = dym.TrangThai;
                using (var ctx = new qlksEntities())
                {
                    var emp = ctx.tblPhongs.AsEnumerable()
                        .Where(st => (maPhong == "" || st.MaPhong == Convert.ToInt32(maPhong)) && (tenPhong == "" || st.TenPhong == tenPhong) && (trangThai == "" || st.TrangThai == trangThai.Equals("1")))
                        .Select(st => new
                        {
                            st.MaPhong,
                            st.TenPhong,
                            st.DonGia,
                            StrTrangThai = st.TrangThai == true ? "Đã đặt" : "Trống",
                            TrangThai = Convert.ToInt32(st.TrangThai)
                        }).ToList();
                    response.Data = emp;
                }
                return response;
            }
            catch (Exception e)
            {
                return response;
            }
            finally
            {
            }
        }

        private AjaxReponseModel<dynamic> GetRoomByID()
        {
            var response = new AjaxReponseModel<dynamic>(AjaxReponseStatusEnum.Success);
            try
            {
                var data = new StreamReader(Request.InputStream).ReadToEnd();
                var dym = JsonConvert.DeserializeObject<Room>(data);
                int maPhong = dym.MaPhong;
                using (var ctx = new qlksEntities())
                {
                    var emp = ctx.tblPhongs.AsEnumerable().Where(st => st.MaPhong == maPhong).Select(st => new
                    {
                        st.MaPhong,
                        st.TenPhong,
                        st.DonGia,
                        StrTrangThai = st.TrangThai == true ? "Đã đặt" : "Trống",
                        TrangThai = Convert.ToInt32(st.TrangThai)
                    }).ToList();
                    response.Data = emp;
                }
                return response;
            }
            catch (Exception e)
            {
                return response;
            }
            finally
            {
            }
        }

        #endregion Phòng

        #region Sản phẩm

        private AjaxReponseModel<dynamic> GetProductList()
        {
            var response = new AjaxReponseModel<dynamic>(AjaxReponseStatusEnum.Success);
            try
            {
                var data = new StreamReader(Request.InputStream).ReadToEnd();
                var dym = JsonConvert.DeserializeObject<dynamic>(data);
                string maSP = dym.MaSP;
                string tenSP = dym.TenSP;
                using (var ctx = new qlksEntities())
                {
                    var emp = ctx.tblSanPhams.AsEnumerable()
                        .Where(st => (maSP == "" || st.MaSP == Convert.ToInt32(maSP)) && (tenSP == "" || st.TenSP == tenSP))
                        .Select(st => new
                        {
                            st.MaSP,
                            st.TenSP,
                            st.DonGia
                        }).ToList();
                    response.Data = emp;
                }
                return response;
            }
            catch (Exception e)
            {
                return response;
            }
            finally
            {
            }
        }

        private AjaxReponseModel<dynamic> GetProductByID()
        {
            var response = new AjaxReponseModel<dynamic>(AjaxReponseStatusEnum.Success);
            try
            {
                var data = new StreamReader(Request.InputStream).ReadToEnd();
                var dym = JsonConvert.DeserializeObject<Product>(data);
                int maSP = dym.MaSP;
                using (var ctx = new qlksEntities())
                {
                    var emp = ctx.tblSanPhams.AsEnumerable().Select(st => new
                    {
                        st.MaSP,
                        st.TenSP,
                        st.DonGia
                    }).Where(st => st.MaSP == maSP).ToList();
                    response.Data = emp;
                }
                return response;
            }
            catch (Exception e)
            {
                return response;
            }
            finally
            {
            }
        }

        private AjaxReponseModel<dynamic> CreateProduct()
        {
            var response = new AjaxReponseModel<dynamic>(AjaxReponseStatusEnum.Success);
            try
            {
                var data = new StreamReader(Request.InputStream).ReadToEnd();
                var dym = JsonConvert.DeserializeObject<Product>(data);

                using (var db = new qlksEntities())
                {
                    tblSanPham sp = new tblSanPham();
                    sp.TenSP = String.IsNullOrEmpty(dym.TenSP.ToString()) ? String.Empty : dym.TenSP.ToString().Trim();
                    sp.DonGia = dym.DonGia;

                    db.tblSanPhams.Add(sp);
                    db.SaveChanges();
                    response.Message = "SUCCESS";
                };
                return response;
            }
            catch (Exception e)
            {
                response.Message = "ERROR";
                return response;
            }
            finally
            {
            }
        }

        private AjaxReponseModel<dynamic> UpdateProduct()
        {
            var response = new AjaxReponseModel<dynamic>(AjaxReponseStatusEnum.Success);
            try
            {
                var data = new StreamReader(Request.InputStream).ReadToEnd();
                var dym = JsonConvert.DeserializeObject<Product>(data);
                int maSP = dym.MaSP;
                using (var db = new qlksEntities())
                {
                    tblSanPham sp = db.tblSanPhams.SingleOrDefault(w => w.MaSP == maSP);
                    sp.TenSP = String.IsNullOrEmpty(dym.TenSP.ToString()) ? String.Empty : dym.TenSP.ToString().Trim();
                    sp.DonGia = dym.DonGia;

                    db.SaveChanges();
                    response.Message = "SUCCESS";
                };

                return response;
            }
            catch (Exception e)
            {
                response.Message = "ERROR";
                return response;
            }
            finally
            {
            }
        }

        private AjaxReponseModel<dynamic> DeleteProduct()
        {
            var response = new AjaxReponseModel<dynamic>(AjaxReponseStatusEnum.Success);
            try
            {
                var data = new StreamReader(Request.InputStream).ReadToEnd();
                var dym = JsonConvert.DeserializeObject<Product>(data);
                int maSP = dym.MaSP;
                using (var db = new qlksEntities())
                {
                    tblSanPham sp = db.tblSanPhams.SingleOrDefault(w => w.MaSP == maSP);
                    tblSanPhamPhong pdp = db.tblSanPhamPhongs.SingleOrDefault(w => w.MaSP == maSP);
                    if (pdp != null && pdp.MaPhieuDP > 0)
                    {
                        response.Message = "PDP_EXIST";
                    }
                    else
                    {
                        db.tblSanPhams.Remove(sp);
                        db.SaveChanges();
                        response.Message = "SUCCESS";
                    }
                };

                return response;
            }
            catch (Exception e)
            {
                response.Message = "ERROR";
                return response;
            }
            finally
            {
            }
        }

        #endregion Sản phẩm
    }
}