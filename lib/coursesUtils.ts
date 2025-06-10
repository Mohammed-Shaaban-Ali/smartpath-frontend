// Utility function to validate YouTube URLs
export const isValidYouTubeUrl = (url: string) => {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]{11}.*$/;
  return youtubeRegex.test(url);
};

// Utility function to get video duration from file
export const getVideoDuration = (file: File) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      const durationInMinutes = Number(
        Math.round((video.duration / 60) * 100) / 100
      ).toFixed(0);
      resolve(durationInMinutes);
    };

    video.onerror = () => {
      window.URL.revokeObjectURL(video.src);
      reject(new Error("Failed to load video metadata"));
    };

    video.src = URL.createObjectURL(file);
  });
};

// Extract YouTube video ID from URL
export const extractYouTubeVideoId = (url: string) => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Parse YouTube duration format (PT4M13S -> minutes)
export const parseYouTubeDuration = (duration: any) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  const totalMinutes = Number(
    Math.round((hours * 60 + minutes + seconds / 60) * 100) / 100
  ).toFixed(0);
  return totalMinutes;
};

// Get YouTube video duration using API
export const getYouTubeDuration = async (videoUrl: string) => {
  try {
    const videoId = extractYouTubeVideoId(videoUrl);
    if (!videoId) throw new Error("Invalid YouTube URL");

    // Note: You'll need to add your YouTube API key here
    // For now, we'll return null to fallback to manual input
    const API_KEY = "AIzaSyBaEclL3XE7725lKKV4YEWa8SbRnsnlkqc";
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=contentDetails`
    );
    //
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const duration = data.items[0].contentDetails.duration;
      return parseYouTubeDuration(duration);
    }

    // For now, return null to indicate manual input needed
    console.log("YouTube API integration needed for auto-duration detection");
    return null;
  } catch (error) {
    console.error("Error fetching YouTube duration:", error);
    return null;
  }
};
