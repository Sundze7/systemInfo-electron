import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { useStatistics } from "./useStatistics";
import { Charts } from "./Charts";

function App() {
  const statistics = useStatistics(10);

  const [activeView, setActiveView] = useState<View>("CPU");
  const cpuUsages = useMemo(
    () => statistics.map((stat) => stat.cpuUsage),
    [statistics]
  );
  const ramUsages = useMemo(
    () => statistics.map((stat) => stat.ramUsage),
    [statistics]
  );
  const storageUsages = useMemo(
    () => statistics.map((stat) => stat.storageUsage),
    [statistics]
  );
  const activeUsages = useMemo(() => {
    switch (activeView) {
      case "CPU":
        return cpuUsages;
      case "RAM":
        return ramUsages;
      case "STORAGE":
        return storageUsages;
    }
  }, [activeView, cpuUsages, ramUsages, storageUsages]);

  useEffect(() => {
    return window.electron.subscribeChangeView((view) => setActiveView(view));
  }, []);

  return (
    <>
      <Header />
      <div className="main">
        <div>
          <SelectOption title="CPU" subTitle="TODO" data={cpuUsages} />
          <SelectOption title="RAM" subTitle="TODO" data={ramUsages} />
          <SelectOption title="STORAGE" subTitle="TODO" data={storageUsages} />
        </div>
        <div className="mainGrid">
          <Charts data={activeUsages} maxDataPoints={10} />
        </div>
      </div>
    </>
  );
}

function SelectOption(props: {
  title: string;
  subTitle: string;
  data: number[];
}) {
  return (
    <button className="selectOption">
      <div className="selectOptionTitle">
        <div>{props.title}</div>
        <div>{props.subTitle}</div>
      </div>
      <div className="selectOptionChart">
        <Charts data={props.data} maxDataPoints={10} />
      </div>
    </button>
  );
}

function Header() {
  return (
    <header>
      <button
        id="minimize"
        onClick={() => window.electron.sendFrameAction("MINIMIZE")}
      />
      <button
        id="maximize"
        onClick={() => window.electron.sendFrameAction("MAXIMIZE")}
      />
      <button
        id="close"
        onClick={() => window.electron.sendFrameAction("CLOSE")}
      />
    </header>
  );
}

export default App;
