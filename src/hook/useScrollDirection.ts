import { useState, useEffect } from 'react';

const useScrollDirection = (threshold = 50) => {
    const [scrollDir, setScrollDir] = useState('up'); // 'up', 'down', 'top'
    const [isAtTop, setIsAtTop] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // 1. Kiểm tra trạng thái cuộn lên/xuống
            if (Math.abs(currentScrollY - lastScrollY) < threshold) {
                // Bỏ qua nếu cuộn quá ít
                return;
            }

            if (currentScrollY > lastScrollY && currentScrollY > threshold) {
                // Cuộn xuống
                setScrollDir('down');
                setIsAtTop(false);
            } else if (currentScrollY < lastScrollY) {
                // Cuộn lên
                setScrollDir('up');
                setIsAtTop(false);
            }

            // 2. Kiểm tra trạng thái đầu trang
            if (currentScrollY <= threshold) {
                setIsAtTop(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, threshold]);

    return { scrollDir, isAtTop };
};

export default useScrollDirection;