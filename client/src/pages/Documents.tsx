import { useEffect, useState } from "react";
import { getDocuments, createDocument, search } from "../services/api";

export default function Documents() {
  const [docs, setDocs] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [q, setQ] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    setIsLoading(true);
    try {
      const res = await getDocuments();
      setDocs(res);
    } catch (err) {
      console.error("Error fetching documents:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !content) return;
    setIsLoading(true);
    try {
      await createDocument({ title, content });
      setTitle("");
      setContent("");
      await refresh();
    } catch (err) {
      console.error("Error creating document:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function doSearch(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await search(q);
      setDocs(res);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Document Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Add + Search */}
          <div className="lg:col-span-1 space-y-8">
            {/* Add Document Form */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Add New Document
              </h2>
              <form onSubmit={add} className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Document Title
                  </label>
                  <input
                    id="title"
                    placeholder="e.g., 'Master Service Agreement'"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Document Content
                  </label>
                  <textarea
                    id="content"
                    placeholder="Paste document content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-600 text-white py-2.5 rounded-lg font-semibold hover:bg-amber-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60"
                  disabled={!title || !content || isLoading}
                >
                  {isLoading ? "Adding..." : "Add Document"}
                </button>
              </form>
            </div>

            {/* Search Form */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Search Documents
              </h2>
              <form onSubmit={doSearch} className="flex gap-2">
                <input
                  placeholder="Search by title or content..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-600 text-white p-2.5 rounded-lg font-semibold hover:bg-amber-700 transition-colors shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Document List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Document List
              </h2>
              <button
                onClick={refresh}
                className="text-sm font-medium text-amber-600 hover:text-amber-800"
              >
                Refresh List
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-lg">
              <ul className="divide-y divide-gray-200">
                {isLoading ? (
                  <li className="p-4 text-center text-gray-500">
                    Loading documents...
                  </li>
                ) : (
                  docs.map((d) => (
                    <li
                      key={d.id || d._id}
                      className="p-4 flex flex-col sm:flex-row justify-between sm:items-center hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="mb-2 sm:mb-0">
                        <div className="font-semibold text-gray-800">
                          {d.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {d.id || d._id?.slice(-6) || "N/A"}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          d.status
                        )}`}
                      >
                        {d.status || "Pending Review"}
                      </span>
                    </li>
                  ))
                )}
                {!isLoading && docs.length === 0 && (
                  <li className="p-4 text-center text-gray-500">
                    No documents found.
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
