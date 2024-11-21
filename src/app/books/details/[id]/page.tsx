"use client";

import BackButton from "@/components/ui/BackButton";
import Spinner from "@/components/ui/Spinner";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

const ShowBook = () => {
  const { id } = useParams();
  const bookId = id as Id<"books">;
  const book = useQuery(api.functions.getBook, { id: bookId });

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4">Show Book</h1>
      {!book ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-lift p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book.year}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(book._creationTime).toString()}</span>
          </div>
          {/* <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ShowBook;
