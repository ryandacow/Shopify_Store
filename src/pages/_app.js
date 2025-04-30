import "@/styles/globals.css";
import 'swiper/css';
import 'swiper/css/navigation';
import { CartProvider } from '../context/CartContext';

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
