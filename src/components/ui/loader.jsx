import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper aria-hidden="true">
      <div className="loader">
        <svg width={100} height={100} viewBox="0 0 100 100">
          <defs>
            <mask id="portfolio-loader-clipping">
              <polygon points="0,0 100,0 100,100 0,100" fill="black" />
              <polygon points="25,25 75,25 50,75" fill="white" />
              <polygon points="50,25 75,75 25,75" fill="white" />
              <polygon points="35,35 65,35 50,65" fill="white" />
              <polygon points="35,35 65,35 50,65" fill="white" />
              <polygon points="35,35 65,35 50,65" fill="white" />
              <polygon points="35,35 65,35 50,65" fill="white" />
            </mask>
          </defs>
        </svg>
        <div className="box" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    --color-one: #ffbf48;
    --color-two: #be4a1d;
    --color-three: #ffbf4780;
    --color-four: #bf4a1d80;
    --color-five: #ffbf4740;
    --time-animation: 2s;
    --size: 1;
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    transform: scale(var(--size));
    box-shadow:
      0 0 25px 0 var(--color-three),
      0 20px 50px 0 var(--color-four);
    animation: portfolio-loader-colorize calc(var(--time-animation) * 3) ease-in-out infinite;
  }

  .loader::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border-top: solid 1px var(--color-one);
    border-bottom: solid 1px var(--color-two);
    background: linear-gradient(180deg, var(--color-five), var(--color-four));
    box-shadow:
      inset 0 10px 10px 0 var(--color-three),
      inset 0 -10px 10px 0 var(--color-four);
  }

  .loader .box {
    width: 100px;
    height: 100px;
    background: linear-gradient(
      180deg,
      var(--color-one) 30%,
      var(--color-two) 70%
    );
    mask: url(#portfolio-loader-clipping);
    -webkit-mask: url(#portfolio-loader-clipping);
  }

  .loader svg {
    position: absolute;
  }

  .loader svg #portfolio-loader-clipping {
    filter: contrast(15);
    animation: portfolio-loader-roundness calc(var(--time-animation) / 2) linear infinite;
  }

  .loader svg #portfolio-loader-clipping polygon {
    filter: blur(7px);
  }

  .loader svg #portfolio-loader-clipping polygon:nth-child(1) {
    transform-origin: 75% 25%;
    transform: rotate(90deg);
  }

  .loader svg #portfolio-loader-clipping polygon:nth-child(2) {
    transform-origin: 50% 50%;
    animation: portfolio-loader-rotation var(--time-animation) linear infinite reverse;
  }

  .loader svg #portfolio-loader-clipping polygon:nth-child(3) {
    transform-origin: 50% 60%;
    animation: portfolio-loader-rotation var(--time-animation) linear infinite;
    animation-delay: calc(var(--time-animation) / -3);
  }

  .loader svg #portfolio-loader-clipping polygon:nth-child(4) {
    transform-origin: 40% 40%;
    animation: portfolio-loader-rotation var(--time-animation) linear infinite reverse;
  }

  .loader svg #portfolio-loader-clipping polygon:nth-child(5) {
    transform-origin: 40% 40%;
    animation: portfolio-loader-rotation var(--time-animation) linear infinite reverse;
    animation-delay: calc(var(--time-animation) / -2);
  }

  .loader svg #portfolio-loader-clipping polygon:nth-child(6) {
    transform-origin: 60% 40%;
    animation: portfolio-loader-rotation var(--time-animation) linear infinite;
  }

  .loader svg #portfolio-loader-clipping polygon:nth-child(7) {
    transform-origin: 60% 40%;
    animation: portfolio-loader-rotation var(--time-animation) linear infinite;
    animation-delay: calc(var(--time-animation) / -1.5);
  }

  @keyframes portfolio-loader-rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes portfolio-loader-roundness {
    0% {
      filter: contrast(15);
    }
    20% {
      filter: contrast(3);
    }
    40% {
      filter: contrast(3);
    }
    60% {
      filter: contrast(15);
    }
    100% {
      filter: contrast(15);
    }
  }

  @keyframes portfolio-loader-colorize {
    0% {
      filter: hue-rotate(0deg);
    }
    20% {
      filter: hue-rotate(-30deg);
    }
    40% {
      filter: hue-rotate(-60deg);
    }
    60% {
      filter: hue-rotate(-90deg);
    }
    80% {
      filter: hue-rotate(-45deg);
    }
    100% {
      filter: hue-rotate(0deg);
    }
  }
`;

export default Loader;
