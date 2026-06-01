import {
  MdUploadFile,
  MdClose,
  MdPictureAsPdf,
  MdMenuBook,
} from "react-icons/md";
import { useState, useRef } from "react";

const FileIcon = ({ ext }) => {
  if (ext === "pdf")
    return <MdPictureAsPdf size={28} className="text-red-500" />;
  if (ext === "epub") return <MdMenuBook size={28} className="text-blue-500" />;
  return <MdUploadFile size={28} className="text-gray-400" />;
};

export function BookFileUpload({ onFileChange }) {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef();

  const ALLOWED = ["application/pdf", "application/epub+zip"];
  const ALLOWED_EXT = ["pdf", "epub"];
  const MAX_MB = 50;

  const handleFile = (selected) => {
    setError("");
    if (!selected) return;

    const ext = selected.name.split(".").pop().toLowerCase();
    const validType =
      ALLOWED.includes(selected.type) || ALLOWED_EXT.includes(ext);
    if (!validType) {
      setError("Only PDF and EPUB files are allowed.");
      return;
    }
    if (selected.size > MAX_MB * 1024 * 1024) {
      setError(`File must be under ${MAX_MB}MB.`);
      return;
    }

    const fileData = {
      raw: selected,
      name: selected.name,
      size: (selected.size / (1024 * 1024)).toFixed(2),
      ext: ext.toUpperCase(),
    };
    setFile(fileData);
    onFileChange?.(fileData);
  };

  const removeFile = () => {
    setFile(null);
    setError("");
    onFileChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
        <MdUploadFile size={16} className="text-blue-500" />
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
          Book File
        </h3>
      </div>

      <div className="p-5 space-y-4">
        {!file ? (
          <>
            {/* Drop zone */}
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFile(e.dataTransfer.files[0]);
              }}
              className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all
                ${
                  dragOver
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                }`}
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <MdUploadFile size={24} className="text-blue-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">
                  {dragOver ? "Drop it here" : "Click or drag to upload"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PDF, EPUB — max 50MB
                </p>
              </div>

              {/* Format badges */}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-red-50 text-red-500 text-xs font-bold rounded-lg">
                  PDF
                </span>
                <span className="px-2.5 py-1 bg-blue-50 text-blue-500 text-xs font-bold rounded-lg">
                  EPUB
                </span>
              </div>
            </div>

            {/* Hidden input */}
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.epub,application/pdf,application/epub+zip"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />

            {/* Error */}
            {error && (
              <p className="flex items-center gap-1.5 text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                <MdClose size={14} /> {error}
              </p>
            )}
          </>
        ) : (
          /* File preview card */
          <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50">
            <div className="w-11 h-11 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
              <FileIcon ext={file?.ext.toLowerCase()} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {file?.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`text-xs font-bold px-1.5 py-0.5 rounded
                  ${file?.ext === "PDF" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}
                >
                  {file?.ext}
                </span>
                <span className="text-xs text-gray-400">{file?.size} MB</span>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
              title="Remove file"
            >
              <MdClose size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
