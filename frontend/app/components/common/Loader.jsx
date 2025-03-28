export function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
      <style>{`
          .loader-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff;
            z-index: 1000;
          }
          .loader-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #000;
            border-bottom-color: transparent;
            border-radius: 50%;
            animation: rotation 1s linear infinite;
          }
          @keyframes rotation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
    </div>
  );
}
