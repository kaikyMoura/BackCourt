import { useContext } from "react";
import RouteTransitionContext from "./RouteTransitionContext";

export const useRouteTransition = () => {
    const context = useContext(RouteTransitionContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within an ThemeProvider');
    }
    return context;
};