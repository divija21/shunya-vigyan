import React, { useEffect, useRef, useState } from 'react';

const HindiTypingHelper = () => {
    const textInputRef = useRef(null);
    const [currentlyPressedKeys, setCurrentlyPressedKeys] = useState(new Set());
    const [lastConsonant, setLastConsonant] = useState('');
    const [rightShiftStartTime, setRightShiftStartTime] = useState(0);

    const longPressDuration = 50; // Duration for long press detection

    const hindiVowels = {
        '1': 'अ', '2': 'आ', '3': 'इ', '4': 'ई', '5': 'उ',
        '6': 'ऊ', '7': 'ए', '8': 'ऐ', '9': 'ओ', '0': 'औ'
    };

    const hindiVowelDiacritics = {
        '1': 'ा', '2': 'ि', '3': 'ी', '4': 'ु', '5': 'ू',
        '6': 'े', '7': 'ै', '8': 'ो', '9': 'ौ', '0': 'ं'
    };

    const hindiKeyMap = {
        'q': 'झ', 'w': 'भ', 'e': 'घ', 'r': 'ढ', 't': 'ध',
        'y': 'ज', 'u': 'ब', 'i': 'ग', 'o': 'ड', 'p': 'द',
        'a': 'ख', 's': 'फ', 'd': 'छ', 'f': 'ठ', 'g': 'थ',
        'h': 'च', 'j': 'ट', 'k': 'त', 'l': 'व',
        'z': 'क', 'x': 'प', 'c': 'य', 'v': 'श', 'b': 'ष', 'n': 'स', 'm': 'र',
        'MetaRight': 'ह', 'AltRight': 'ल'
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key.toLowerCase();
            const code = event.code;
            if (textInputRef.current === document.activeElement) {

                setCurrentlyPressedKeys((prevState) => new Set([...prevState, key]));

                if (event.getModifierState("CapsLock") && hindiVowels.hasOwnProperty(key)) {
                    event.preventDefault();
                    insertTextAtCursor(hindiVowels[key]);
                } else if (hindiKeyMap[key] && !currentlyPressedKeys.has("Shift")) {
                    event.preventDefault();
                    insertTextAtCursor(hindiKeyMap[key]);
                    setLastConsonant(key);
                } else if (hindiVowelDiacritics[key] && currentlyPressedKeys.has(lastConsonant)) {
                    event.preventDefault();
                    modifyLastConsonantWithDiacritic(hindiVowelDiacritics[key]);
                    setLastConsonant('');
                } else if (code === 'ShiftRight') {
                    setRightShiftStartTime(Date.now());
                } else if (key === ' ') {
                    setLastConsonant('');
                }
            }
        };

        const handleKeyUp = (event) => {
            const key = event.key.toLowerCase();
            const code = event.code;
            setCurrentlyPressedKeys((prevState) => {
                const newSet = new Set(prevState);
                newSet.delete(key);
                return newSet;
            });

            if (code === 'ShiftRight') {
                handleRightShiftRelease();
            } else if (key === lastConsonant) {
                setLastConsonant('');
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [lastConsonant, currentlyPressedKeys]);

    function handleRightShiftRelease() {
        const duration = Date.now() - rightShiftStartTime;
        const character = duration >= longPressDuration ? 'न' : 'म';
        insertTextAtCursor(character);
        console.log(duration)
    }

    function insertTextAtCursor(text) {
        const start = textInputRef.current.selectionStart;
        const end = textInputRef.current.selectionEnd;
        const textBefore = textInputRef.current.value.substring(0, start);
        const textAfter = textInputRef.current.value.substring(end);
        textInputRef.current.value = textBefore + text + textAfter;
        textInputRef.current.selectionStart = textInputRef.current.selectionEnd = start + text.length;
    }

    function modifyLastConsonantWithDiacritic(diacritic) {
        const text = textInputRef.current.value;
        const position = text.lastIndexOf(hindiKeyMap[lastConsonant]);
        if (position !== -1) {
            textInputRef.current.value = text.substring(0, position + 1) + diacritic + text.substring(position + 1);
            textInputRef.current.setSelectionRange(position + 2, position + 2);
        }
    }

    return (
        <div>
            <textarea
                ref={textInputRef}
                id="textInput"
                placeholder="Start typing here..."
                rows="10"
                cols="50"
                style={{
                    backgroundColor: "white",
                    color: "black",
                    paddingLeft: "10px",
                    paddingTop: "10px",
                    width: "100%",
                    height: "72vh",
                }}
            />
        </div>
    );
};

export default HindiTypingHelper;
