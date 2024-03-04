import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthenticated");

  return { userId };
};

export const ourFileRouter = {
  imageUpload: f({ image: { maxFileSize: "4MB", maxFileCount: 3 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  fileUpload: f({blob: {}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
