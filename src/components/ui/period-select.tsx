import * as React from "react";
import { Button } from "./button";

interface TimePeriodSelectProps {
  period: "AM" | "PM";
  setPeriod: (period: "AM" | "PM") => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  ref: React.Ref<HTMLButtonElement>;
  onLeftFocus: () => void;
}

export const TimePeriodSelect = React.forwardRef<HTMLButtonElement, TimePeriodSelectProps>(
  ({ period, setPeriod, onLeftFocus }, ref) => {
    return (
      <Button
        ref={ref}
        onClick={() => setPeriod(period === "AM" ? "PM" : "AM")}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            onLeftFocus();
          }
        }}
        className="bg-[#FFA620]"
      >
        {period}
      </Button>
    );
  }
);

TimePeriodSelect.displayName = "TimePeriodSelect";
