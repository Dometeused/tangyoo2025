// /components/creation/ProgressBar.jsx
export default function ProgressBar({ step, total }) {
  return (
    <div className="w-full flex items-center justify-center mb-4">
      <div className="bg-gray-200 h-2 rounded-full w-2/3">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
      <span className="ml-2 text-xs text-gray-600">
        {step}/{total}
      </span>
    </div>
  );
}
