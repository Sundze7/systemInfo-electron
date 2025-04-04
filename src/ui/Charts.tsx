import { useMemo } from "react";
import { BaseChart } from "./BaseCharts";

export type ChartProps = {
  data: number[];
};

export function Charts(props: ChartProps) {
  const preparedData = useMemo(
    () => props.data.map((point) => ({ value: point })),
    [props.data]
  );
  return <BaseChart data={preparedData} />;
}
