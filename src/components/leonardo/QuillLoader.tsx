/**
 * Animated loader shown while Leonardo is "thinking".
 */
export function QuillLoader() {
  return (
    <div className="quill-loader" aria-label="Leonardo is composing a reply">
      <span className="animate-quill-write text-xl" aria-hidden="true">
        ✒
      </span>
      <span className="font-serif italic text-base text-sepia">
        Leonardo is composing…
      </span>
      <span className="animate-ink-drop text-gold" aria-hidden="true">●</span>
    </div>
  );
}
