import { AuthProvider } from "@/contexts/AuthContextProvider";
import { LoadingProvider } from "@/contexts/LoadingContextProvider";
import { ThemeProvider } from "@/contexts/ThemeContextProvider";
import { AppProps } from "next/app";
import { Tooltip } from "react-tooltip";
import '../styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {

    return (
        <>
            <ThemeProvider>
                <LoadingProvider>
                    <AuthProvider>
                        <Component {...pageProps} />
                    </AuthProvider>
                    <Tooltip id="my-tooltip" place="right-start" />
                </LoadingProvider>
            </ThemeProvider>
        </>
    )
}

export default App;