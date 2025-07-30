"use client";
import React from "react";
import { Edit, Trash } from "@deemlol/next-icons";
import deleteQuote from "../lib/deleteQuote";
import toast from "react-hot-toast";

const TableRow = ({ quote, onEditClick, onDeleteSuccess, onDeleteClick }) => {
  const handleDeleteClick = () => {
    onDeleteClick(quote);
  };

  return (
    <tr key={quote.id}>
      <td>
        {new Date(quote.submissionTime).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Dhaka", // change this to your preferred time zone
        })}
      </td>
      <td>{quote.question}</td>
      <td>
        {quote.reply ? (
          <div className="badge badge-soft bg-green-950 border-green-950 badge-success">
            Replied{" "}
          </div>
        ) : (
          <div className="badge badge-soft badge-error bg-red-950 border-red-950">
            Not Yet
          </div>
        )}
      </td>
      <td>
        {quote.published ? (
          <div className="badge badge-soft badge-success bg-green-950 border-green-950">
            Published{" "}
          </div>
        ) : (
          <div className="badge badge-soft badge-error bg-red-950 border-red-950">
            Private
          </div>
        )}
      </td>
      <td className="text-center">
        <ul className="menu menu-horizontal bg-transparent border border-amber-950 rounded-box">
          <li>
            <button onClick={() => onEditClick(quote._id)}>
              <Edit size={18} color="orange" />
            </button>
          </li>
          <li>
            <button onClick={handleDeleteClick}>
              <Trash size={18} color="red" />
            </button>
          </li>
        </ul>
      </td>
    </tr>
  );
};

export default TableRow;
