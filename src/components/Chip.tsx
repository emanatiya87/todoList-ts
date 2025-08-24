import { Chip } from "@mui/material";

type Priority = "High" | "Medium" | "Low" | string;

interface ChipPriorityProps {
  label: Priority;
  filter?: () => void;
}

export default function ChipPriority({
  label,
  filter = () => {},
}: ChipPriorityProps) {
  function handlePriorityBg(priority: Priority): string {
    switch (priority) {
      case "High":
        return "#FECACA"; // red-200
      case "Medium":
        return "#FEF3C7"; // amber-100
      case "Low":
        return "#D1FAE5"; // green-100
      default:
        return "#ffffff";
    }
  }

  function handlePriorityTextColor(priority: Priority): string {
    switch (priority) {
      case "High":
        return "#991B1B"; // red-800
      case "Medium":
        return "#92400E"; // amber-800
      case "Low":
        return "#065F46"; // green-800
      default:
        return "#000000";
    }
  }

  return (
    <Chip
      label={label ?? "Medium"}
      sx={{
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        backgroundColor: handlePriorityBg(label),
        color: handlePriorityTextColor(label),
        fontWeight: "bold",
        cursor: "pointer",
        marginLeft: "10px",
      }}
      onClick={filter}
    />
  );
}
