function NotFoundPage() {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          height: 0,
          paddingBottom: "55.46875%",
          position: "relative",
          width: "100%",
        }}
      >
        <iframe
          frameBorder="0"
          height="100%"
          src="https://giphy.com/embed/d9P5HfhXRNRj9JDPe9/video"
          style={{
            left: 0,
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
            filter: "blur(1px)",
          }}
          width="100%"
        ></iframe>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            zIndex: 9999,
          }}
        >
          <h1>404 NOT-FOUND</h1>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
