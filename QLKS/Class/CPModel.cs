using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLKS.Class
{

    public class Product
    {
        public int MaSP { get; set; }
        public string TenSP { get; set; }
        public decimal DonGia { get; set; }
    }

    public class Room
    {
        public int MaPhong { get; set; }
        public string TenPhong { get; set; }
        public bool TrangThai { get; set; }
        public decimal DonGia { get; set; }
    }

    public class Customer
    {
        public int MaKH { get; set; }
        public string TenKH { get; set; }
        public DateTime NgaySinh { get; set; }
        public string DiaChi { get; set; }
        public string SDT { get; set; }
        public string Email { get; set; }
        public string CMND { get; set; }
        public bool GioiTinh { get; set; }
    }
}