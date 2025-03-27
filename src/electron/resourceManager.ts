import osUtils from "os-utils";
import fs from "fs";

const POLLING_INTERVAL = 500; // runs twice/sec

export function pollResources() {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const storageData = getStorageData();
    console.log({ cpuUsage, ramUsage, storageData: storageData.usage });
  }, POLLING_INTERVAL);
}

function getCpuUsage() {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}

function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}

function getStorageData() {
  // requires from node 18
  const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
  const total = stats.bsize * stats.blocks; // size of 1 block * num of blocks
  const free = stats.bsize * stats.bfree; // size of 1 block * num of free blocks

  return {
    // 10^9 = 1GB
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  };
}
