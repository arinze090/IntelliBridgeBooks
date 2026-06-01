import { useState, useRef, useEffect } from "react";
import {
  MdUploadFile,
  MdClose,
  MdPictureAsPdf,
  MdMenuBook,
  MdInsertDriveFile,
} from "react-icons/md";
import { formatSize, getExt } from "../../Library/Common";

const FilePreviewIcon = ({ file }) => {
  const ext = getExt(file?.name);
  if (file?.type?.startsWith("image/")) return null; // uses <img> preview
  if (ext === "pdf")
    return <MdPictureAsPdf size={36} className="text-red-500" />;
  if (ext === "epub") return <MdMenuBook size={36} className="text-blue-500" />;
  if (ext === "doc" || ext === "docx")
    return <MdInsertDriveFile size={36} className="text-blue-400" />;
  return <MdUploadFile size={36} className="text-gray-400" />;
};

const extColor = (ext) =>
  ({
    pdf: "bg-red-100 text-red-600",
    epub: "bg-blue-100 text-blue-600",
    jpg: "bg-yellow-100 text-yellow-700",
    jpeg: "bg-yellow-100 text-yellow-700",
    png: "bg-green-100 text-green-700",
    webp: "bg-teal-100 text-teal-700",
    doc: "bg-blue-100 text-blue-700",
    docx: "bg-blue-100 text-blue-700",
  })[ext] || "bg-gray-100 text-gray-600";

export default function FileUpload({
  label = "Upload File",
  accept = "*",
  allowedExts = [],
  maxMB = 50,
  icon = null,
  iconColor = "text-blue-500",
  hint = "",
  onChange,
  defaultFile = null,
}) {
  const [file, setFile] = useState(defaultFile);
  const [preview, setPreview] = useState(defaultFile?.previewUrl || "");
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef();

  const HeaderIcon = icon || MdUploadFile;

  const validate = (selected) => {
    const ext = getExt(selected?.name);
    if (allowedExts?.length && !allowedExts?.includes(ext)) {
      return `Only ${allowedExts?.map((e) => e.toUpperCase()).join(", ")} files are allowed.`;
    }
    if (selected?.size > maxMB * 1024 * 1024) {
      return `File must be under ${maxMB}MB.`;
    }
    return null;
  };

  const handle = (selected) => {
    if (!selected) return;
    setError("");
    const err = validate(selected);
    if (err) {
      setError(err);
      return;
    }

    const isImage = selected?.type.startsWith("image/");
    const url = isImage ? URL.createObjectURL(selected) : "";

    const meta = {
      raw: selected,
      name: selected?.name,
      size: formatSize(selected?.size),
      ext: getExt(selected?.name).toUpperCase(),
      previewUrl: url,
      isImage,
    };

    setFile(meta);
    setPreview(url);
    onChange?.(meta);
  };

  const remove = () => {
    setFile(null);
    setPreview("");
    setError("");
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const autoHint =
    hint ||
    [
      allowedExts?.length
        ? allowedExts?.map((e) => e.toUpperCase()).join(", ")
        : "Any file",
      `max ${maxMB}MB`,
    ].join(" — ");

  useEffect(() => {
    if (defaultFile) {
      setFile(defaultFile);
      setPreview(defaultFile?.previewUrl || "");
    }
  }, [defaultFile]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
        <HeaderIcon size={16} className={iconColor} />
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
          {label}
        </h3>
      </div>

      <div className="p-5 space-y-3">
        {!file ? (
          <>
            {/* Drop zone */}
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDrag(true);
              }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDrag(false);
                handle(e.dataTransfer.files[0]);
              }}
              className={`flex flex-col items-center justify-center gap-3 p-7 rounded-xl border-2 border-dashed cursor-pointer transition-all select-none
                ${drag ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"}`}
            >
              <div className="w-13 h-13 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <HeaderIcon size={24} className={iconColor} />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">
                  {drag ? "Drop it here" : "Click or drag & drop"}
                </p>
                <p className="text-xs text-gray-400 mt-1">{autoHint}</p>
              </div>

              {/* Format badges */}
              {allowedExts?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1.5">
                  {allowedExts?.map((ext) => (
                    <span
                      key={ext}
                      className={`px-2.5 py-0.5 text-xs font-bold rounded-lg ${extColor(ext)}`}
                    >
                      {ext?.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept={accept}
              className="hidden"
              onChange={(e) => handle(e.target.files[0])}
            />

            {error && (
              <div className="flex items-center gap-2 text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                <MdClose size={14} className="flex-shrink-0" /> {error}
              </div>
            )}
          </>
        ) : (
          <div className="space-y-3">
            {/* Image preview */}
            {file?.isImage && preview && (
              <div className="flex justify-center">
                <div className="relative group">
                  <img
                    src={preview}
                    alt="preview"
                    onError={remove}
                    className="w-36 h-48 object-cover rounded-xl shadow border border-gray-100"
                  />
                  <button
                    onClick={remove}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                  >
                    <MdClose size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* File info row */}
            <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50">
              {/* Icon or thumbnail */}
              <div className="w-11 h-11 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                {file?.isImage && preview ? (
                  <img
                    src={preview}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <FilePreviewIcon file={file?.raw} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {file?.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded ${extColor(file?.ext?.toLowerCase())}`}
                  >
                    {file?.ext}
                  </span>
                  <span className="text-xs text-gray-400">{file?.size}</span>
                </div>
              </div>

              <button
                onClick={remove}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                title="Remove"
              >
                <MdClose size={16} />
              </button>
            </div>

            {/* Change file */}
            <button
              onClick={() => inputRef.current?.click()}
              className="w-full text-xs text-blue-500 hover:text-blue-700 hover:underline transition-colors"
            >
              Change file
            </button>
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              className="hidden"
              onChange={(e) => handle(e.target.files[0])}
            />
          </div>
        )}
      </div>
    </div>
  );
}
