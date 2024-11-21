"use client";

import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import Spinner from "@/components/ui/Spinner";
import BackButton from "@/components/ui/BackButton";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");

  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const router = useRouter();

  const bookId = id as Id<"books">;

  // Fetch the book using Convex
  const book = useQuery(api.functions.getBook, { id: bookId });
  const editBook = useMutation(api.functions.updateBook);

  // Populate fields when book data is fetched
  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setPublishYear(book.year); // Ensure consistency with backend data
    }
  }, [book]);

  // Handle book update
  const handleEditBook = async () => {
    try {
      if (!bookId) {
        throw new Error("Invalid book ID");
      }
      await editBook({ id: bookId, title, author, year: publishYear });
      enqueueSnackbar("Book Edited Successfully", { variant: "success" });
      router.push("/");
    } catch (error) {
      enqueueSnackbar("Error Editing Book", { variant: "error" });
      console.error(error);
    }
  };

  // Show loading spinner while fetching book data
  if (!book) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 text-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 text-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 text-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
