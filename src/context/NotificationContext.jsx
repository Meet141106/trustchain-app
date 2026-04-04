import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useWallet } from './WalletContext';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const { walletAddress } = useWallet();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Initial load from storage
    useEffect(() => {
        if (walletAddress) {
            const saved = localStorage.getItem(`notifications_${walletAddress.toLowerCase()}`);
            if (saved) {
                const parsed = JSON.parse(saved);
                setNotifications(parsed);
                setUnreadCount(parsed.filter(n => !n.read).length);
            } else {
                setNotifications([]);
                setUnreadCount(0);
            }
        } else {
            setNotifications([]);
            setUnreadCount(0);
        }
    }, [walletAddress]);

    // Save to storage
    useEffect(() => {
        if (walletAddress) {
            localStorage.setItem(`notifications_${walletAddress.toLowerCase()}`, JSON.stringify(notifications));
            setUnreadCount(notifications.filter(n => !n.read).length);
        }
    }, [notifications, walletAddress]);

    const addNotification = useCallback(({ type, title, message, link = null, data = {} }) => {
        const newNotif = {
            id: Date.now(),
            type, // 'info' | 'success' | 'warn' | 'vouch_request' | 'loan' | 'score'
            title,
            message,
            link,
            data, // for extra info like borrower address, score, requestId
            read: false,
            timestamp: Date.now()
        };
        setNotifications(prev => [newNotif, ...prev].slice(0, 50)); 
    }, []);

    const markAsRead = useCallback((id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const clearAll = useCallback(() => {
        setNotifications([]);
        setUnreadCount(0);
    }, []);

    return (
        <NotificationContext.Provider value={{ 
            notifications, 
            unreadCount, 
            addNotification, 
            markAsRead, 
            removeNotification,
            clearAll 
        }}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotifications = () => useContext(NotificationContext);
