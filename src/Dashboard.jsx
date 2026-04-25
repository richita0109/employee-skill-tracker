import { useEffect, useState } from "react";
import Charts from "./Charts";
import toast from "react-hot-toast";

const API = "http://localhost:5001";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // FETCH
  const fetchEmployees = async () => {
    const res = await fetch(`${API}/employees`);
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // DELETE
  const deleteEmployee = async (_id) => {
    await fetch(`${API}/employees/${_id}`, {
      method: "DELETE",
    });
    toast.success("Deleted");
    fetchEmployees();
  };

  // EDIT
  const startEdit = (emp) => {
    setName(emp.name);
    setSkills(emp.skills.join(","));
    setEditId(emp._id);
  };

  // SEARCH
  const filtered = employees.filter((e) =>
    e.name.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white p-8">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-400">
          Employee Dashboard
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("auth");
            window.location.href = "/";
          }}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white/10 p-6 rounded-xl hover:bg-blue-500/20 transition">
          <p>Total Employees</p>
          <h2 className="text-3xl text-blue-400">
            {employees.length}
          </h2>
        </div>

        <div className="bg-white/10 p-6 rounded-xl hover:bg-purple-500/20 transition">
          <p>Total Skills</p>
          <h2 className="text-3xl text-purple-400">
            {employees.reduce((a, e) => a + e.skills.length, 0)}
          </h2>
        </div>
      </div>

      {/* CHART */}
      <Charts employees={employees} />

      {/* FORM */}
      <div className="bg-white/5 p-6 rounded-xl mb-6">

        <input
          placeholder="Name"
          className="w-full p-3 mb-3 bg-white/20 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Skills (comma separated)"
          className="w-full p-3 mb-3 bg-white/20 rounded"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <button
  type="button"
  disabled={loading}   
  onClick={async () => {
    

    const parsedSkills = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

      if (!name.trim() || parsedSkills.length === 0) {
  toast.error("Enter valid name & skills");
  return;
}

    setLoading(true);

    try {
      await fetch(
        editId
          ? `${API}/employees/${editId}`
          : `${API}/employees`,
        {
          method: editId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            skills: parsedSkills,
          }),
        }
      );

      toast.success(editId ? "Updated" : "Added");

      setName("");
      setSkills("");
      setEditId(null);

      fetchEmployees();

    } catch (err) {
      console.log("ERROR:", err);
      toast.error("Failed");
    } finally {
      setLoading(false);
    }
  }}
  className={`w-full p-3 rounded transition ${
    loading
      ? "bg-gray-500 opacity-50 cursor-not-allowed"
      : "bg-blue-500 hover:bg-blue-600"
  }`}
>
  {loading
    ? "Saving..."
    : editId
    ? "Update Employee"
    : "Add Employee"}
</button>

      </div>

      {/* SEARCH */}
      <input
        placeholder="Search..."
        className="w-full p-3 mb-4 bg-white/20 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE HEADER */}
      <div className="grid grid-cols-3 mb-2 text-gray-300">
        <span>Name</span>
        <span className="text-center">Skills</span>
        <span className="text-right">Actions</span>
      </div>

      {/* TABLE */}
      {filtered.map((emp) => (
        <div
          key={emp._id}
          className="grid grid-cols-3 mb-2 p-3 bg-white/10 rounded"
        >
          <span>{emp.name}</span>

          <span className="text-center flex flex-wrap justify-center gap-2">
  {emp.skills.map((skill, i) => (
    <span
      key={i}
      className="px-2 py-1 text-xs rounded-md bg-white/10 border border-white/20 
                 hover:bg-blue-500/30 hover:shadow-md transition"
    >
      {skill}
    </span>
  ))}
</span>

          <div className="flex justify-end gap-2">

  <button
    type="button"
    onClick={() => startEdit(emp)}
    className="bg-yellow-400 text-black px-3 py-1 rounded-md 
               transition hover:bg-yellow-300 hover:scale-105 hover:shadow-md"
  >
    Edit
  </button>

  <button
    type="button"
    onClick={() => deleteEmployee(emp._id)}
    className="bg-red-500 px-3 py-1 rounded-md 
               transition hover:bg-red-400 hover:scale-105 hover:shadow-md"
  >
    Delete
  </button>

</div>
        </div>
      ))}

    </div>
  );
}

export default Dashboard;