import mongoose from "mongoose";
import {configDb} from '../constant/config';


export function dbCreateConnection() {
    mongoose.connect(`mongodb://${configDb.host}:${configDb.port}/${configDb.name}`);
}

export function dbCloseConnection() {
    mongoose.connection.close();
}