export default function VideoPlayer({ videoUrl, title }) {
  if (!videoUrl) {
    return (
      <div
        className="video-container"
        style={{
          backgroundColor: "#e5e5e5",
          borderRadius: "0.5rem",
          height: "24rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p className="text-gray">No video available</p>
      </div>
    )
  }

  return (
    <div className="video-container">
      <h3 className="video-title">{title}</h3>
      <div className="video-player">
        {/* Add key so React reloads video when videoUrl changes */}
        <video key={videoUrl} controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}
