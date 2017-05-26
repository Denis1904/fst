(function(module) {
    "use strict";

    /* eslint-disable */

    const proxySnippet = require("grunt-connect-proxy2/lib/utils").proxyRequest;
    const serveStatic = require("serve-static");
    const fs = require("fs");
    const path = require("path");

    if (typeof String.prototype.startsWith !== "function") {
        String.prototype.startsWith = function(prefix) {
            return this.indexOf(prefix) === 0;
        };
    }

    module.exports = function(grunt) {
        require("load-grunt-tasks")(grunt, { scope: "devDependencies" });

        let resourceServer;

        let ui5Root;

        if (grunt.option("ui5Version")) {
            let base;

            if (grunt.option("ui5Path")) {
                ui5Root = grunt.option("ui5Path");
            }
            else {
                base = process.env.UI5_LIBS || path.join(__dirname, "sapui5");
                ui5Root = path.join(base, grunt.option("ui5Version"));
            }

            if (fs.existsSync(path.join(ui5Root, "sap-ui-core.js"))) {
                resourceServer = serveStatic(ui5Root);
                console.log("Serving UI5 from " + ui5Root + "\n");
            }
            else {
                console.error("No UI5 installation found in " + ui5Root + "\n");
            }
        }

        grunt.initConfig({
            connect: {
                server: {
                    options: {
                        port: 8081,
                        hostname: "localhost",
                        keepalive: true,
                        middleware: function(connect, options) {
                            return [
                                proxySnippet,
                                function(req, res, next) {
                                    if (req.url.startsWith("/resources") && resourceServer) {
                                        req.url = req.url.replace(/\/resources/, "");
                                        return resourceServer(req, res, next);
                                    }
                                    else {
                                        return next();
                                    }
                                },
                                serveStatic(options.base[0] + "/WebContent")
                            ];
                        }
                    },
                    proxies: [
                        {
                            context: "/proxy",
                            host: "127.0.0.1",
                            port: "3000",
                            https: false,
                            rewrite: {
                                "^/proxy": ""
                            }
                        }
                    ]
                }
            }
        });

        grunt.registerTask("runApp", [
            "configureProxies:server",
            "connect:server"
        ]);


    };
})(module);