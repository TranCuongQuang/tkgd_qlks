using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLKS.Class
{
    public class AjaxReponseModel<T>
    {
        public AjaxReponseModel()
        {
            Message = "";
            Status = AjaxReponseStatusEnum.Success;
        }
        public AjaxReponseModel(AjaxReponseStatusEnum status)
        {
            Message = "";
            Status = status;
        }
        public AjaxReponseStatusEnum Status { get; set; }
        public string Message { get; set; }
        public string StatusText { get { return Status.ToString(); } }
        public T Data { get; set; }
        public dynamic Data1 { get; set; }
        public dynamic Data2 { get; set; }
        public dynamic Data3 { get; set; }
        public dynamic Data4 { get; set; }
    }

    public enum AjaxReponseStatusEnum
    {
        Success = 0,
        Fail = -1
    }
}