import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 200;

const ScrollSequenceBackground = ({ progress }) => {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const loadedImages = [];
        let loadedCount = 0;
        
        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            const indexStr = i.toString().padStart(3, '0');
            img.src = `/frames/${indexStr}.png`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === 1 || loadedCount === FRAME_COUNT) {
                    setImagesLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    // Watch progress — the moment user scrolls past 0, reveal the canvas
    useEffect(() => {
        const unsubscribeScroll = progress.on('change', (v) => {
            if (v > 0) setHasScrolled(true);
        });
        return () => unsubscribeScroll();
    }, [progress]);

    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        let animationFrameId;
        
        const render = (latestProgress) => {
            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.max(0, Math.floor(latestProgress * FRAME_COUNT))
            );
            
            const image = images[frameIndex];
            
            if (image && image.complete) {
                const canvasAspect = canvas.width / canvas.height;
                const imageAspect = image.width / image.height;
                
                let drawWidth, drawHeight, offsetX, offsetY;
                
                if (canvasAspect > imageAspect) {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imageAspect;
                    offsetX = 0;
                    offsetY = (canvas.height - drawHeight) / 2;
                } else {
                    drawHeight = canvas.height;
                    drawWidth = canvas.height * imageAspect;
                    offsetY = 0;
                    offsetX = (canvas.width - drawWidth) / 2;
                }
                
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
            }
        };

        const unsubscribe = progress.on('change', (v) => {
            animationFrameId = requestAnimationFrame(() => render(v));
        });
        
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render(progress.get());
        };
        
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [images, imagesLoaded, progress]);

    return (
        <div className="w-full h-full relative overflow-hidden pointer-events-none bg-vantage-black">
            {/* Canvas stays invisible (black) until user starts scrolling, then fades in */}
            <canvas
                ref={canvasRef}
                className="w-full h-full transition-opacity duration-700 ease-out"
                style={{ opacity: hasScrolled ? 1 : 0 }}
            />
            
            {/* Subtle bottom gradient to blend into next section */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-vantage-black/80"></div>
        </div>
    );
};

export default ScrollSequenceBackground;
