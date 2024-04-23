"use client";

import React from "react";

export default function useFetchGameDataByLink(url: string) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${url}?key=b3c85b14e19f4d618df8debc3d5b01b6`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const parsedData = await response.json();
      setData(parsedData);
    };
    fetchData();
  }, [url]);

  return data;
}
