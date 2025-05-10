import { caclTotalPrice } from "./calcTotalPrice";
import { CartItem } from "../redux/cart/type";

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = caclTotalPrice(items);
  return {
    items: items as CartItem[],
    totalPrice
  }
}