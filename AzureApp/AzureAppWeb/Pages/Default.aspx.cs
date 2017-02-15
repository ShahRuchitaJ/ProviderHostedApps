using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Microsoft.SharePoint.Client;
using Microsoft.IdentityModel.S2S.Tokens;
using System.Net;
using System.IO;
using System.Xml;

namespace AzureAppWeb
{
    public partial class Default : System.Web.UI.Page
    {
        List<string> listOfUsers = new List<string>();
        List<string> listOfLists = new List<string>();

        protected void Page_PreInit(object sender, EventArgs e)
        {
            Uri redirectUrl;
            switch (SharePointContextProvider.CheckRedirectionStatus(Context, out redirectUrl))
            {
                case RedirectionStatus.Ok:
                    return;
                case RedirectionStatus.ShouldRedirect:
                    Response.Redirect(redirectUrl.AbsoluteUri, endResponse: true);
                    break;
                case RedirectionStatus.CanNotRedirect:
                    Response.Write("An error occurred while processing your request.");
                    Response.End();
                    break;
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            var SPContext = SharePointContextProvider.Current.GetSharePointContext(Context);

            using (var clientContext = SPContext.CreateUserClientContextForSPHost())
            {
                clientContext.Load(clientContext.Web);
                clientContext.ExecuteQuery();
                lblSiteName.Text = clientContext.Web.Title;

                clientContext.Load(clientContext.Web.CurrentUser);
                clientContext.ExecuteQuery();
                lblUserName.Text =  clientContext.Web.CurrentUser.Title ;
            }
        }

        protected void btnUsers_Click(object sender, EventArgs e)
        {
            var SPContext = SharePointContextProvider.Current.GetSharePointContext(Context);

            using (var clientContext = SPContext.CreateUserClientContextForSPHost())
            {
                clientContext.Load(clientContext.Web.CurrentUser);
                clientContext.ExecuteQuery();

                UserCollection users = clientContext.Web.SiteUsers;
                clientContext.Load<UserCollection>(users);
                clientContext.ExecuteQuery();

                foreach (User siteUser in users)
                {
                    listOfUsers.Add(siteUser.Title);
                }
                UserList.DataSource = listOfUsers;
                UserList.DataBind();
            }
        }

        protected void btnLists_Click(object sender, EventArgs e)
        {
            var SPContext = SharePointContextProvider.Current.GetSharePointContext(Context);

            using (var clientContext = SPContext.CreateUserClientContextForSPHost())
            {
                ListCollection lists = clientContext.Web.Lists;
                clientContext.Load<ListCollection>(lists);
                clientContext.ExecuteQuery();

                foreach (List list in lists)
                {
                    listOfLists.Add(list.Title);
                }
                SPList.DataSource = listOfLists;
                SPList.DataBind();
            }
        }

        protected void JSOM_Click(object sender, EventArgs e)
        {
            Response.Redirect("JSOM.aspx?SPHostUrl=" + Request.QueryString["SPHostUrl"] + "&SPAppWebUrl=" + Request.QueryString["SPAppWebUrl"]);
        }
    }
}