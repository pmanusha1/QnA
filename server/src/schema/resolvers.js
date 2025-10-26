import Question from "../models/Question.js";
import User from "../models/User.js";
import Answer from "../models/Answer.js";
import Comment from "../models/Comment.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const resolvers = {
  Query: {
    users: async () => await User.find(),
    questions: async () => await Question.find(),
    question: async (_, { id }) => await Question.findById(id),
  },

  Mutation: {
    register: async (_, { name, email, password }) => {
      const exist = await User.findOne({ email });
      if (exist) throw new Error("Email already registered");

      // const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid credentials");


      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      return { token, user };
    },

    createQuestion: async (_, { title, body }, context) => {
      if (!context.user) throw new Error("Unauthorized");

      const question = await Question.create({
        title,
        body,
        author: context.user.id,
      });

      await User.findByIdAndUpdate(context.user.id, {
        $push: { questions: question._id },
      });

      return question;
    },

    createAnswer: async (_, { body, questionId }, context) => {
      if (!context.user) throw new Error("Unauthorized");

      const answer = await Answer.create({ body, author: context.user.id, question: questionId });
      await Question.findByIdAndUpdate(questionId, {
        $push: { answers: answer._id },
      });
      return answer;
    },

    createCommentOnQuestion: async (_, { body, questionId }, context) => {
      if (!context.user) throw new Error("Unauthorized");

      const comment = await Comment.create({
        body,
        author: context.user.id,
        question: questionId,
      });
      await Question.findByIdAndUpdate(questionId, {
        $push: { comments: comment._id },
      });
      return comment;
    },

    createCommentOnAnswer: async (_, { body, answerId }, context) => {
      if (!context.user) throw new Error("Unauthorized");

      const comment = await Comment.create({
        body,
        author: context.user.id,
        answer: answerId,
      });
      await Answer.findByIdAndUpdate(answerId, {
        $push: { comments: comment._id },
      });
      return comment;
    },
  },

  User: {
    questions: (parent) => Question.find({ author: parent.id }),
  },

  Question: {
    author: async (parent) => await User.findById(parent.author),
    answers: async (parent) => await Answer.find({ question: parent.id }),
    comments: async (parent) => await Comment.find({ question: parent.id }),
  },

  Answer: {
    author: async (parent) => await User.findById(parent.author),
    question: async (parent) => await Question.findById(parent.question),
    comments: async (parent) => await Comment.find({ answer: parent.id }),
  },

  Comment: {
    author: async (parent) => await User.findById(parent.author),
    question: async (parent) =>
      parent.question ? await Question.findById(parent.question) : null,
    answer: async (parent) =>
      parent.answer ? await Answer.findById(parent.answer) : null,
  },
};
