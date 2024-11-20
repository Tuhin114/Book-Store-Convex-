"use client";
import BooksCard from "@/components/home/BooksCard";
import BooksTable from "@/components/home/BooksTable";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const books = useQuery(api.functions.getBooks);
  const [showType, setShowType] = useState<"table" | "card">("table");
  const error = null;

  return (
    <div className="p-4">
      {/* View Toggle Buttons */}
      <div className="flex justify-center items-center gap-x-4">
        <button
          aria-pressed={showType === "table"}
          className={`px-4 py-1 rounded-lg ${showType === "table" ? "bg-sky-600" : "bg-sky-300"} hover:bg-sky-600`}
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          aria-pressed={showType === "card"}
          className={`px-4 py-1 rounded-lg ${showType === "card" ? "bg-sky-600" : "bg-sky-300"} hover:bg-sky-600`}
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>

      {/* Header and Add Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl my-8">Books List</h1>
        <Link href="/books">
          <MdOutlineAddBox
            aria-label="Add Book"
            className="text-sky-800 text-4xl"
          />
        </Link>
      </div>

      {/* Books List */}
      {showType === "table" ? (
        <BooksTable books={books} error={error} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
}
