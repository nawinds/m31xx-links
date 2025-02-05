import React, {useEffect} from "react";

const AnchorShortcuts = () => {
    // Map of single-letter shortcuts to anchor IDs
    const keyToActionMap = {
        // Anchor shortcuts
        m: {type: "anchor", target: "матан"},
        s: {type: "anchor", target: "спецразделы-высшей-математики"},
        d: {type: "anchor", target: "дискретная-математика"},
        a: {type: "anchor", target: "алгоритмы"},
        o: {type: "anchor", target: "основы-программирования"},
        e: {type: "anchor", target: "аппаратное-обеспечение-вычислительных-систем"},

        "м": {type: "anchor", target: "матан"}, // м
        c: {type: "anchor", target: "спецразделы-высшей-математики"}, // с
        l: {type: "anchor", target: "дискретная-математика"}, // д
        f: {type: "anchor", target: "алгоритмы"}, // а
        j: {type: "anchor", target: "основы-программирования"}, // о
        ",": {type: "anchor", target: "аппаратное-обеспечение-вычислительных-систем"}, // э - эвм

        // URL shortcuts
        b: {type: "url", target: "javascript:history.back()"},
        h: {type: "url", target: "/"},
        v: {type: "url", target: "/table-grades"},
        p: {type: "url", target: "/point-distribution"},

        y: {type: "url", target: "javascript:history.back()"}, // н - назад
        u: {type: "url", target: "/"},   // г - главная
        g: {type: "url", target: "/point-distribution"}, // п - правила оценивания

        // service shortcuts
        1: {type: "url", target: "https://github.com/nawinds/m3104-links/edit/master/src/pages/index.mdx"},
        2: {type: "url", target: "https://github.com/nawinds/m3104-links/edit/master/static/api-deadlines"},
        3: {type: "url", target: "https://github.com/nawinds/m3104-links/edit/master/src/pages/lecture-recordings.mdx"},
    };

    const russianKeyboardMap = {
        q: "й",
        w: "ц",
        e: "у",
        r: "к",
        t: "е",
        y: "н",
        u: "г",
        i: "ш",
        o: "щ",
        p: "з",
        a: "ф",
        s: "ы",
        d: "в",
        f: "а",
        g: "п",
        h: "р",
        j: "о",
        k: "л",
        l: "д",
        z: "я",
        x: "ч",
        c: "с",
        v: "м",
        b: "и",
        n: "т",
        m: "ь",
        ',': "э",
    };

    // Automatically extend the keyToActionMap with Russian equivalents
    for (const [engKey, action] of Object.entries(keyToActionMap)) {
        const rusKey = russianKeyboardMap[engKey];
        if (rusKey && !keyToActionMap[rusKey]) {
            keyToActionMap[rusKey] = action;
        }
    }

    const smoothScrollTo = (targetElement, duration = 300, offset = 60) => {
        const start = window.scrollY;
        const end = targetElement.getBoundingClientRect().top + start - offset;
        const distance = end - start;
        const startTime = performance.now();

        const scroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1); // Ensure progress is capped at 1
            const easing = progress < 0.5
                ? 4 * progress ** 3 // Cubic easing-in-out for smooth acceleration/deceleration
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, start + distance * easing);

            if (elapsed < duration) {
                requestAnimationFrame(scroll);
            }
        };

        requestAnimationFrame(scroll);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            const pressedKey = event.key.toLowerCase();
            const action = keyToActionMap[pressedKey];

            if (action) {
                if (action.type === "anchor") {
                    const anchorElement = document.getElementById(action.target);
                    if (anchorElement) {
                        smoothScrollTo(anchorElement, 200, 60); // Adjust offset if needed
                    }
                } else if (action.type === "url") {
                    window.location.href = action.target; // Redirect to URL in the same tab
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return null;
};

export default AnchorShortcuts;