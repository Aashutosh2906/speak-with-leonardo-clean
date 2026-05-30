import { useEffect, useState } from "react";

interface Props {
  text: string;
  speedMs?: number;
}

/**
 * Renders text one character at a time with a blinking caret.
 */
export function TypewriterText({ text, speedMs = 35 }: Props) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speedMs);
    return () => clearInterval(id);
  }, [text, speedMs]);

  return (
    <span>
      {displayed}
      {!done && <span className="typewriter-caret" aria-hidden="true" />}
    </span>
  );
}
