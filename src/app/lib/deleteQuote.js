const deleteQuote = async (id) => {
  try {
    const response = await fetch(`/api/quotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete quote');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting quote:', error);
    throw error;
  }
};

export default deleteQuote; 