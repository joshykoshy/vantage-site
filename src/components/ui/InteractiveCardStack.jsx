import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

/**
 * InteractiveCardStack — a draggable, auto-playing stacked card carousel.
 * The top card can be dragged away or clicked to send it to the back.
 *
 * Props:
 *   cards           — array of React nodes, one per card
 *   randomRotation  — each card gets a small random tilt
 *   sendToBackOnClick — clicking the front card sends it to back
 *   autoplay        — auto-rotate cards on a timer
 *   autoplayDelay   — ms between auto-rotations
 *   pauseOnHover    — pause autoplay on hover
 *   animationConfig — { stiffness, damping } for spring
 */
const InteractiveCardStack = ({
    cards = [],
    randomRotation = true,
    sendToBackOnClick = true,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = true,
    animationConfig = { stiffness: 260, damping: 20 },
}) => {
    const [stack, setStack] = useState(() => cards.map((_, i) => i));
    const [rotations] = useState(() =>
        cards.map(() => (randomRotation ? (Math.random() - 0.5) * 10 : 0))
    );
    const isPaused = useRef(false);
    const containerRef = useRef(null);

    const sendToBack = (id) => {
        setStack(prev => {
            const next = [...prev];
            const idx = next.indexOf(id);
            if (idx !== -1) {
                next.splice(idx, 1);
                next.unshift(id);
            }
            return next;
        });
    };

    // Autoplay
    useEffect(() => {
        if (!autoplay) return;
        const interval = setInterval(() => {
            if (!isPaused.current) {
                setStack(prev => {
                    if (prev.length < 2) return prev;
                    const [top, ...rest] = [...prev].reverse();
                    return [top, ...rest].reverse();
                });
            }
        }, autoplayDelay);
        return () => clearInterval(interval);
    }, [autoplay, autoplayDelay]);

    const handleMouseEnter = () => { if (pauseOnHover) isPaused.current = true; };
    const handleMouseLeave = () => { if (pauseOnHover) isPaused.current = false; };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {stack.map((cardIndex, stackPos) => {
                const isTop = stackPos === stack.length - 1;
                const distanceFromTop = stack.length - 1 - stackPos;
                const rotation = rotations[cardIndex];

                return (
                    <CardItem
                        key={cardIndex}
                        isTop={isTop}
                        distanceFromTop={distanceFromTop}
                        rotation={rotation}
                        animationConfig={animationConfig}
                        onClick={sendToBackOnClick && isTop ? () => sendToBack(cardIndex) : undefined}
                        onDragEnd={() => sendToBack(cardIndex)}
                    >
                        {cards[cardIndex]}
                    </CardItem>
                );
            })}
        </div>
    );
};

const CardItem = ({
    children,
    isTop,
    distanceFromTop,
    rotation,
    animationConfig,
    onClick,
    onDragEnd,
}) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateZ = useTransform(x, [-200, 200], [-15, 15]);

    const handleDragEnd = (_, info) => {
        const threshold = 100;
        if (Math.abs(info.offset.x) > threshold || Math.abs(info.offset.y) > threshold) {
            onDragEnd();
        } else {
            animate(x, 0, { type: 'spring', ...animationConfig });
            animate(y, 0, { type: 'spring', ...animationConfig });
        }
    };

    return (
        <motion.div
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden"
            style={{
                x: isTop ? x : 0,
                y: isTop ? y : 0,
                rotateZ: isTop ? rotateZ : rotation,
                zIndex: isTop ? 10 : 10 - distanceFromTop,
                transformOrigin: 'bottom center',
            }}
            animate={{
                scale: 1 - distanceFromTop * 0.04,
                y: distanceFromTop * -12,
                opacity: distanceFromTop > 3 ? 0 : 1,
            }}
            transition={{ type: 'spring', ...animationConfig }}
            drag={isTop}
            dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            onClick={onClick}
            whileHover={isTop ? { scale: 1.02 } : undefined}
        >
            {children}
        </motion.div>
    );
};

export default InteractiveCardStack;
