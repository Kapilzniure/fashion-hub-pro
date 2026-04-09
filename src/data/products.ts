import hoodieBlack from "@/assets/hoodie-black.jpg";
import hoodieGrey from "@/assets/hoodie-grey.jpg";
import tshirtWhite from "@/assets/tshirt-white.jpg";
import tshirtBlack from "@/assets/tshirt-black.jpg";
import tshirtPolo from "@/assets/tshirt-polo.jpg";
import jacketLeather from "@/assets/jacket-leather.jpg";
import jacketDenim from "@/assets/jacket-denim.jpg";
import jacketBomber from "@/assets/jacket-bomber.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "hoodie" | "tshirt" | "jacket";
  badge?: "Best Seller" | "Trending" | "New";
}

export type OrderStatus = "Pending" | "Contacted" | "Delivered";

export interface Order {
  id: string;
  productName: string;
  size: string;
  customerName: string;
  phone: string;
  message: string;
  status: OrderStatus;
  createdAt: string;
}

export const defaultProducts: Product[] = [
  { id: "p1", name: "Noir Oversized Hoodie", price: 2800, originalPrice: 3200, image: hoodieBlack, category: "hoodie", badge: "Best Seller" },
  { id: "p2", name: "Classic Grey Pullover", price: 2500, image: hoodieGrey, category: "hoodie" },
  { id: "p3", name: "Essential White Tee", price: 1200, originalPrice: 1500, image: tshirtWhite, category: "tshirt", badge: "Trending" },
  { id: "p4", name: "Midnight Black Tee", price: 1400, image: tshirtBlack, category: "tshirt" },
  { id: "p5", name: "Striped Polo Shirt", price: 1800, image: tshirtPolo, category: "tshirt", badge: "New" },
  { id: "p6", name: "Heritage Leather Jacket", price: 8500, originalPrice: 9500, image: jacketLeather, category: "jacket", badge: "Best Seller" },
  { id: "p7", name: "Washed Denim Jacket", price: 4200, image: jacketDenim, category: "jacket", badge: "Trending" },
  { id: "p8", name: "Military Bomber Jacket", price: 5500, image: jacketBomber, category: "jacket", badge: "New" },
];

export const STORE_PHONE = "9779800000000";
export const STORE_INSTAGRAM = "https://instagram.com/fashionhubchitwan";
export const STORE_LOCATION = "Bharatpur, Chitwan, Nepal";
export const STORE_DISPLAY_PHONE = "+977 980-0000000";
