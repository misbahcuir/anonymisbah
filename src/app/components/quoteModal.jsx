"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import getSinglequotes from "../lib/getSingleQoutes";
import updateQuote from "../lib/updateQuote";
import toast from "react-hot-toast";

const QuoteModal = ({ quoteId, isOpen, onClose, onSuccess }) => {
  const [selectedquote, setSelectedquote] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [publishStatus, setPublishStatus] = useState("private");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const question = formData.get("question");
    const reply = formData.get("reply");
    const published =
      e.target.querySelector('input[name="radio-8"]:checked').value ===
      "publish";

    try {
      await updateQuote(quoteId, {
        question,
        reply,
        published,
      });

      toast.success("Quote updated successfully");
      onSuccess?.(); // Call success callback if provided
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Failed to update quote:", error);
      toast.error("Failed to update quote. Please try again.");
    }
  };

  const handleFetchquote = async (id) => {
    try {
      setIsLoading(true);

      const singlequote = await getSinglequotes(id);

      setSelectedquote(singlequote);
      // Set the publish status based on the fetched quote
      setPublishStatus(singlequote?.published ? "publish" : "private");
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && quoteId) {
      handleFetchquote(quoteId);
    }
  }, [isOpen, quoteId]);

  // Don't render anything during SSR
  if (!mounted) return null;

  // Don't render if not open
  if (!isOpen) return null;

  const modalContent = (
    <dialog id={`edit-modal-${quoteId}`} className="modal modal-open">
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <div className="py-4 px-2">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <span className="loading loading-ring loading-xl text-amber-600"></span>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <h6 className="text-amber-500 text-sm">Anonymous Text-</h6>
                <textarea
                  name="question"
                  defaultValue={selectedquote?.question || ""}
                  className="textarea textarea-bordered w-full h-36"
                ></textarea>
              </div>
              <div>
                <h6 className="text-amber-500 text-sm">Reply</h6>
                <textarea
                  name="reply"
                  defaultValue={selectedquote?.reply || ""}
                  className="textarea textarea-bordered w-full h-36"
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <h6 className="text-amber-500 text-sm">Publish the quote</h6>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="radio-8"
                      value="private"
                      className="radio text-amber-600"
                      checked={publishStatus === "private"}
                      onChange={(e) => setPublishStatus(e.target.value)}
                    />
                    <span className="text-base text-amber-600">Private</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="radio-8"
                      value="publish"
                      className="radio text-amber-600"
                      checked={publishStatus === "publish"}
                      onChange={(e) => setPublishStatus(e.target.value)}
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
          )}
        </div>
      </div>
    </dialog>
  );

  // Use portal to render modal outside the component tree
  return createPortal(modalContent, document.body);
};

export default QuoteModal;
