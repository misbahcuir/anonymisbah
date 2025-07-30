"use client";
import React from "react";
import { Edit, Trash } from "@deemlol/next-icons";

const TableRow = ({ quote, onEditClick }) => {
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
          <div className="badge badge-soft badge-success">Replied </div>
        ) : (
          <div className="badge badge-soft badge-error">Not Yet</div>
        )}
      </td>
      <td>
        {quote.published ? (
          <div className="badge badge-soft badge-success">Published </div>
        ) : (
          <div className="badge badge-soft badge-error">Private</div>
        )}
      </td>
      <td className="text-center">
        <ul className="menu menu-horizontal bg-base-200 rounded-box">
          <li>
            <button onClick={() => onEditClick(quote._id)}>
              <Edit size={18} color="orange" />
            </button>
          </li>
          <li>
            <a>
              <Trash size={18} color="red" />
            </a>
          </li>
        </ul>
      </td>
    </tr>
  );
};

export default TableRow;
