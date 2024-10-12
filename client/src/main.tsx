import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { Layout } from "./pages/layout/Layout.tsx";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </Provider>
);
