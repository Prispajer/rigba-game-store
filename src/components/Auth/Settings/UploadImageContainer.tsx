"use client";

import React from "react";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function UploadProfileImage() {
  const [image, setImage] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const { user } = useCurrentUser();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please select an image!");
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageBase64 = reader.result;

      const response = await fetch(
        "/api/users/endpoints/userAuthentication/updateImage",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user?.email, image: imageBase64 }),
        }
      );

      if (response.ok) {
        alert("Profile image updated!");
      } else {
        alert("Failed to update profile image.");
      }

      setLoading(false);
    };

    reader.readAsDataURL(image);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && (
        <img src={preview} alt="Preview" style={{ maxWidth: "200px" }} />
      )}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
