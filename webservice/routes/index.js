(function () {
    "use strict";

    app.get("/", function (req, res, next) {
        res.set("Content-Type", "text/html");
        res.send("<h1>FST API - welcome</h1>");
    });

})();