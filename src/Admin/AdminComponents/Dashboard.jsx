import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
const apiUrl = import.meta.env.VITE_ADMIN_URL;

const COLORS = ["#183B4E", "#C5D3E8", "#547792"];

const Dashboard = () => {
  const [data, setData] = useState({
    employees: 0,
    employers: 0,
    jobs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [employeesRes, employersRes, jobsRes] = await Promise.all([
          axios.get(`${apiUrl}/totalemployees`),
          axios.get(`${apiUrl}/totalemployers`),
          axios.get(`${apiUrl}/totalJobPosts`),
        ]);

        setData({
          employees: employeesRes.data.data[0]?.totalCount || 0,
          employers: employersRes.data.data[0]?.totalCount || 0,
          jobs: jobsRes.data.data[0]?.totalCount || 0,
        });
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const pieData = [
    { name: "Employees", value: data.employees },
    { name: "Employers", value: data.employers },
    { name: "Job Posts", value: data.jobs },
  ];

  const areaData = [
    { name: "Employees", count: data.employees },
    { name: "Employers", count: data.employers },
    { name: "Job Posts", count: data.jobs },
  ];

  if (loading)
    return <div className="text-center mt-10">Loading dashboard...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-secondary">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Area Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-md font-semibold mb-4 text-chart">
            Statistics Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="10%" stopColor="#213448" stopOpacity={0.8} />
                  <stop offset="90%" stopColor="#547792" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#183B4E"
                fillOpacity={1}
                fill="url(#colorCount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-md font-semibold mb-4 text-chart">
            User & Job Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
