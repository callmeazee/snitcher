import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [ toasts, setToasts ] = useState([]);

    const addToast = useCallback(({ message, type = 'info', actionText, onAction, duration = 4000 }) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [ ...prev, { id, message, type, actionText, onAction } ]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className="pointer-events-auto flex items-center justify-between p-4 bg-[#1b1c1a] text-[#fbf9f6] border border-[#C9A96E]/40 shadow-2xl transition-all duration-300 transform translate-y-0"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        <div className="flex items-center gap-3 pr-2">
                            <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-ping" />
                            <p className="text-xs font-medium tracking-wide leading-snug text-[#fbf9f6]">
                                {toast.message}
                            </p>
                        </div>

                        {toast.actionText && (
                            <button
                                onClick={() => {
                                    if (toast.onAction) toast.onAction();
                                    removeToast(toast.id);
                                }}
                                className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#C9A96E] hover:underline cursor-pointer flex-shrink-0 ml-3"
                            >
                                {toast.actionText}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
