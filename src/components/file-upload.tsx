import { UploadDropzone } from "@/lib/uploadthing";

interface UploadFileProps {
  endPoint: "imageUpload" | "fileUpload";
  file: string;
  onChange: (file: string) => void;
}

export const FileUpload = ({ endPoint, file, onChange }: UploadFileProps) => {
  return (
    <div className="flex items-start">
      {file ? (
        <p className="text-muted-foreground p-3 rounded-lg shadow-sm border">
          {file}
        </p>
      ) : (
        <UploadDropzone
          content={{
            label: "Upload Your Product's File",
            allowedContent: "All format are accepted",
          }}
          endpoint={endPoint}
          onClientUploadComplete={(res) => {
            onChange(res[0].url);
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  );
};
