"use client";

import BackButton from "@/components/ui/BackButton";
import Spinner from "@/components/ui/Spinner";
import { useMutation } from "convex/react";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

const CreateBook = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const addBookMutation = useMutation(api.functions.createBook);

  const handleSaveBook = async () => {
    if (!title || !author || !year) {
      enqueueSnackbar("Please fill all the fields", { variant: "error" });
      return;
    }
    setLoading(true);
    try {
      await addBookMutation({ title, author, year });
      enqueueSnackbar("Book created successfully", { variant: "success" });
      router.push("/");
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error creating book", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-center">Create Book</h1>

      {loading && <Spinner />}

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full max-w-lg p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 text-gray-500 px-4 py-2 w-full rounded-md"
            placeholder="Enter book title"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 text-gray-500 px-4 py-2 w-full rounded-md"
            placeholder="Enter author's name"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="border-2 text-gray-500 px-4 py-2 w-full rounded-md"
            placeholder="Enter year of publication"
          />
        </div>
        <button
          className="p-2 bg-sky-300 hover:bg-sky-600 text-white rounded-md mt-4"
          onClick={handleSaveBook}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
