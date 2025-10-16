import type { ReactNode } from "react";

interface ModalProps{
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}


function Modal({ isOpen, onClose, children, title}: ModalProps){
    if(!isOpen) return null;

    return (
        <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-opacity-30 backdrop-blur-sm"
        onClick={onClose}
        >
        <div
            className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
        >
            {title ? (
            <div className="flex justify-between items-center p-4 border-b">
                <p className="font-medium text-base text-gray-700">{title}</p>
                <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                aria-label="Close"
                >
                &times;
                </button>
            </div>
            ) : (
            <p className="sr-only">Modal content</p> 
            )}

            <div className="p-4">{children}</div>
        </div>
        </div>
    );
}
export default Modal;