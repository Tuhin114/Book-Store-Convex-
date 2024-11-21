"use client";

import BackButton from "@/components/ui/BackButton";
import Spinner from "@/components/ui/Spinner";
import { useParams, useRouter } from "next/navigation";
import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useMutation } from "convex/react";

const DeleteBook = () => {
  const { id } = useParams();
  const router = useRouter();
  const bookId = id as Id<"books">;
  const deleteBook = useMutation(api.functions.deleteBook);

  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteBook = async () => {
    if (!bookId) {
      enqueueSnackbar("Invalid book ID", { variant: "error" });
      return;
    }
    setLoading(true);
    try {
      await deleteBook({ id: bookId });
      enqueueSnackbar("Book deleted successfully", { variant: "success" });
      router.push("/");
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Failed to delete book", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className="text-2xl">
            Are You Sure You want to Delete this book?
          </h3>
          <button
            className="p-4 bg-red-600 text-white m-8 w-full"
            onClick={handleDeleteBook}
          >
            Yes, I Delete it
          </button>
        </div>
      )}
    </div>
  );
};
export default DeleteBook;
