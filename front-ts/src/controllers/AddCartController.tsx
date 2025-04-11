export const addToCart = async (server: string, userId: string, productId: string) => {
  try {
    const response = await fetch(`${server}api/addCart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        items: [
          {
            productId,
            quantity: 1,
          },
        ],
      }),
    });

    return response;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};
