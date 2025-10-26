import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    body: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question', default: null},
    answer: {type: mongoose.Schema.Types.ObjectId, ref: 'Answer', default: null}
}, {
    timestamps: true
});

export default mongoose.model('Comment', commentSchema)