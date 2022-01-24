import { useState, useCallback } from "react";

export const useToggle = (initialValue: boolean) => {
    const [isVisible, setIsVisible] = useState(initialValue);
    const toggle = useCallback(() => setIsVisible((prev) => !prev), []);
    return { isVisible, toggle };
};
