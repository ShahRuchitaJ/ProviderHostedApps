function SharePointLoaded() {
    //This is just an example of a JSOM call we can make now that the appContextSite is loaded
    this.web = appContextSite.get_web();
    context.load(this.web);

    context.executeQueryAsync(
        Function.createDelegate(this, successHandler),
        Function.createDelegate(this, errorHandler)
    );
}

function successHandler() {
    alert("Succesffully created cross-domain call. Host website name is: " + web.get_title());
}

function errorHandler(data, errorCode, errorMessage) {
    alert("Could not complete cross-domain call");
}

var spController = new SharePointController();
spController.go();


