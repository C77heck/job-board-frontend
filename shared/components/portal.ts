import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export function Portal(props: any) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, [props.elementId]);

    return mounted ? ReactDOM.createPortal(props.children, document.getElementById(props.elementId) as any) : null;
}
