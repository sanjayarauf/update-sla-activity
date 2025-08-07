"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type ChartData = {
  date: string;
  avgSLA: number;
};

type Props = {
  data: ChartData[];
  selectedRange: "7days" | "30days";
  currentPage: number;
};

const PAGE_SIZE = 6;

export default function SLAChart({ data, selectedRange, currentPage }: Props) {
  const parseDate = (dateStr: string) => {
    const [day, month] = dateStr.split("/").map(Number);
    return new Date(2025, month - 1, day);
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
  };

  const sortedData = [...data].sort(
    (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()
  );

  let dataToShow: ChartData[] = [];

  if (selectedRange === "30days") {
    dataToShow = sortedData.slice(
      currentPage * PAGE_SIZE,
      (currentPage + 1) * PAGE_SIZE
    );
  } else {
    // Mode 7 Hari: ambil 7 hari terakhir dari tanggal terbaru
    const latestDate = parseDate(sortedData[sortedData.length - 1].date);

    const last7Days: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(latestDate);
      d.setDate(d.getDate() - i);
      last7Days.push(formatDate(d));
    }

    // Untuk memastikan semua tanggal tetap ada di chart (meskipun tidak ada datanya)
    const dataMap = new Map(sortedData.map((item) => [item.date, item.avgSLA]));
    dataToShow = last7Days.map((date) => ({
      date,
      avgSLA: dataMap.get(date) ?? 0, // default 0 jika tidak ada data
    }));
  }

  const minWidth = selectedRange === "30days" ? 1200 : 700;

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dataToShow}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
            <Tooltip
              formatter={(value: number) => `uptime : ${value.toFixed(2)}%`}
            />
            <Line
              type="monotone"
              dataKey="avgSLA"
              stroke="#4ade80"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
