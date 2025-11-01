import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  FileText,
  Lock,
  Server,
  Cloud,
  Search,
  Quote,
  UploadCloud,
  BarChart2,
  Target,
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const githubRepoUrl = "https://github.com/sumaiyashah27/caseflow-ai"; // <-- Update this link

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Navbar */}
      <header className="w-full flex justify-between items-center px-10 py-6 shadow-sm bg-white fixed top-0 left-0 z-50 border-b border-gray-200">
        <h1 className="text-2xl font-extrabold text-amber-600 tracking-tight">
          ⚖️ CaseFlow AI
        </h1>
        <button
          onClick={() => navigate("/login")}
          className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2.5 rounded-lg shadow-sm transition"
        >
          Login
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-32 px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
          AI-Powered Legal Workflow Automation
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl leading-relaxed">
          Simplify case management, document analysis, and intelligent legal
          search — powered by OpenAI, PostgreSQL, and Elasticsearch.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-lg px-10 py-3 rounded-full shadow-lg hover:shadow-amber-200 transition-all"
        >
          Get Started <ArrowRight size={20} />
        </button>
      </section>

      {/* Metrics */}
      {/* Metrics Section - Modern Glass Style */}
       <section className="mt-28 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <Metric label="Scalability" value="88%" gradient="from-amber-400 to-orange-500" delay="100" />
        <Metric label="Security" value="90%" gradient="from-green-400 to-emerald-500" delay="200" />
        <Metric label="UX / DX" value="86%" gradient="from-sky-400 to-indigo-500" delay="300" />
       </section>


      {/* Features */}
      <section className="mt-28 px-8 max-w-6xl mx-auto text-center">
        <h3 className="text-4xl font-extrabold mb-14 text-gray-900">
          Key Capabilities
        </h3>
        <div className="grid md:grid-cols-3 gap-10">
          <Feature
            icon={<Brain className="text-amber-600" size={40} />}
            title="AI Document Analysis"
            desc="Auto-summarize, classify, and extract insights from legal files using OpenAI GPT."
          />
          <Feature
            icon={<Search className="text-amber-600" size={40} />}
            title="NLP-Powered Search"
            desc="Semantic search for legal documents and cases using Elasticsearch."
          />
          <Feature
            icon={<FileText className="text-amber-600" size={40} />}
            title="Case Tracking"
            desc="Track case progress, associate documents, and view real-time updates."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="mt-28 px-8 py-20 bg-gray-50 border-t border-gray-100">
        <h3 className="text-4xl font-extrabold mb-14 text-center text-gray-900">
          Simple Steps to Get Started
        </h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <StepCard
            icon={<UploadCloud className="text-amber-600" size={32} />}
            step="Step 1"
            title="Upload Documents"
            desc="Securely upload your case files, contracts, and other legal documents in multiple formats."
          />
          <StepCard
            icon={<BarChart2 className="text-amber-600" size={32} />}
            step="Step 2"
            title="AI Analyzes Content"
            desc="Our AI processes and understands your documents, extracting key entities, summaries, and insights."
          />
          <StepCard
            icon={<Target className="text-amber-600" size={32} />}
            step="Step 3"
            title="Track & Search"
            desc="Use our intelligent search to find relevant information instantly and track case progress."
          />
        </div>
      </section>

      {/* Architecture */}
      <section className="mt-28 px-8 py-16 bg-white">
        <h3 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
          System Architecture
        </h3>
        <p className="text-gray-600 text-center mb-10 max-w-3xl mx-auto text-lg">
          A scalable, modular ecosystem integrating React, Node.js, PostgreSQL,
          OpenAI, and Elasticsearch.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-gray-700">
          <Box
            title="Frontend"
            icon={<Server size={24} />}
            text="React + TypeScript + Vite"
          />
          <span className="text-2xl font-bold text-gray-400 rotate-90 md:rotate-0">
            →
          </span>
          <Box
            title="Backend"
            icon={<Lock size={24} />}
            text="Express + Node.js + TypeScript"
          />
          <span className="text-2xl font-bold text-gray-400 rotate-90 md:rotate-0">
            →
          </span>
          <Box
            title="AI + DB Layer"
            icon={<Cloud size={24} />}
            text="OpenAI · PostgreSQL · Elasticsearch"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-28 px-8 py-20 bg-gray-900 text-white">
        <h3 className="text-4xl font-extrabold mb-14 text-center text-white">
          What Our Users Say
        </h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <TestimonialCard
            quote="CaseFlow AI has transformed our document review process. What used to take days now takes hours. The AI search is incredibly accurate."
            name="Sarah K."
            title="Senior Partner, Legal Firm"
          />
          <TestimonialCard
            quote="A must-have tool for any modern legal team. The case tracking and document association features have streamlined our entire workflow."
            name="David L."
            title="Paralegal, Corporate"
          />
          <TestimonialCard
            quote="The secure architecture and scalability were key for us. We've integrated it seamlessly with our existing systems. Highly recommend."
            name="Emily C."
            title="IT Director, Legal Tech"
          />
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mt-28 px-8 max-w-5xl mx-auto text-center">
        <h3 className="text-4xl font-extrabold mb-10 text-gray-900">
          Tech Stack
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 text-gray-700">
          <StackItem text="ReactJS" />
          <StackItem text="TypeScript" />
          <StackItem text="Node.js" />
          <StackItem text="PostgreSQL" />
          <StackItem text="Elasticsearch" />
          <StackItem text="OpenAI API" />
        </div>
      </section>

      {/* CI/CD */}
      <section className="mt-28 px-8 py-20 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-gray-200">
        <h3 className="text-4xl font-extrabold mb-6 text-center text-gray-900">
          Deployment & CI/CD
        </h3>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10 text-lg">
          Built with GitHub Actions for secure CI/CD pipelines. Fully
          containerized via Docker and deploy-ready for AWS Elastic Beanstalk or
          EC2.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-gray-700 font-medium">
          <Badge text="🐳 Docker" />
          <Badge text="☁️ AWS Elastic Beanstalk" />
          <Badge text="🔄 GitHub Actions" />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 text-center text-gray-500 text-sm py-8 border-t bg-white">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-amber-600">CaseFlow AI</span> — Built
        with ❤️ by{" "}
        <a
          href={githubRepoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-amber-600 hover:text-amber-800 transition-colors"
        >
          Sumaiya Shah
        </a>
      </footer>
    </div>
  );
}

/* --- Components --- */

function Feature({ title, desc, icon }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 border border-gray-100 border-t-4 border-transparent hover:border-amber-500">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h4 className="text-xl font-semibold text-amber-700 mb-3">{title}</h4>
      <p className="text-gray-600 text-base leading-relaxed">{desc}</p>
    </div>
  );
}

function StepCard({ step, title, desc, icon }: any) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function TestimonialCard({ quote, name, title }: any) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <Quote className="text-amber-400 w-8 h-8 mb-4" />
      <p className="text-gray-300 mb-6 italic">"{quote}"</p>
      <div className="text-right">
        <p className="font-semibold text-white">{name}</p>
        <p className="text-sm text-amber-400">{title}</p>
      </div>
    </div>
  );
}

function Box({ title, text, icon }: any) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 w-64 flex flex-col items-center text-center border border-gray-100">
      <div className="mb-3 text-amber-600">{icon}</div>
      <h4 className="font-bold text-gray-800 mb-2 text-lg">{title}</h4>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
}

function Metric({
  label,
  value,
  gradient = "from-amber-400 to-orange-500",
  delay = "0",
}: {
  label: string;
  value: string;
  gradient?: string;
  delay?: string;
}) {
  return (
    <div
      className={`
        relative bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-100 
        shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 
        overflow-hidden group
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glow gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-700`}
      />

      {/* Card content */}
      <div className="relative z-10 py-12 px-4">
        <h4 className={`text-6xl font-extrabold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {value}
        </h4>
        <p className="text-gray-700 font-semibold mt-3 text-lg tracking-wide">
          {label}
        </p>

        {/* Accent underline */}
        <div
          className={`mt-4 h-1 w-16 mx-auto rounded-full bg-gradient-to-r ${gradient} group-hover:w-24 transition-all duration-500`}
        ></div>
      </div>
    </div>
  );
}


function StackItem({ text }: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm py-4 px-3 font-semibold text-gray-700 border border-gray-100 hover:shadow-md hover:bg-amber-50 transition-all">
      {text}
    </div>
  );
}

function Badge({ text }: any) {
  return (
    <span className="bg-white border border-amber-200 text-amber-700 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all">
      {text}
    </span>
  );
}
