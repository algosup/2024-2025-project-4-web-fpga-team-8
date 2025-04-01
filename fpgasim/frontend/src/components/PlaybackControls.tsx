import { buttonStyle } from "../utils/sharedStyles";

interface Props {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onSpeedChange: (speed: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

function PlaybackControls({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onPlay,
  onPause,
  onStep,
  onSpeedChange,
  onZoomIn,
  onZoomOut,
}: Props) {
  return (
    <div style={{ marginBottom: "12px", display: "flex", gap: "12px" }}>
      <button onClick={onPlay} style={buttonStyle} disabled={isPlaying}>
        Play
      </button>

      <button onClick={onPause} style={buttonStyle} disabled={!isPlaying}>
        Pause
      </button>

      <button
        onClick={onStep}
        style={buttonStyle}
        disabled={currentStep >= totalSteps - 1} // Disable when at the last step
      >
        Step
      </button>

      {/* Speed selector */}
      <select
        value={speed}
        onChange={(e) => onSpeedChange(parseInt(e.target.value))}
        style={{
          ...buttonStyle,
          padding: "6px",
          fontSize: "13px",
          width: "60px",
        }}
      >
        <option value={1}>x1</option>
        <option value={2}>x2</option>
        <option value={4}>x4</option>
      </select>

      <button onClick={onZoomIn} style={buttonStyle}>
        ＋
      </button>
      <button onClick={onZoomOut} style={buttonStyle}>
        －
      </button>
    </div>
  );
}

export default PlaybackControls;