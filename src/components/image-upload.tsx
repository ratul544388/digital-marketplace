import { UploadButton } from "@/lib/uploadthing";
import { X } from "lucide-react";
import { Image } from "./Image";
import { Button } from "./ui/button";

interface ImageUploadProps {
  endPoint: "imageUpload" | "fileUpload";
  images: string[];
  onChange: (value: string[]) => void;
}

export const ImageUpload = ({ endPoint, images, onChange }: ImageUploadProps) => {
  return (
    <div className="flex items-center flex-wrap gap-3">
      {images.map((image, index) => (
        <div className="relative w-full max-w-[100px]" key={index}>
          <Image src={image} alt="image" key={index} className="" />
          <Button
            onClick={() => onChange(images.filter((i) => i !== image))}
            type="button"
            variant="secondary"
            size="icon"
            className="h-6 w-6 absolute top-0.5 right-0.5 rounded-full"
          >
            <X className="h-3 w-3 text-muted-foreground" />
          </Button>
        </div>
      ))}
      <UploadButton
        endpoint={endPoint}
        onClientUploadComplete={(res) => {
          onChange([...images, ...res.map((r) => r.url as string)]);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};
