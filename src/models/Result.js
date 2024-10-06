import { Schema , model , models } from "mongoose";

const ResultSchema = new Schema({
    domain : {
        type : String,
        required : true,
    },
    keyword : {
        type : String,
        required : true,
    },
    position : {
        type : Number,
        required : true,
    },
} , {timestamps : true});

export const Result = models?.Result || model('Result' , ResultSchema);