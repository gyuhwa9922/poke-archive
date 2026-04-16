const Footer = () => {
  return (
    <footer
      className="w-full border-t border-gray-200 flex justify-center items-center"
      style={{
        height: "165px",
        background: "rgba(255, 255, 255, 0.65)",
      }}
    >
      <div className="max-w-360 mx-auto w-full flex flex-col items-center text-center">
        <p
          style={{
            color: "#6a7282",
            fontFamily: "Galmuri11",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "20px",
          }}
        >
          © 2026 포켓아카이브. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
