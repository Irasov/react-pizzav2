import { CartItem } from "../redux/cart/type"; 

export const caclTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
}