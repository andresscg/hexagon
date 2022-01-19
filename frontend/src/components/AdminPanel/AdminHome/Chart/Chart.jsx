import "./Chart.css"
import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  Bar,
  BarChart,
} from "recharts"

export default function Chart({title, data, dataKey}) {
  return (
    <div className="chart">
      <h3 className="chart-title">{title}</h3>

      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <BarChart width={150} height={40} data={data}>
          <Bar dataKey={dataKey} fill="#8884d8" />

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
