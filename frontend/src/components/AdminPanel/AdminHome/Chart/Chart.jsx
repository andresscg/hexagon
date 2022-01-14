import "./Chart.css"
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  YAxis,
  Area,
  Bar,
  BarChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

export default function Chart({title, data, dataKey, grid}) {
  return (
    <div className="chart">
      <h3 className="chart-title">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="usersThisDay" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <BarChart width={150} height={40} data={data}>
          <Bar dataKey={dataKey} fill="#8884d8" />

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id.createdAt" />
          <YAxis />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
