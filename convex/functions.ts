import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Create new book
export const createBook = mutation({
  args: {
    title: v.string(),
    author: v.string(),
    year: v.string(),
  },
  handler: async (ctx, args) => {
    const book = await ctx.db.insert("books", {
      title: args.title,
      author: args.author,
      year: args.year,
    });
    return book;
  },
});

//Get all books
export const getBooks = mutation({
  handler: async (ctx) => {
    const books = await ctx.db.query("books").collect();
    return books;
  },
});

//Get book by id
export const getBook = mutation({
  args: {
    id: v.id("books"),
  },
  handler: async (ctx, args) => {
    const book = await ctx.db.get(args.id);
    return book;
  },
});

//Update book by id
export const updateBook = mutation({
  args: {
    id: v.id("books"),
    title: v.string(),
    author: v.string(),
    year: v.string(),
  },
  handler: async (ctx, args) => {
    const book = await ctx.db.patch(args.id, {
      title: args.title,
      author: args.author,
      year: args.year,
    });
    return book;
  },
});

//Delete book by id
export const deleteBook = mutation({
  args: {
    id: v.id("books"),
  },
  handler: async (ctx, args) => {
    const book = await ctx.db.delete(args.id);
    return book;
  },
});
