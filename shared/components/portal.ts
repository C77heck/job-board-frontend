import ReactDOM from 'react-dom';
// https://www.youtube.com/watch?v=xaiE_K32gBE
// we need to see when this has been hydrated to be able to use document object. or some other way.
export function Portal(props: any) {
    return ReactDOM.createPortal(props.children, document.getElementById(props.elementId) as any);
}
