import "../styles/globals.css";
import "antd/dist/antd.css";
import LayoutComp from "../src/components/Layout/Layout";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { wrapper } from "../src/Redux/store";

function MyApp({ Component, pageProps }) {
  const store = useStore();
  return (
    <PersistGate loading={null} persistor={store.__persistor}>
      {() => {
        return (
          <LayoutComp>
            <Component {...pageProps} />
          </LayoutComp>
        );
      }}
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
