"use client";
import { useState } from "react";

interface ResponseData {
  message: string;
}

export default function Api() {
  const [responseData, setResponseData] = useState<string | null>(null);

  async function fetchData() {
    try {
      const response = await fetch("/api/hello");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: ResponseData = await response.json();
      setResponseData(data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {responseData && <p>{responseData}</p>}
    </div>
  );
}
