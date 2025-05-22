import { useContext } from "react";
import LoadingContext from "./context";

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoadingContext must be used within an LoadingProvider');
    }
    return context;
};