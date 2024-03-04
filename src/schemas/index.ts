import * as z from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  category: z.string().min(1, { message: "Name is required" }),
  price: z.coerce.number({ required_error: "Price is required" }),
  images: z
    .array(z.string().min(1, { message: "Image is quired" }))
    .min(1, { message: "At least one image is required" }),
  fileUrl: z.string().min(1, { message: "File is required" }),
  description: z.string().min(20, { message: "Description is required" }),
});
