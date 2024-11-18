import Link from "next/link";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = () => {
  return (
    <div className="flex">
      <Link
        href={"/"}
        className="bg-sky-800 text-white px-4 py-1 rounded-lg w-lift"
      >
        <BsArrowLeft className="text-2x1" />
      </Link>
    </div>
  );
};

export default BackButton;
