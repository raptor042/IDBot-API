import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
    username : { type : String, required : true },
    password : { type : String, required : true },
    address : { type : String, required : true }
})

export const AdminModel = model("Admin", AdminSchema)