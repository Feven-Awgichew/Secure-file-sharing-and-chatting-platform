import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from "chart.js";
import { getLast7Days } from "../../lib/features";

ChartJS.defaults.font.size = 16;
ChartJS.register(
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Messages",
        data: value,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(178, 75, 192)",
      },
    ],
  };

  return (
    <Line data={data} options={lineChartOptions}>
      Charts
    </Line>
  );
};

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  cutout: "60%",
};

const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        labels,
        data: value,
        fill: true,
        backgroundColor: ["orange", "purple"],
        borderColor: ["rgb(178, 75, 192)", "rgb(188, 192, 75)"],
        offset: 15,
      },
    ],
  };

  return (
    <Doughnut style={{ zIndex: 10 }} data={data} options={doughnutOptions}>
      Charts
    </Doughnut>
  );
};

export { LineChart, DoughnutChart };