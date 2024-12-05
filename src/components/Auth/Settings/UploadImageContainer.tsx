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

    const formData = new FormData();
    formData.append("image", image);
    formData.append("email", user?.email || "");

    try {
      const response = await fetch(
        "/api/users/endpoints/userAuthentication/updateImage",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Profile image updated!");
      } else {
        alert("Failed to update profile image.");
      }
    } catch (error) {
      alert("An error occurred while uploading the image.");
    } finally {
      setLoading(false);
    }
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
