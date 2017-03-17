(function() {
    "use strict";

    app.get("/sayHello", function (req, res, next) {
        res.set("Content-Type", "application/javascript");

        const oData = { someObject:
            { hello: "world" }
        };

        res.send(oData);
    });
})();