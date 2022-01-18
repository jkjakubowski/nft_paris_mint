import React from "react";
import { css } from "@emotion/react";
import video from "./video.mp4";

const style = css`
  color: #5835e9;
  font-size: 5rem;
`;

function App() {
  return (
    <div className="App">
      <div
        css={css`
          height: 100vh;
          width: 100vw;
        `}
      >
        <h1 css={style}>Special gift!</h1>
        <h2
          css={css`
            font-size: 2rem;
            color: #ffffff;
            margin-top: 1rem;
          `}
        >
          Thanks for attending the first edition of NFT Paris!
        </h2>
        <video controls width="300" autoPlay muted>
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default App;
