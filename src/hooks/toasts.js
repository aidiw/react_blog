
import {useState, useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';

const useToast = () => {
    const [, setToastRerender] = useState(false);
    const toasts = useRef([]); //리렌더링이 일어나지않음. 업데이트를하면 그 즉시 업데이트하게되어있음.

    const deleteToast = (id) => {
    const filteredToasts = toasts.current.filter(toast => {
        return toast.id !== id
        });
    
        toasts.current = filteredToasts;
        setToastRerender(prev => !prev);
    };
    
    const addToast = (toast) => {
        const id = uuidv4();
        const toastWithId = {
            ...toast,
            id
        };
        toasts.current = [...toasts.current, toastWithId];
        setToastRerender(prev => !prev);
        setTimeout(() => {
            deleteToast(id, toasts, setToastRerender);
        }, 5000);
    };

    return [
        toasts.current,
        addToast,
        deleteToast
    ]
};

export default useToast;