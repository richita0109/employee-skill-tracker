import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Charts({ employees }) {
  const skillMap = {};

  employees.forEach((emp) => {
    emp.skills.forEach((skill) => {
      skillMap[skill] = (skillMap[skill] || 0) + 1;
    });
  });

  const data = Object.keys(skillMap).map((key) => ({
    name: key,
    count: skillMap[key],
  }));

  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#22c55e"];

  const topSkill =
    data.length > 0
      ? data.reduce((a, b) => (a.count > b.count ? a : b))
      : null;

  return (
    <div className="bg-white/5 p-6 rounded-xl mb-6">

      {topSkill && (
        <p className="mb-4 text-blue-300">
           Most in-demand skill: <b>{topSkill.name}</b>
        </p>
      )}

      <div className="grid grid-cols-2 gap-6">

        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="count">
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default Charts;