"use client";
import React, { useEffect, useState } from "react";
import BlurText from "../../../ReactBits/BlurText/BlurText";
import getQoutes from "../lib/getQoutes";

import { Edit, Trash } from "@deemlol/next-icons";
import getSingleQoutes from "../lib/getSingleQoutes";

const Dashboard = () => {
  const [qoutes, setQoutes] = useState([]);
  const [selectedQoute, setSelectedQoute] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const question = formData.get("question");
    const reply = formData.get("reply");
    const status =
      formData.querySelector('input[name="radio-8"]:checked').value ===
      "publish";
    console.log(question, reply, status);
  };

  useEffect(() => {
    getQoutes().then(setQoutes);
  }, []);

  const handleFetchQoute = async (id) => {
    const singleQoute = await getSingleQoutes(id);
    setSelectedQoute(singleQoute);
    console.log(singleQoute);
    const modal = document.getElementById("edit-modal");
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-2 md:py-5 lg:py-8">
        <BlurText
          text={`Dashboard`}
          delay={150}
          animateBy="words"
          direction="top"
          className="text-4xl md:text-6xl font-semibold text-center"
        />
      </div>
      <div className="max-w-7xl mx-auto p-4">
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Qoute</th>
                <th>Replied</th>
                <th>Published</th>
                <th className="text-center">Edit</th>
              </tr>
            </thead>
            <tbody>
              {qoutes.map((qoute) => (
                <tr key={qoute.id}>
                  <td>
                    {new Date(qoute.submissionTime).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Dhaka", // change this to your preferred time zone
                    })}
                  </td>
                  <td>{qoute.question}</td>
                  <td>
                    {qoute.reply ? (
                      <div className="badge badge-soft badge-success">
                        Replied{" "}
                      </div>
                    ) : (
                      <div className="badge badge-soft badge-error">
                        Not Yet
                      </div>
                    )}
                  </td>
                  <td>
                    {qoute.published ? (
                      <div className="badge badge-soft badge-success">
                        Published{" "}
                      </div>
                    ) : (
                      <div className="badge badge-soft badge-error">
                        Private
                      </div>
                    )}
                  </td>
                  <td className="text-center">
                    <ul className="menu menu-horizontal bg-base-200 rounded-box">
                      <li>
                        <button
                          onClick={() => {
                            handleFetchQoute(qoute._id);
                          }}
                        >
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <dialog id="edit-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className=" py-4 px-2">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <h6 className="text-amber-500 text-sm">Anonymous Text-</h6>
                <textarea
                  name="question"
                  defaultValue={selectedQoute?.question || ""}
                  className="textarea textarea-bordered w-full h-36"
                ></textarea>
              </div>
              <div>
                <h6 className="text-amber-500 text-sm">Reply</h6>
                <textarea
                  name="reply"
                  defaultValue={selectedQoute?.reply || ""}
                  className="textarea textarea-bordered w-full h-36"
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <h6 className="text-amber-500 text-sm">Publish the Qoute</h6>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="radio-8"
                      className="radio text-amber-600"
                      defaultChecked
                    />
                    <span className="text-base text-amber-600">Private</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="radio-8"
                      className="radio text-amber-600"
                    />
                    <span className="text-base text-amber-600">Publish</span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-soft btn-warning text-amber-700 hover:bg-amber-600 hover:text-white rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Dashboard;
