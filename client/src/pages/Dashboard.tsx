import { useEffect, useState } from "react";
import { getDocuments, analyze } from "../services/api";
import { Brain, FileText, Shield } from "lucide-react";

export default function Dashboard() {
  const [docs, setDocs] = useState<any[]>([]);
  const [aiPreview, setAiPreview] = useState<any | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

  useEffect(() => {
    getDocuments().then(setDocs);
  }, []);

  async function previewAnalysis() {
    if (!docs[0]) return;
    setIsLoadingAnalysis(true);
    setAiPreview(null);
    try {
      const res = await analyze(docs[0].content || "This Non-Disclosure Agreement...");
      setAiPreview(res);
    } finally {
      setIsLoadingAnalysis(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Approved":
        return "bg-green-100 text-green-800 border border-green-200";
      case "Archived":
        return "bg-gray-100 text-gray-800 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-sans">
      {/* Summary Stats */}
      <section className="max-w-7xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
        <StatCard
          icon={<FileText />}
          label="Total Documents"
          value={docs.length}
          color="from-indigo-500 to-indigo-700"
        />
        <StatCard
          icon={<Brain />}
          label="AI Analyses Run"
          value="48"
          color="from-amber-500 to-orange-600"
        />
        <StatCard
          icon={<Shield />}
          label="Security Score"
          value="90%"
          color="from-emerald-500 to-teal-600"
        />
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Document List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Recent Documents
            </h2>
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
              <ul className="divide-y divide-gray-200">
                {docs.length > 0 ? (
                  docs.map((d) => (
                    <li
                      key={d.id}
                      className="p-5 flex flex-col sm:flex-row justify-between sm:items-center hover:bg-gray-50 transition-colors duration-300"
                    >
                      <div className="mb-2 sm:mb-0">
                        <div className="font-semibold text-gray-800 text-lg">
                          {d.title}
                        </div>
                        <div className="text-sm text-gray-500">ID: {d.id}</div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          d.status
                        )}`}
                      >
                        {d.status}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="p-6 text-center text-gray-500">
                    Loading documents...
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Right: AI Analysis */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              AI Document Insight
            </h2>
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl">
              <p className="text-gray-600 mb-4">
                Run AI-powered content understanding on your first document.
              </p>
              <button
                onClick={previewAnalysis}
                disabled={isLoadingAnalysis || docs.length === 0}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-60"
              >
                {isLoadingAnalysis ? "Analyzing..." : "Run AI Analysis"}
              </button>

              {/* Loading State */}
              {isLoadingAnalysis && !aiPreview && (
                <div className="mt-6 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-600 mx-auto"></div>
                  <p className="mt-3">AI is thinking...</p>
                </div>
              )}

              {/* Results */}
              {aiPreview && (
                <div className="mt-8 border-t border-gray-200 pt-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Brain className="text-amber-600" /> AI Results
                  </h3>
                  <div>
                    <strong className="text-amber-700">Summary:</strong>
                    <p className="text-gray-700 mt-1 leading-relaxed">
                      {aiPreview.summary}
                    </p>
                  </div>
                  <div>
                    <strong className="text-amber-700">Classification:</strong>
                    <code className="ml-2 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md text-sm border border-amber-100">
                      {aiPreview.classification}
                    </code>
                  </div>
                  <div>
                    <strong className="text-amber-700">Risk Level:</strong>
                    <code className="ml-2 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md text-sm border border-amber-100">
                      {aiPreview.risk}
                    </code>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* --- Stats Card Component --- */
function StatCard({ icon, label, value, color }) {
  return (
    <div
      className={`flex items-center gap-4 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-md hover:shadow-lg rounded-2xl px-5 py-6 transition-all hover:-translate-y-1`}
    >
      <div
        className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white shadow-sm`}
      >
        {icon}
      </div>
      <div>
        <div className="text-gray-500 text-sm font-medium">{label}</div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
      </div>
    </div>
  );
}
