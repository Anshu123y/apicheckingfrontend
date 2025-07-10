import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrateCart, calculateTotals } from "@/redux/cartSlice";

const CartDataStoreInLocalStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          dispatch(hydrateCart(parsed));
          dispatch(calculateTotals());
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }
    }
  }, [dispatch]);

  return null;
};

export default CartDataStoreInLocalStorage;
