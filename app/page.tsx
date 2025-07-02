"use client";
import { useState } from "react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [customLink, setCustomLink] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setShortUrl("");

    if (!url || !/^https?:\/\/.+/.test(url)) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, shortUrl: customLink || undefined }),
      });

      const json = await res.json();

      if (res.ok && json.data) {
        setShortUrl(`${window.location.origin}/${json.data.shortUrl}`);
      } else {
        setError(json.message || "Failed to shorten URL");
      }
    } catch (err: any) {
      setError("An unexpected error occurred");
      console.error(err);
    }
  }

  return (
    <div>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Original URL:</label>
          <br />
          <input
            type="text"
            placeholder="https://google.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div>
          <label>Custom short link (optional):</label>
          <br />
          <input
            type="text"
            placeholder="unfurl/google"
            value={customLink}
            onChange={(e) => setCustomLink(e.target.value)}
          />
        </div>

        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <div>
          <p>Short URL:</p>
          <a href={shortUrl} target="_blank">
            {shortUrl}
          </a>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
