const express = require("express");
//noinspection Eslint
logger = require("eazy-logger").Logger({
    prefix: "{blue:[}{magenta:FST_WS}{blue:] }",
    useLevelPrefixes: true
});
app = express();


require("./routes/index");
require("./routes/sayHello");
app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port"), function() {
    logger.info("Express server listening on port " + server.address().port);
});
