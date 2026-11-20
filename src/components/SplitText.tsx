import { Fragment } from "react";

interface SplitTextProps {
  text: string;
  mode: "chars" | "lines";
  accentText?: string;
}

/**
 * Accessible text splitter that preserves full readable text via aria-label
 * on the parent heading while wrapping visual tokens in overflow-hidden masks.
 */
export function SplitText({ text, mode, accentText }: SplitTextProps) {
  if (mode === "chars") {
    const words = text.trim().split(/\s+/);
    return (
      <>
        {words.map((word, wIdx) => (
          <Fragment key={`${word}-${wIdx}`}>
            <span
              style={{ display: "inline-block", whiteSpace: "nowrap" }}
              aria-hidden="true"
            >
              {[...word].map((ch, cIdx) => (
                <span className="split-char-mask" key={`${ch}-${cIdx}`}>
                  <span className="split-inner">{ch}</span>
                </span>
              ))}
            </span>
            {wIdx < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </>
    );
  }

  const renderWords = (segment: string, extraClass = "") => {
    const parts = segment.split(/(\s+)/);
    return parts.map((part, idx) => {
      if (!part) return null;
      if (/^\s+$/.test(part)) return part;
      return (
        <span className="split-word-mask" aria-hidden="true" key={`${part}-${idx}`}>
          <span className={`split-inner ${extraClass}`.trim()}>{part}</span>
        </span>
      );
    });
  };

  return (
    <>
      {renderWords(text)}
      {accentText ? (
        <>
          {" "}
          {renderWords(accentText, "accent-word")}
        </>
      ) : null}
    </>
  );
}

