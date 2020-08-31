using System;

namespace QLKS.Class
{
    public class BookingRoomModel
    {
        public int MaPhieuDP { get; set; }
        public int MaKH { get; set; }
        public int MaPhong { get; set; }
        public int MaNV { get; set; }
        public DateTime NgayBD { get; set; }
        public DateTime NgayKT { get; set; }
        public decimal TongTien { get; set; }
        public decimal DonGia { get; set; }
        public SanPhamPhongModel[] SanPhamPhong { get; set; }
    }

    public class SanPhamPhongModel
    {
        public int? MaSPP { get; set; }
        public int MaSP { get; set; }
        public int SoLuong { get; set; }
        public decimal DonGia { get; set; }
        public decimal ThanhTien { get; set; }
    }
}