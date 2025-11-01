import { useEffect, useState } from "react";
import { Briefcase, PlusSquare, RefreshCw } from "lucide-react";
import { getCases, createCase } from "../services/api";

export default function Cases() {
  const [cases, setCases] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    setIsLoading(true);
    try {
      const res = await getCases();
      setCases(res);
    } catch (err) {
      console.error("Error fetching cases:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setIsLoading(true);
    try {
      await createCase({ name });
      setName("");
      await refresh();
    } catch (err) {
      console.error("Error creating case:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "Discovery":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      case "New":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Case Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Add Case Form */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <PlusSquare className="text-amber-600 mr-2" size={24} />
                Create New Case
              </h2>
              <form onSubmit={add} className="space-y-4">
                <div>
                  <label
                    htmlFor="caseName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Case Name
                  </label>
                  <input
                    id="caseName"
                    placeholder="e.g., 'Smith v. Acme Corp'"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 hover:shadow-md"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={!name.trim() || isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-amber-600 text-white py-2.5 rounded-lg font-semibold hover:bg-amber-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60"
                >
                  <PlusSquare size={18} />
                  {isLoading ? "Adding..." : "Add Case"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Case List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                <Briefcase className="text-amber-600 mr-2" size={24} />
                Case List
              </h2>
              <button
                onClick={refresh}
                className="text-sm font-medium text-amber-600 hover:text-amber-800 flex items-center gap-1.5"
              >
                <RefreshCw size={14} />
                Refresh List
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-lg">
              <ul className="divide-y divide-gray-200">
                {isLoading ? (
                  <li className="p-6 text-center text-gray-500">
                    <RefreshCw className="animate-spin h-6 w-6 mx-auto mb-2" />
                    Loading cases...
                  </li>
                ) : (
                  cases.map((c) => (
                    <li
                      key={c.id || c._id}
                      className="p-4 flex flex-col sm:flex-row justify-between sm:items-center border-l-4 border-transparent hover:border-amber-500 hover:bg-gray-50/50 transition-all"
                    >
                      <div className="mb-2 sm:mb-0">
                        <div className="font-semibold text-gray-800">
                          {c.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {c.id || c._id?.slice(-6) || "N/A"}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          c.status
                        )}`}
                      >
                        {c.status || "New"}
                      </span>
                    </li>
                  ))
                )}
                {!isLoading && cases.length === 0 && (
                  <li className="p-6 text-center text-gray-500">
                    No cases found.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
