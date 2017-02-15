var hostweburl, appweburl, context, appContextSite, scriptbase;

var self = this;
SharePointController = function () {

    //load the SharePoint resources
    this.go = function () {
        //Get the URI decoded URL.
        hostweburl = decodeURIComponent(getQueryStringParameter('SPHostUrl'));
        appweburl = decodeURIComponent(getQueryStringParameter('SPAppWebUrl'));



        // The SharePoint js files URL are in the form:
        // web_url/_layouts/15/resource
        scriptbase = hostweburl + "/_layouts/15/";

        $.getScript(scriptbase + "SP.UI.Controls.js", this.renderChrome);

        //load all appropriate scripts for the page to function
        $.getScript(scriptbase + 'sp.runtime.js', function () {
            $.getScript(scriptbase + 'sp.js', function () {
                $.getScript(scriptbase + 'sp.core.js', function () {
                    $.getScript(scriptbase + 'init.js', function () {
                        $.getScript(scriptbase + 'SP.RequestExecutor.js', registerContextAndProxy);
                    });
                });
            });
        });
    };

    //Function to prepare the options and render the control
    this.renderChrome = function () {
        // The Help, Account and Contact pages receive the 
        //   same query string parameters as the main page
        var options = {
            "appIconUrl": "AppIcon.png",
            "appTitle": "Provider Hosted App Using JSOM",
            "appHelpPageUrl": "Help.html?"
                + document.URL.split("?")[1],
            "settingsLinks": [
                {
                    "linkUrl": "Account.html?"
                        + document.URL.split("?")[1],
                    "displayName": "Account settings"
                },
                {
                    "linkUrl": "Contact.html?"
                        + document.URL.split("?")[1],
                    "displayName": "Contact us"
                }
            ]
        };

        var nav = new SP.UI.Controls.Navigation(
                                "chrome_ctrl_placeholder",
                                options
                            );
        nav.setVisible(true);
    }



    this.isSharePoint = function () {
        if (getQueryStringParameter('SPHostUrl'))
            return true;
        else
            return false;
    }

};

//function to load context and wire up proxy for OAuth calls in CSOM
function registerContextAndProxy() {
    context = new SP.ClientContext(appweburl);
    var factory = new SP.ProxyWebRequestExecutorFactory(appweburl);
    context.set_webRequestExecutorFactory(factory);
    appContextSite = new SP.AppContextSite(context, hostweburl);

    if (typeof SharePointLoaded == 'function') {
        SharePointLoaded();
    }
    listAllCategories();

    $("#btn-new").on('click', function () {
        $(".c1").val('');
    });


    $("#btn-add").on('click', function () {
        createCategory();
        listAllCategories();
    });

    $("#btn-update").on('click', function () {
        updateItem();
        listAllCategories();
    });

    $("#btn-find").on('click', function () {
        findListItem();
    });


    $("#btn-delete").on('click', function () {
        deleteListItem();
        listAllCategories();
    });
}

function listAllCategories() {

    var ctx = new SP.ClientContext(appweburl);
    var factory = new SP.ProxyWebRequestExecutorFactory(appweburl);
    ctx.set_webRequestExecutorFactory(factory);
    var appCtxSite = new SP.AppContextSite(ctx, hostweburl);

    var web = appCtxSite.get_web(); //Get the Web 

    var list = web.get_lists().getByTitle("CategoryList"); //Get the List

    var query = new SP.CamlQuery(); //The Query object. This is used to query for data in the List

    query.set_viewXml('<View><RowLimit></RowLimit>10</View>');

    var items = list.getItems(query);

    ctx.load(list); //Retrieves the properties of a client object from the server.
    ctx.load(items);

    var table = $("#tblcategories");
    var innerHtml = "<tr><td>ID</td><td>Category Id</td><td>Category Name</td></tr>";

    //Execute the Query Asynchronously
    ctx.executeQueryAsync(
        Function.createDelegate(this, function () {
            var itemInfo = '';
            var enumerator = items.getEnumerator();
            while (enumerator.moveNext()) {
                var currentListItem = enumerator.get_current();
                innerHtml += "<tr><td>" + currentListItem.get_item('ID') + "</td><td>" + currentListItem.get_item('Title') + "</td><td>" + currentListItem.get_item('CategoryName') + "</td></tr>";
            }
            table.html(innerHtml);
        }),
        Function.createDelegate(this, fail)
        );

}

function createCategory() {
    var ctx = new SP.ClientContext(appweburl);
    var factory = new SP.ProxyWebRequestExecutorFactory(appweburl);
    ctx.set_webRequestExecutorFactory(factory);
    var appCtxSite = new SP.AppContextSite(ctx, hostweburl);

    var web = appCtxSite.get_web(); //Get the Site 

    var list = web.get_lists().getByTitle("CategoryList"); //Get the List based upon the Title
    var listCreationInformation = new SP.ListItemCreationInformation(); //Object for creating Item in the List
    var listItem = list.addItem(listCreationInformation);

    listItem.set_item("Title", $("#CategoryId").val());
    listItem.set_item("CategoryName", $("#CategoryName").val());
    listItem.update(); //Update the List Item

    ctx.load(listItem);
    //Execute the batch Asynchronously
    ctx.executeQueryAsync(
        Function.createDelegate(this, success),
        Function.createDelegate(this, fail)
       );
}

function findListItem() {

    listItemId = prompt("Enter the Id to be Searched ");
    var ctx = new SP.ClientContext(appweburl);
    var factory = new SP.ProxyWebRequestExecutorFactory(appweburl);
    ctx.set_webRequestExecutorFactory(factory);
    var appCtxSite = new SP.AppContextSite(ctx, hostweburl);

    var web = appCtxSite.get_web();

    var list = web.get_lists().getByTitle("CategoryList");

    ctx.load(list);

    listItemToUpdate = list.getItemById(listItemId);

    ctx.load(listItemToUpdate);

    ctx.executeQueryAsync(
        Function.createDelegate(this, function () {
            //Display the Data into the TextBoxes
            $("#CategoryId").val(listItemToUpdate.get_item('Title'));
            $("#CategoryName").val(listItemToUpdate.get_item('CategoryName'));
        }),
        Function.createDelegate(this, fail)
        );


}

function updateItem() {
    listItemId = prompt("Enter the Id to be Searched ");
    var ctx = new SP.ClientContext(appweburl);
    var factory = new SP.ProxyWebRequestExecutorFactory(appweburl);
    ctx.set_webRequestExecutorFactory(factory);
    var appCtxSite = new SP.AppContextSite(ctx, hostweburl);

    var web = appCtxSite.get_web();

    var list = web.get_lists().getByTitle("CategoryList");
    ctx.load(list);

    listItemToUpdate = list.getItemById(listItemId);

    ctx.load(listItemToUpdate);

    listItemToUpdate.set_item('CategoryName', $("#CategoryName").val());
    listItemToUpdate.update();

    ctx.executeQueryAsync(
        Function.createDelegate(this, success),
        Function.createDelegate(this, fail)
        );

}

function deleteListItem() {
    listItemId = prompt("Enter the Id to be Deleted ");
    var ctx = new SP.ClientContext(appweburl);
    var factory = new SP.ProxyWebRequestExecutorFactory(appweburl);
    ctx.set_webRequestExecutorFactory(factory);
    var appCtxSite = new SP.AppContextSite(ctx, hostweburl);

    var web = appCtxSite.get_web();

    var list = web.get_lists().getByTitle("CategoryList");
    ctx.load(list);

    listItemToUpdate = list.getItemById(listItemId);

    ctx.load(listItemToUpdate);

    listItemToUpdate.deleteObject();

    ctx.executeQueryAsync(
        Function.createDelegate(this, success),
        Function.createDelegate(this, fail)
        );
}


// Function to retrieve a query string value.
// For production purposes you may want to use
//  a library to handle the query string.

getQueryStringParameter = function (paramToRetrieve) {
    var qsSplit = document.URL.split("?");
    if (qsSplit.length > 1) {
        var qs = document.URL.split("?")[1];
        var params = qs.split("&");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == paramToRetrieve)
                return singleParam[1];
        }
    }
};

function success() {
    $("#dvMessage").text("Operation Completed Successfully");
}

function fail() {
    $("#dvMessage").text("Operation failed  " + arguments[1].get_message());
}

