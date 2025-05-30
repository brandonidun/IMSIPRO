import { computed } from "vue";

export const useFinanceCharts = () => {
  const monthlyLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const monthlyRevenueSeries = [8300, 5200, 3500, 4800, 4000, 6700];

  const totalMonthlySales = computed(() =>
    monthlyRevenueSeries.reduce((a, b) => a + b, 0)
  );

  const profitVsDebtSeries = [
    {
      name: "Profit",
      data: [4000, 3000, 4200, 3800, 5000, 4700],
    },
    {
      name: "Debt",
      data: [1000, 1200, 900, 1300, 800, 1500],
    },
  ];

  const pieChartOptions = computed(() => ({
    chart: {
      type: "donut",
      background: "transparent",
      fontFamily: "Helvetica, Arial, sans-serif",
    },
    labels: monthlyLabels,
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
                `GHS ${parseFloat(val as string).toLocaleString()}`,
            },
            total: {
              show: true,
              label: "Total",
              fontFamily: "var(--default-font-family)",
              fontSize: "14px",
              fontWeight: 600,
              color: "#6b7280",
              formatter: () =>
                `GHS ${totalMonthlySales.value.toLocaleString()}`,
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
      categories: monthlyLabels,
      labels: {
        style: {
          colors: "#6b7280",
        },
      },
    },
    yaxis: {
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
    monthlyRevenueSeries,
    profitVsDebtSeries,
    pieChartOptions,
    lineChartOptions,
    totalMonthlySales,
  };
};
