import "../styles/globals.css";
import { BasketProvider } from "../contexts/BasketContext";
function MyApp({ Component, pageProps }) {
  return (
    <BasketProvider>
      <div>
        <h1>I&apos;m _app</h1>
        <Component {...pageProps} />
      </div>
    </BasketProvider>
  );
}

export default MyApp;
