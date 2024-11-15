"use client";
import BooksCard from "@/components/home/BooksCard";
import BooksTable from "@/components/home/BooksTable";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { books } from "@/data";

export default function Home() {
  const [showType, setShowType] = useState<"table" | "card">("table");
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className={`px-4 py-1 rounded-lg ${showType === "table" ? "bg-sky-600" : "bg-sky-300"} hover:bg-sky-600`}
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className={`px-4 py-1 rounded-lg ${showType === "card" ? "bg-sky-600" : "bg-sky-300"} hover:bg-sky-600`}
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-4xl my-8">Books List</h1>
        <Link href="">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>

      {showType === "table" ? (
        <BooksTable books={books} error={null} />
      ) : (
        <BooksCard />
      )}
    </div>
  );
}
