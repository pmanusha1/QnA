import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import jwt from 'jsonwebtoken';
import connectDB from './database/db.js';
import { typeDefs } from './schema/schema.js';
import { resolvers } from './schema/resolvers.js';

dotenv.config();
const port = process.env.PORT || 4444;

await connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: Number(port) },
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    if (token) {
      try {
        const user = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        return { user };
      } catch (err) {
        console.error("JWT verification failed:", err.message);
      }
    }
    return {};
  },
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

console.log(`🚀  Server ready at: ${url}`);
