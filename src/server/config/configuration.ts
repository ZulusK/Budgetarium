require("dotenv").config();
process.env.NODE_CONFIG_DIR = __dirname;
import {IConfig} from "config";
// import * as config from "config";
const config = require("config");
const currConfig: IConfig = config;
export default currConfig;