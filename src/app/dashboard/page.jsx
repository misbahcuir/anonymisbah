"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import BlurText from "../../../ReactBits/BlurText/BlurText";
import TableRow from "../components/tableRow";
import getAllQuotesClient from "../lib/getAllQuotesClient";
import DeleteConfirmModal from "../components/deleteConfirmModal";
import deleteQuote from "../lib/deleteQuote";
import toast from "react-hot-toast";

// Dynamically import the modal to prevent SSR issues
const QuoteModal = dynamic(() => import("../components/quoteModal"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-ring loading-xl"></span>
    </div>
  ),
});

const Dashboard = () => {
  const [quotes, setquotes] = useState([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    quote: null,
  });

  useEffect(() => {
    setMounted(true);
    getAllQuotesClient()
      .then(setquotes)
      .finally(() => setIsLoading(false));
  }, []);

  const handleEditClick = (quoteId) => {
    setSelectedQuoteId(quoteId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuoteId(null);
  };

  const handleModalSuccess = () => {
    // Refresh the quotes data after successful update
    getAllQuotesClient().then(setquotes).catch(console.error);
  };

  const handleDeleteSuccess = () => {
    // Refresh the quotes data after successful deletion
    getAllQuotesClient().then(setquotes).catch(console.error);
  };

  const handleDeleteClick = (quote) => {
    setDeleteModal({ isOpen: true, quote });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteQuote(deleteModal.quote._id);
      toast.success("Quote deleted successfully!");
      setDeleteModal({ isOpen: false, quote: null });
      handleDeleteSuccess(); // Refresh the quotes list
    } catch (error) {
      toast.error("Failed to delete quote");
      console.error("Delete error:", error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, quote: null });
  };

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

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
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-box border border-amber-600 bg-transparent">
            <table className="table">
              <thead className="text-amber-600 font-semibold">
                <tr>
                  <th>Time</th>
                  <th>quote</th>
                  <th>Replied</th>
                  <th>Published</th>
                  <th className="text-center">Edit</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <TableRow
                    key={quote._id}
                    quote={quote}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal component outside the table */}
      <QuoteModal
        quoteId={selectedQuoteId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        quoteText={deleteModal.quote?.question}
      />
    </div>
  );
};

export default Dashboard;
