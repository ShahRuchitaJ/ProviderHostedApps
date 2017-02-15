<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="AzureAppWeb.Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body style="background-color:azure">
    <form id="form1" runat="server" >
        <div>
            <asp:Label ID="welcome" runat="server" Text="Welcome to your first Provider Hosted App !" Font-Bold="true" ForeColor="SeaGreen"></asp:Label>
            
            <table border="1"cellpadding="10">
                <tr>
                    <td>Site Name :</td>
                    <td>
                        <asp:Label ID="lblSiteName" runat="server"></asp:Label></td>
                </tr>
                <tr>
                    <td>User Name: </td>
                    <td>
                        <asp:Label ID="lblUserName" runat="server"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Button ID="btnUsers" runat="server" Text ="Show all site users" OnClick="btnUsers_Click" /></td>
                    <td>
                        <asp:ListView ID="UserList" runat="server">
                            <ItemTemplate>
                                <asp:Label ID="UserItem" runat="server"
                                    Text="<%# Container.DataItem.ToString()  %>">
                                </asp:Label><br />
                            </ItemTemplate>
                        </asp:ListView>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Button ID="btnLists" runat="server" Text ="Show all site lists" OnClick="btnLists_Click" /></td>
                    <td>
                        <asp:ListView ID="SPList" runat="server">
                            <ItemTemplate>
                                <asp:Label ID="ListItem" runat="server"
                                    Text="<%# Container.DataItem.ToString()  %>">
                                </asp:Label><br />
                            </ItemTemplate>
                        </asp:ListView>
                    </td>
                </tr>
            </table>
            <asp:Button ID="JSOM" runat="server" Text="Find JSOM Example" OnClick="JSOM_Click" />
        </div>
    </form>
</body>
</html>
