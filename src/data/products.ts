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
  image: string;
  category: "hoodie" | "tshirt" | "jacket";
}

export interface Order {
  id: string;
  productName: string;
  size: string;
  customerName: string;
  phone: string;
  message: string;
  status: "Pending" | "Completed";
  createdAt: string;
}

export const defaultProducts: Product[] = [
  { id: "p1", name: "Noir Oversized Hoodie", price: 2800, image: hoodieBlack, category: "hoodie" },
  { id: "p2", name: "Classic Grey Pullover", price: 2500, image: hoodieGrey, category: "hoodie" },
  { id: "p3", name: "Essential White Tee", price: 1200, image: tshirtWhite, category: "tshirt" },
  { id: "p4", name: "Midnight Black Tee", price: 1400, image: tshirtBlack, category: "tshirt" },
  { id: "p5", name: "Striped Polo Shirt", price: 1800, image: tshirtPolo, category: "tshirt" },
  { id: "p6", name: "Heritage Leather Jacket", price: 8500, image: jacketLeather, category: "jacket" },
  { id: "p7", name: "Washed Denim Jacket", price: 4200, image: jacketDenim, category: "jacket" },
  { id: "p8", name: "Military Bomber Jacket", price: 5500, image: jacketBomber, category: "jacket" },
];
