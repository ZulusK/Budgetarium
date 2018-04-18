"use strict";
require("module-alias/register");
const path = require("path");
const bodyParser = require("body-parser");
const lusca = require("lusca");
const expressValidator = require("express-validator");
const cors = require("cors");
const errorhandler = require("errorhandler");
const express = require("express");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const morgan = require("morgan");
import config from "@config";
import { Logger } from "@utils";
import { Application } from "express";
import controllers from "@controllers/index";

const busboyBodyParser = require("busboy-body-parser");

const logs = Logger(module);

class App {
    public static getInstance(): App {
        if (!this.instance) {
            this.instance = new App();
        }
        return this.instance;
    }

    private static instance: App;

    private readonly app: Application;

    private constructor() {
        try {
            this.app = require("express")();
            this.configure();
            // connect to DB
            this.connectToDB();
            // configure app
            this.usePlugins();
            // configure routes
            this.routes();
        } catch (e) {
            logs.error("Catch error while construct app");
            logs.error(e);
        }
    }

    public getApp(): Application {
        return this.app;
    }

    private connectToDB(): void {
        logs.debug(`Try to connect to ${config.get("DB_URL")}`);
        mongoose.Promise = bluebird;
        mongoose.connect(config.get("DB_URL"))
            .then(() => {
                logs.info("Connected to MongoDB");
            }).catch((err: any) => {
                logs.error("MongoDB connection error. Please make sure MongoDB is running. " + err);
                logs.debug("Check DB's availability");
            });
    }

    private normalizePort(val: string): any {
        const port = parseInt(val, 10);
        if (isNaN(port)) {
            // named pipe
            return val;
        }
        if (port >= 0) {
            // port number
            return port;
        }
        return false;
    }

    private configure(): void {
        this.app.set("port", this.normalizePort(process.env.PORT || "3000"));
    }

    private usePlugins(): void {
        this.app.use(morgan(":method :url :status - :response-time ms"));
        this.app.use(errorhandler());
        this.app.use(cors());
        this.app.use(/\/((?!graphql).)*/, bodyParser.urlencoded({ extended: true }));
        this.app.use(/\/((?!graphql).)*/, bodyParser.json());
        this.app.use(expressValidator());
        this.app.use(lusca.xframe("SAMEORIGIN"));
        this.app.use(lusca.xssProtection(true));
        this.app.use(express.static(path.join(__dirname, "public"), { maxAge: "10h" }));
        this.app.use(busboyBodyParser());
        logs.info("App configured");
    }

    private routes(): void {
        this.app.use(controllers);
        logs.info("App connected routes");
    }
}

export default App;
