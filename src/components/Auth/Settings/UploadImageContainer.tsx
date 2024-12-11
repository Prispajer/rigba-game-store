"use client";
import React from "react";
import { UploadButton } from "@/utils/uploadthing";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function UploadProfileImage() {
  const { user } = useCurrentUser();

  const headers = (): HeadersInit | undefined => {
    return user ? { Authorization: user?.id as string } : undefined;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        headers={headers()}
        onClientUploadComplete={(res) => {
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
