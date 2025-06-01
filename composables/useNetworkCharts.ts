import { computed } from "vue";

export const useNetworkCharts = () => {
  // Replace monthly labels with time-based labels (e.g. HH:mm)
  const timeLabels = ["10:00", "10:10", "10:20", "10:30", "10:40", "10:50"];

  const timeSeries = [40, 30, 20, 10, 15, 25];

  const totalSignalStrength = computed(() =>
    timeSeries.reduce((a, b) => a + b, 0)
  );

  const signalTrendSeries = [
    {
      name: "Avg Signal (dBm)",
      data: [-85, -90, -80, -88, -87, -84],
    },
  ];

  const pieChartOptions = computed(() => ({
    chart: {
      type: "donut",
      background: "transparent",
      fontFamily: "Helvetica, Arial, sans-serif",
    },
    labels: timeLabels,
    colors: ["#22c55e", "#3b82f6", "#f59e0b", "#6366f1", "#ec4899", "#10b981"],
    legend: {
      position: "right",
      labels: {
        colors: "#6b7280",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: -10,
              color: "#6b7280",
              fontSize: "14px",
            },
            value: {
              show: true,
              offsetY: 10,
              fontFamily: "var(--default-font-family)",
              fontSize: "24px",
              fontWeight: 700,
              color: "var(text-primary)",
              formatter: (val: string | number) =>
                `${parseFloat(val as string).toLocaleString()}`,
            },
            total: {
              show: true,
              label: "Total",
              fontFamily: "var(--default-font-family)",
              fontSize: "14px",
              fontWeight: 600,
              color: "#6b7280",
              formatter: () => `${100}%`,
            },
          },
        },
      },
    },
    dataLabels: {
      style: {
        fontFamily: "var(--default-font-family)",
        fontSize: "9px",
        fontWeight: 100,
      },
      dropShadow: {
        enabled: false,
      },
    },
  }));

  const lineChartOptions = {
    chart: {
      id: "signal-trend",
      animations: {
        enabled: true,
      },
      type: "line",
      height: 250,
      toolbar: { show: false },
      background: "transparent",
      foreColor: "#6b7280",
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#a5f3fc", "#fca5a5"],
    xaxis: {
      type: "category",
      title: {
        text: "Signal Strength (dBm)",
      },
      categories: timeLabels,
      labels: {
        style: {
          colors: "#6b7280",
        },
      },
    },
    yaxis: {
      title: {
        text: "Avg Signal (dBm)",
      },
      min: -100,
      max: -70,
      labels: {
        style: {
          colors: "#6b7280",
        },
      },
    },
    legend: {
      labels: {
        colors: "#9ca3af",
      },
    },
    grid: {
      borderColor: "#e5e7eb",
    },
  };

  return {
    timeLabels,
    timeSeries,
    signalTrendSeries,
    pieChartOptions,
    lineChartOptions,
    totalSignalStrength,
  };
};
