import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
    commnets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

export default mongoose.model('Question', questionSchema)