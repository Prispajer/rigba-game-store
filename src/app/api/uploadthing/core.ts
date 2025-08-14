import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { postgres } from "@/lib/db";
import { userService } from "@/utils/injector";

const createUploadThingInstance = createUploadthing();

export const ourFileRouter = {
  imageUploader: createUploadThingInstance({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const userId = req.headers.get("Authorization");

      if (!userId) {
        throw new UploadThingError(
          "Unauthorized: Missing Authorization header"
        );
      }

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { userId } = metadata;

      const user = await postgres.user.findUnique({ where: { id: userId } });

      try {
        await userService.updateUserImage({
          email: user?.email as string,
          image: file.url,
        });

        return { userId, image: file.url };
      } catch (error) {
        throw new UploadThingError("Database update failed");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
