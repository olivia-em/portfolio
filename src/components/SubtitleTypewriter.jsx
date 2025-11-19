import React from "react";

// SubtitleTypewriter
// Types a sequence of tokens where tokens are either text or superscript numbers.
// Props:
// - tokens: [{type: 'text'|'sup', content: string}, ...]
// - start: boolean
// - speed: ms per char
// - instant: boolean
// - className: optional
// - onComplete: callback when fully typed
export default function SubtitleTypewriter({
  tokens = [],
  start = false,
  speed = 10,
  instant = false,
  className = "",
  onComplete,
}) {
  const [tIndex, setTIndex] = React.useState(0); // current token index
  const [charCount, setCharCount] = React.useState(0); // chars typed in current token
  const [isTyping, setIsTyping] = React.useState(false);
  const timerRef = React.useRef(null);
  const tIndexRef = React.useRef(0);
  const charRef = React.useRef(0);

  React.useEffect(() => {
    if (!start) return undefined;

    console.log(
      `[SUBTITLE] start tokens=${tokens
        .map((t) => t.content)
        .join("|")} instant=${instant}`
    );

    if (instant) {
      // immediately show everything
      setTIndex(tokens.length);
      setCharCount(0);
      setIsTyping(false);
      setTimeout(() => {
        console.log(`[SUBTITLE] instant complete`);
        onComplete && onComplete();
      }, 0);
      return undefined;
    }

    if (!tokens || tokens.length === 0) {
      onComplete && onComplete();
      return undefined;
    }

    // start typing (use refs inside the interval so closure values stay current)
    setIsTyping(true);
    setTIndex(0);
    setCharCount(0);
    tIndexRef.current = 0;
    charRef.current = 0;

    timerRef.current = setInterval(() => {
      const curIndex = tIndexRef.current;
      const token = tokens[curIndex] || { content: "" };
      const nextCount = charRef.current + 1;
      if (nextCount <= token.content.length) {
        charRef.current = nextCount;
        setCharCount(nextCount);
        // when we reach the end of the current token, log token completion
        if (nextCount === token.content.length) {
          console.log(
            `[SUBTITLE] token complete index=${curIndex} content="${token.content}"`
          );
        }
      } else {
        // move to next token
        if (curIndex + 1 >= tokens.length) {
          // finished
          clearInterval(timerRef.current);
          timerRef.current = null;
          setIsTyping(false);
          setTIndex(tokens.length);
          tIndexRef.current = tokens.length;
          setCharCount(0);
          charRef.current = 0;
          console.log(`[SUBTITLE] complete`);
          onComplete && onComplete();
        } else {
          const nextIndex = curIndex + 1;
          console.log(`[SUBTITLE] advancing to token index=${nextIndex}`);
          tIndexRef.current = nextIndex;
          setTIndex(nextIndex);
          charRef.current = 0;
          setCharCount(0);
        }
      }
    }, speed);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, instant]);

  // render tokens up to tIndex, and partially render the current token
  const parts = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (i < tIndex) {
      // fully rendered
      if (token.type === "sup") {
        parts.push(
          <span key={i} className="cite-sup" aria-hidden>
            {token.content}
          </span>
        );
      } else {
        parts.push(
          <span key={i} className={className}>
            {token.content}
          </span>
        );
      }
    } else if (i === tIndex) {
      // partial
      const visible = token.content.slice(0, charCount);
      if (token.type === "sup") {
        parts.push(
          <span key={i} className="cite-sup" aria-hidden>
            {visible}
          </span>
        );
      } else {
        parts.push(
          <span key={i} className={className}>
            {visible}
          </span>
        );
      }
    } else {
      // not yet started — render nothing for now
    }
  }

  return (
    <span className={`subtitle-typewriter ${className}`} aria-live="polite">
      {parts}
      {isTyping && <span className="tw-cursor">&nbsp;</span>}
    </span>
  );
}
