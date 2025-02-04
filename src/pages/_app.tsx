import DashBoard from "@/components/Dashboard";
import { LoadingProvider } from "@/contexts/LoadingContextProvider";
import { Tooltip } from "react-tooltip";
import '../styles/globals.scss';
import { AppProps } from "next/app";
import { AuthProvider } from "@/contexts/AuthContextProvider";

const App = ({ Component, pageProps }: AppProps) => {

    return (
        <>
            <LoadingProvider>
                <AuthProvider>
                    <Component {...pageProps} />
                </AuthProvider>
                <Tooltip id="my-tooltip" place="right-start" />
            </LoadingProvider>
        </>
    )
}

export default App;