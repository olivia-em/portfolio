import React from "react";

export default function Typewriter({
  text = "",
  speed = 10,
  start = false,
  className = "",
  onComplete,
  showCursor = true,
  instant = false,
}) {
  const [display, setDisplay] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const idxRef = React.useRef(0);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    // Only start (or restart) typing when `start` becomes true.
    if (!start) {
      // debug: not starting
      // console.debug(`[TYPEWRITER] idle for text="${text.slice(0,20)}" start=${start}`);
      // don't clear the displayed text — keep it visible after typing
      return undefined;
    }

    console.log(`[TYPEWRITER] start typing text="${text}" instant=${instant}`);

    // if caller requests instant rendering, show full text and finish
    if (instant) {
      setDisplay(text);
      setIsTyping(false);
      setDone(true);
      // call onComplete on next tick so callers can continue sequence
      setTimeout(() => {
        console.log(`[TYPEWRITER] instant complete text="${text}"`);
        onComplete && onComplete();
      }, 0);
      return undefined;
    }

    // nothing to type => immediately complete
    if (!text) {
      onComplete && onComplete();
      return undefined;
    }

    // initialize typing
    setDisplay("");
    setIsTyping(true);
    setDone(false);
    idxRef.current = 0;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = setInterval(() => {
      idxRef.current += 1;
      setDisplay(text.slice(0, idxRef.current));
      if (idxRef.current >= text.length) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsTyping(false);
        setDone(true);
        console.log(`[TYPEWRITER] complete text="${text}"`);
        onComplete && onComplete();
      }
    }, speed);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [text, start, speed, onComplete]);

  return (
    <span className={className} aria-live="polite">
      {display}
      {/* show cursor only while actively typing */}
      {showCursor && isTyping && <span className="tw-cursor">&nbsp;</span>}
    </span>
  );
}
