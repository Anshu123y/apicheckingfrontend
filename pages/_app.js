import "@/styles/globals.css";
import ThemeContextFunc from '../context/ThemeContext';
import AuthProvider  from '../context/AuthContext';
import Layout from "@/components/Layout";

import { Provider } from "react-redux";
import store from "@/redux/store"; 
import CartDataStoreInLocalStorage from "@/components/CartDataStoreInLocalStorage";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
      <ThemeContextFunc>
        <CartDataStoreInLocalStorage/>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </ThemeContextFunc>
        </AuthProvider>
    </Provider>
  );
}
