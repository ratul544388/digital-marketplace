import { Products } from "@/components/products";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/user-avatar";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { UserProfile } from "@clerk/nextjs";
import { notFound } from "next/navigation";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const user = await currentUser();
  const isSelf = user?.username === params.username;

  const seller = await db.user.findUnique({
    where: {
      username: params.username,
    },
  });

  if (!seller) {
    notFound();
  }

  const products = await db.product.findMany({
    where: {
      sellerId: seller.id,
    },
    include: {
      images: true,
    },
  });

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserAvatar src={seller.image as string} alt={seller.name} />{" "}
          <h2 className="font-bold text-xl">{seller.name}</h2>
        </div>
        {isSelf && (
          <Popover>
            <PopoverTrigger className="ml-auto" asChild>
              <Button className="" variant="outline">
                Manage Profile
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-[85vw] xs:w-[90vw] max-h-[80vh] overflow-y-auto overflow-x-hidden p-0"
            >
              <UserProfile
                appearance={{
                  elements: {
                    card: { maxWidth: "80vw", boxShadow: "none" },
                    rootBox: { maxWidth: "90vw", boxShadow: "none" },
                  },
                }}
              />
            </PopoverContent>
          </Popover>
        )}
      </div>
      <Separator />
      <h3 className="font-bold">Products</h3>
      <Separator className="w-[90px]" />
      <Products products={products} user={user} />
    </div>
  );
};

export default ProfilePage;
