import { useState } from "react";
import { Settings } from "lucide-react";
import {
  DEFAULT_SETTINGS,
  loadSettings,
  saveSettings,
  type LeonardoSettings,
} from "@/config/leonardo";

interface Props {
  onChange: (s: LeonardoSettings) => void;
}

/**
 * Hidden admin panel (gear icon, bottom-right).
 * Lets museum staff tweak settings without code changes.
 */
export function AdminPanel({ onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState<LeonardoSettings>(loadSettings);

  const update = (patch: Partial<LeonardoSettings>) => {
    const next = { ...local, ...patch };
    setLocal(next);
    saveSettings(next);
    onChange(next);
  };

  const reset = () => {
    setLocal(DEFAULT_SETTINGS);
    saveSettings(DEFAULT_SETTINGS);
    onChange(DEFAULT_SETTINGS);
  };

  return (
    <>
      {/* Trigger: subtle gear in bottom-right corner */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-50 p-2 rounded-full text-sepia/30 hover:text-sepia/70 transition-colors"
        aria-label="Open admin settings"
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-14 right-4 z-50 w-72 bg-parchment border border-gold/40 rounded-sm shadow-codex p-5 space-y-4 text-sm">
          <h2 className="font-display text-base text-ink">Admin Settings</h2>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={local.devMode}
              onChange={(e) => update({ devMode: e.target.checked })}
              className="accent-gold"
            />
            <span className="text-ink-soft">Dev mode (mock responses)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={local.analyticsEnabled}
              onChange={(e) => update({ analyticsEnabled: e.target.checked })}
              className="accent-gold"
            />
            <span className="text-ink-soft">Enable analytics logging</span>
          </label>

          <div className="space-y-1">
            <span className="text-sepia">Max turns: {local.maxTurns}</span>
            <input
              type="range"
              min={3}
              max={20}
              value={local.maxTurns}
              onChange={(e) => update({ maxTurns: Number(e.target.value) })}
              className="w-full accent-gold"
            />
          </div>

          <div className="space-y-1">
            <span className="text-sepia">Typewriter speed: {local.typewriterSpeedMs}ms/char</span>
            <input
              type="range"
              min={10}
              max={100}
              value={local.typewriterSpeedMs}
              onChange={(e) => update({ typewriterSpeedMs: Number(e.target.value) })}
              className="w-full accent-gold"
            />
          </div>

          <div className="space-y-1">
            <span className="text-sepia">Inactivity timeout: {local.inactivityTimeoutMs / 60000}min</span>
            <input
              type="range"
              min={1}
              max={30}
              value={local.inactivityTimeoutMs / 60000}
              onChange={(e) => update({ inactivityTimeoutMs: Number(e.target.value) * 60000 })}
              className="w-full accent-gold"
            />
          </div>

          <button
            onClick={reset}
            className="w-full text-center text-xs text-sepia/70 hover:text-ink underline"
          >
            Reset to defaults
          </button>
        </div>
      )}
    </>
  );
}
