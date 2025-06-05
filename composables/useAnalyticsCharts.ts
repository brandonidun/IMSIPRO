import { computed } from "vue";

export const useAnalyticsCharts = () => {
  // Area (Spline) Chart: Device Activity Over Time (2-line graph)
  const deviceActivitySeries = [
    {
      name: "Active Devices",
      data: [12, 18, 25, 30, 28, 35, 40],
    },
    {
      name: "Inactive Devices",
      data: [5, 7, 10, 8, 6, 9, 11],
    },
  ];
  const deviceActivityOptions = {
    chart: { id: "device-activity", type: "area" },
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
    stroke: { curve: "smooth" },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.6, opacityTo: 0.1 },
    },
  };

  // Donut Chart: Event Distribution
  const eventDistributionSeries = [44, 23, 19, 14];
  const eventDistributionOptions = {
    labels: ["Login", "Alert", "Update", "Other"],
  };

  // Bar Chart: Alert Types Distribution (no x-axis labels)
  const alertTypesSeries = [
    {
      name: "Alerts",
      data: [12, 7, 15, 4],
    },
  ];
  const alertTypesOptions = {
    chart: { type: "bar" },
    xaxis: {
      categories: ["Battery Low", "Device Offline", "SIM Change", "Other"],
      labels: { show: false },
    },
    colors: ["#FF4560"],
  };

  // Heatmap Chart: Signal Strength by Time (x: hour), Day (y: day of week), values as percentages, no x-axis labels
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  // Mock data: 7 days x 24 hours, values as percentages
  const heatmapSeries = days.map((day) => ({
    name: day,
    data: hours.map(() => Math.floor(Math.random() * 101)), // 0-100 %
  }));
  const heatmapOptions = {
    chart: { type: "heatmap" },
    dataLabels: { enabled: false },
    xaxis: { type: "category", categories: hours, labels: { show: false } },
    yaxis: { title: { text: "Day of Week" }, categories: days },
    colors: ["#008FFB"],
  };

  return {
    deviceActivitySeries,
    deviceActivityOptions,
    eventDistributionSeries,
    eventDistributionOptions,
    alertTypesSeries,
    alertTypesOptions,
    heatmapSeries,
    heatmapOptions,
  };
};
