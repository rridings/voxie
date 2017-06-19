// Location polyfill for ie, ff < 21.0 and safari
if (typeof window.location.origin === "undefined"){
    window.location.origin = window.location.protocol + "//" + window.location.host;
}

if ( !sessionStorage.authState ) {
  sessionStorage.authState = "NOT_AUTHENICATED"
}
  
Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);
 
  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});

// Utility (helper) functions
var utils = {

    // Finds a handlebars template by id.
    // Populates it with the passed in data
    // Appends the generated html to supplied container
    renderPageTemplate: function(html, data, container) {
        var _data = data || {};
        
        // Hide whatever page is currently shown.
        $(container)
            .find(".active")
                .hide()
                    .removeClass("active");
        
        $.get(html, function( templateScript ) {
              var template = Handlebars.compile(templateScript);

          // Empty the container and append new content
          $(container).empty();

          // Empty the container and append new content
          $(container).append(template(_data));
        }, 'html'); 
    },

    // If a hash can not be found in routes
    // then this function gets called to show the 404 error page
    pageNotFoundError: function() {

        var data = {
            errorMessage: "404 - Page Not Found"
        };
        this.renderPageTemplate("#error-page-template", data);
    },

    // Fetch json data from the given url
    // @return promise
    fetch: function(url, data) {
        var _data = data || {};
        return $.ajax({
            context: this,
            url: window.location.origin + "/" + url,
            data: _data,
            method: "GET",
            dataType: "JSON"
        });
    }
};


/**
 *  Router - Handles routing and rendering for the order pages
 *
 *  Summary:
 *      - url hash changes
 *      - render function checks routes for the hash changes
 *      - function for that hash gets called and loads page content 
 */
var router = {

    // An object of all the routes
    routes: {},
    init: function() {
        console.log('router was created...');
        this.bindEvents();

        // Manually trigger a hashchange to start the router.
        // This make the render function look for the route called "" (empty string)
        // and call it"s function
        $(window).trigger("hashchange");
    },
    bindEvents: function() {

        // Event handler that calls the render function on every hashchange.
        // The render function will look up the route and call the function
        // that is mapped to the route name in the route map.
        // .bind(this) changes the scope of the function to the
        // current object rather than the element the event is bound to.
        $(window).on("hashchange", this.render.bind(this));
    },
    // Checks the current url hash tag
    // and calls the function with that name
    // in the routes
    render: function() {
        if ( sessionStorage.authState != "AUTHENICATED" ) {
            window.location.hash = "#login";
        }
          
        // Get the keyword from the url.
        var keyName = window.location.hash.split("/")[0];

        // Grab anything after the hash
        var url = window.location.hash;

        // Call the the function
        // by key name
        if (this.routes[keyName]) {
            this.routes[keyName](url);

            // Render the error page if the 
            // keyword is not found in routes.
        } else {
            utils.pageNotFoundError();
        }
    }
};

var spaRoutes = {

    // Default route (home page)
    "#spectator": function(url) {
        console.log('spectator was called...');
        var data = new Object;
        data.template = "spectator.html";
        data.container = "#page-container";
        spectator.init(data, renderPage);
    },
    "#role": function(url) {
        console.log('role was called...');
        var data = new Object;
        data.template = "role.html";
        data.container = "#page-container";
        role.init(data, renderPage);
    },
    "#login": function(url) {
        console.log('login was called...');
        var data = new Object;
        data.template = "login.html";
        data.container = "#page-container";
        login.init(data, renderPage);
    },
    "#performer-detail": function(url) {
        console.log('performer-detail was called...');
        var data = new Object;
        data.template = "performer-detail.html";
        data.container = "#spectator_panel1";
        var uid = window.location.hash.split("/")[1];
        data.uid = uid;
        performerdetail.init(data, renderPage);
    },
    "#performer-video": function(url) {
        console.log('performer-video was called...');
        var data = new Object;
        data.template = "performer-video.html";
        data.container = "#spectator_panel2";
        var uid = window.location.hash.split("/")[1];
        data.uid = uid;
        performervideo.init(data, renderPage);
    }
};

var renderPage = function (data) {
  if ( sessionStorage.user != null ) {
    var user = JSON.parse(sessionStorage.user);
    data.user = user;
  }
  
  utils.renderPageTemplate(data.template, data, data.container);
  if ( data.template == "performer-video.html" ) {
    reloadJs("js/video.js");
    reloadJs("js/uikit.min.js");
  }
}

// Create a new instance of the router
var spaRouter = $.extend({}, router, {
    routes: spaRoutes
});

function reloadJs(src) {
$.getScript(src, function(data, textStatus, jqxhr) {
  console.log(data); //data returned
  console.log(textStatus); //success
  console.log(jqxhr.status); //200
  console.log('Load was performed.');
});

}

spaRouter.init();
window.location.hash = "#spectator";