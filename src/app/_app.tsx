import { AuthProvider } from "@/contexts/AuthContext/AuthContext";
import { LoadingProvider } from "@/contexts/LoadingContext/LoadingContext";
import { ThemeProvider } from "@/contexts/ThemeContext/ThemeContext";
import { AppProps } from "next/app";
import { Tooltip } from "react-tooltip";
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {

    return (
        <LoadingProvider>
            <ThemeProvider>
                <AuthProvider>
                    <Component {...pageProps} />
                </AuthProvider>
                <Tooltip id="my-tooltip" place="right-start" />
            </ThemeProvider>
        </LoadingProvider>
    )
}

export default App;