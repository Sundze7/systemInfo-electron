import { useMemo } from "react";
import { BaseChart } from "./BaseCharts";

export type ChartProps = {
  data: number[];
  maxDataPoints: number;
  selectedView: "CPU" | "RAM" | "STORAGE";
};

export const COLOR_MAP = {
  CPU: {
    stroke: "#E99311",
    fill: "#5F3C07",
  },
  RAM: {
    stroke: "#5DD4EE",
    fill: "#0A4D5C",
  },
  STORAGE: {
    stroke: "#1ACF4D",
    fill: "#0B5B22",
  },
};

export function Charts(props: ChartProps) {
  const color = useMemo(
    () => COLOR_MAP[props.selectedView],
    [props.selectedView]
  );
  const preparedData = useMemo(() => {
    const points = props.data.map((point) => ({ value: point * 100 }));
    return [
      ...points,
      ...Array.from({ length: props.maxDataPoints - points.length }).map(
        () => ({ value: undefined })
      ),
    ];
  }, [props.data, props.maxDataPoints]);

  return (
    <BaseChart data={preparedData} fill={color.fill} stroke={color.stroke} />
  );
}
