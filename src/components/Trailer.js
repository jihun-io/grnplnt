"use client";

import YouTube from "react-youtube";

export default function Trailer({ className }) {
  return (
    <>
      <YouTube
        videoId="M91mq47DVe0"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        iframeClassName="w-full h-full"
      />
    </>
  );
}
