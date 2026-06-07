import React from "react";
import styled, { keyframes } from "styled-components";
import profileImageUrl from "../../assets/profile.png";

const socialLinks = [
  {
    href: "https://x.com/GarageBuilder",
    label: "Twitter",
    viewBox: "0 0 512 512",
    path: "M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z",
  },
  {
    href: "https://github.com/kauntiaakash2",
    label: "GitHub",
    viewBox: "0 0 496 512",
    path: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z",
  },
  {
    href: "https://www.linkedin.com/in/kauntiakash2/",
    label: "LinkedIn",
    viewBox: "0 0 448 512",
    path: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z",
  },
];

const Card = () => {
  return (
    <StyledWrapper aria-label="Site under construction notice">
      <div className="card" role="status" aria-live="polite">
        <div className="header">
          <img src={profileImageUrl} alt="Akash Agarwal" className="avatar" />
          <div className="user-info">
            <p className="name">Akash Agarwal</p>
            <p className="handle">@GarageBuilder</p>
          </div>
        </div>

        <div className="description">
          <h3 className="pulse-text">SITE UNDER<br />CONSTRUCTION</h3>
          <div className="wave-container" aria-hidden="true">
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </div>
        </div>

        <div className="social-media" aria-label="Social links">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
              <svg viewBox={link.viewBox} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <path d={link.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const pulseRed = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`;

const waveAnimation = keyframes`
  0%, 100% { height: 10px; background-color: #ff5858; }
  50% { height: 35px; background-color: #ff8585; }
`;

const StyledWrapper = styled.aside`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 50;

  .card {
    width: 220px;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .header {
    display: flex;
    align-items: center;
    padding: 16px;
    background: #262626;
    border-bottom: 1px solid #333;
  }

  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 8px;
    object-fit: cover;
    border: 2px solid #ff5858;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
    min-width: 0;
  }

  .name {
    margin: 0;
    color: #ffffff;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 1.25;
  }

  .handle {
    margin: 0;
    color: #aaaaaa;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.4;
  }

  .description {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
    background: #1a1a1a;
  }

  .pulse-text {
    margin: 0 0 16px;
    color: #ff5858;
    font-family: monospace;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.4;
    text-align: center;
    animation: ${pulseRed} 2s infinite ease-in-out;
  }

  .wave-container {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 40px;
  }

  .wave-container .bar {
    display: block;
    width: 6px;
    border-radius: 3px;
    background-color: #ff5858;
    animation: ${waveAnimation} 1.2s infinite ease-in-out;
  }

  .wave-container .bar:nth-child(1) { animation-delay: 0s; }
  .wave-container .bar:nth-child(2) { animation-delay: 0.2s; }
  .wave-container .bar:nth-child(3) { animation-delay: 0.4s; }
  .wave-container .bar:nth-child(4) { animation-delay: 0.1s; }
  .wave-container .bar:nth-child(5) { animation-delay: 0.3s; }

  .social-media {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 16px;
    background: #262626;
    border-top: 1px solid #333;
  }

  .social-media a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: transform 0.2s ease;
  }

  .social-media a:hover,
  .social-media a:focus-visible {
    transform: scale(1.1);
  }

  .social-media a:focus-visible {
    outline: 2px solid #ff8585;
    outline-offset: 4px;
    border-radius: 999px;
  }

  .social-media svg {
    width: 20px;
    height: 20px;
    fill: #ff5858;
  }

  @media (max-width: 640px) {
    bottom: 16px;
    right: 16px;

    .card {
      width: 200px;
    }
  }
`;

export default Card;
