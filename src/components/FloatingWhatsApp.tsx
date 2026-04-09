import { STORE_PHONE } from "@/data/products";
import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => (
  <a
    href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent("Hi! I'm interested in your products. Can you help me?")}`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
    title="Chat on WhatsApp"
  >
    <MessageCircle size={26} />
  </a>
);

export default FloatingWhatsApp;
