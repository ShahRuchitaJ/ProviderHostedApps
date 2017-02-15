<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="JSOM.aspx.cs" Inherits="AzureAppWeb.Pages.JSOM" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="//ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="../Scripts/SharePointController.js"></script>
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <%--<script type="text/javascript" src="../Scripts/CustomJavaScript.js"></script>--%>
</head>
<body style="background-color:azure">
    <form id="form1" runat="server">
        <div >
            <!-- Chrome control placeholder -->
            <div id="chrome_ctrl_placeholder"></div>
            <table>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td>Category Id</td>
                                <td>
                                    <input type="text" id="CategoryId" class="c1" />
                                </td>
                            </tr>
                            <tr>
                                <td>Category Name</td>
                                <td>
                                    <input type="text" id="CategoryName" class="c1" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="button" value="New" id="btn-new" />
                                </td>
                                <td>
                                    <input type="button" value="Add" id="btn-add" />
                                </td>
                                <td>
                                    <input type="button" value="Update" id="btn-update" />
                                </td>
                                <td>
                                    <input type="button" value="Delete" id="btn-delete" />
                                </td>
                                <td>
                                    <input type="button" value="Find" id="btn-find" />
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td>
                        <table id="tblcategories" border="1">
                        </table>
                    </td>
                </tr>
            </table>
            <div id="dvMessage"></div>
        </div>
    </form>
</body>
</html>
