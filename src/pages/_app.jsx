import "@/styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import DismissableToast from "@/components/Toaster";

config.autoAddCss = false;

const App = ({ Component, pageProps }) => (
  <>
    <DismissableToast />
    <Component {...pageProps} />
  </>
);

export default App;
