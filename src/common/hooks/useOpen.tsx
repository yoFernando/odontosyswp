import { useState } from "react";

function useOpen(defaultValue: boolean = false) {
    const [visible, setVisible] = useState<boolean>(defaultValue);

    const onOpen = () => setVisible(true);
    const onClose = () => setVisible(false);
    const onToggle = () => setVisible(oldState => !oldState)
    
    return {
        open: visible,
        onOpen,
        onClose,
        onToggle
    }
}

export default useOpen;