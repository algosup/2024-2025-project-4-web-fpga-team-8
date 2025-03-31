interface Props {
  color: string;
  label: string;
}

function LegendItem({ color, label }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
      <div
        style={{
          width: "14px",
          height: "14px",
          backgroundColor: color,
          marginRight: "8px",
          borderRadius: "4px",
          border: "1px solid #aaa",
        }}
      />
      <span style={{ fontSize: "13px" }}>{label}</span>
    </div>
  );
}

export default LegendItem;
