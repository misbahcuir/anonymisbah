"use client";
import React from "react";
import { Trash } from "@deemlol/next-icons";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, quoteText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-base-100 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
            <Trash size={24} color="#dc2626" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-base-content">
              Delete Quote
            </h3>
            <p className="text-sm text-base-content/70">
              This action cannot be undone
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-base-content/80 mb-3">
            Are you sure you want to delete this quote?
          </p>
          <div className="bg-base-200 rounded-lg p-3">
            <p className="text-sm text-base-content/70 italic">
              "
              {quoteText?.length > 100
                ? quoteText.substring(0, 100) + "..."
                : quoteText}
              "
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="btn btn-outline btn-sm">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-error btn-sm">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
