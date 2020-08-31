using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;

namespace QLKS
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            //System.Net.WebRequest.DefaultWebProxy = null; //https://stackoverflow.com/questions/6988981/webclient-is-very-slow
            //BundleConfig.RegisterBundles(BundleTable.Bundles);

            // Code that runs on application startup
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}