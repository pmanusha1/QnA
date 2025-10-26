import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    body: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

export default mongoose.model('Answer', answerSchema)