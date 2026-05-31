import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

/**
 * FlipboardText — scrambles each character through random glyphs
 * before landing on the correct letter (split-flap display effect).
 * Triggers once when the element enters the viewport.
 */
const FlipboardText = ({
    text,
    className = '',
    scrambleDuration = 600,   // ms per character to scramble
    wordDelay = 120,           // ms delay between each word starting
    charDelay = 30,            // ms between each char within a word
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [displayChars, setDisplayChars] = useState(
        text.split('').map(() => ' ')
    );
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;
        hasAnimated.current = true;

        const chars = text.split('');
        // Group into words (split on spaces, keep spaces)
        const words = [];
        let wordStart = 0;
        for (let i = 0; i <= chars.length; i++) {
            if (i === chars.length || chars[i] === ' ') {
                words.push({ start: wordStart, end: i });
                if (i < chars.length) words.push({ start: i, end: i + 1 }); // space
                wordStart = i + 1;
                i++; // skip the space char we just handled
            }
        }

        let wordCursor = 0;

        const animateWord = (wordIndex) => {
            if (wordIndex >= words.length) return;
            const { start, end } = words[wordIndex];

            let charQueue = [];
            for (let ci = start; ci < end; ci++) {
                charQueue.push({ index: ci, target: chars[ci], delay: (ci - start) * charDelay });
            }

            charQueue.forEach(({ index, target, delay }) => {
                const totalTime = scrambleDuration + delay;
                const intervalMs = 45;
                const cycles = Math.floor(totalTime / intervalMs);
                let count = 0;

                const interval = setInterval(() => {
                    count++;
                    if (count >= cycles || target === ' ') {
                        clearInterval(interval);
                        setDisplayChars(prev => {
                            const next = [...prev];
                            next[index] = target;
                            return next;
                        });
                    } else {
                        const rand = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                        setDisplayChars(prev => {
                            const next = [...prev];
                            next[index] = rand;
                            return next;
                        });
                    }
                }, intervalMs);
            });

            // Schedule next word
            const wordDuration = scrambleDuration + (end - start) * charDelay + wordDelay;
            setTimeout(() => animateWord(wordIndex + 1), wordDuration * 0.55);
        };

        animateWord(0);
    }, [isInView, text, scrambleDuration, wordDelay, charDelay]);

    return (
        <span ref={ref} className={className} aria-label={text}>
            {displayChars.map((char, i) => (
                <span
                    key={i}
                    className="inline-block"
                    style={{
                        fontVariantNumeric: 'tabular-nums',
                        minWidth: char === ' ' ? '0.35em' : undefined,
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
};

export default FlipboardText;
