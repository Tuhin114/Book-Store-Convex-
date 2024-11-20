import React from "react";
import Link from "next/link";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

export interface Book {
  _id: string;
  title: string;
  author: string;
  year: string;
}
interface BooksTableProps {
  books: Book[];
  error?: Error | null;
}

const BooksTable: React.FC<BooksTableProps> = ({ books, error }) => {
  return (
    <div>
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-700 rounded-md p-2">#</th>
            <th className="border border-slate-700 rounded-md p-2">Title</th>
            <th className="border border-slate-700 rounded-md p-2 max-md:hidden">
              Author
            </th>
            <th className="border border-slate-700 rounded-md p-2 max-md:hidden">
              Year
            </th>
            <th className="border border-slate-700 rounded-md p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.year}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link href={`/books/details/${book._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link href={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link href={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : error ? (
            <tr>
              <td colSpan={5} className="text-center">
                Error fetching books
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No books available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
