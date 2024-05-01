import React from "react";

const Page = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <a
          aria-label="Chat on WhatsApp"
          href="https://wa.me/6282294400729"
          style={{
            display: "inline-block",
            backgroundColor: "#25D366",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            textDecoration: "none",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.3s ease",
            marginRight: "10px", // Tambahkan margin-right di sini
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Chat on WhatsApp
        </a>
        <a
          aria-label="Email me"
          href="mailto:aryaferdyansahxiii@gmail.com"
          style={{
            display: "inline-block",
            backgroundColor: "#D44638",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            textDecoration: "none",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.3s ease",
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Email me
        </a>
      </div>
    </div>
  );
};

export default Page;
