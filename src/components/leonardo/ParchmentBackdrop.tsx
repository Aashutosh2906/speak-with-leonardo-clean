/**
 * Full-screen parchment background with subtle paper texture.
 * Pure CSS — no external image dependencies.
 */
export function ParchmentBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 parchment-surface"
    />
  );
}
