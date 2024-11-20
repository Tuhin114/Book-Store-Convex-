import React from "react";
import Card from "../ui/Card";

export interface Book {
  _id: string;
  title: string;
  author: string;
  year: string;
}
interface BooksCardProps {
  books: Book[];
}

const BooksCard: React.FC<BooksCardProps> = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((items, index) => (
        <Card key={index} book={items} />
      ))}
    </div>
  );
};

export default BooksCard;
