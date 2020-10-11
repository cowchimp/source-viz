import * as React from 'react';

export function VsCodeLogo() {
  return (
    <a
      href="https://marketplace.visualstudio.com/items?itemName=cowchimp.source-viz-vscode"
      title="VSCode Extension"
      target="_blank"
    >
      <svg
        width={24}
        height={24}
        viewBox="0 0 1010 1018"
        className="vscode-icon"
      >
        <defs>
          <path
            d="M543 781.4C435.5 673.9 346.8 585.5 346 585.1c-1.1-.6-34.5 25.3-125.3 97.1l-123.8 98-47.7-24.5-47.7-24.5L1 489.5c-.5-241-.5-241.8 1.5-243 1.1-.7 22.8-11.9 48.2-24.9l46.2-23.7 124.2 98.2 124.2 98.1 196.8-196.8L738.9.6l47.3 19.1c26 10.4 80.2 32.2 120.5 48.4l73.2 29.4.1 391.2c0 370.2-.1 391.3-1.8 392.2-2.8 1.5-238 96.1-238.9 96.1-.4 0-88.8-88-196.3-195.6zm194.3-291.6c-.3-110.7-.5-201.6-.6-202.1-.1-.4-58.2 44.6-129 99.9-70.8 55.3-128.6 101.1-128.4 101.7.4 1.4 255.9 201.5 257.3 201.6.9.1 1-51.6.7-201.1zm-566.9 74.7c40.5-41 73.6-75 73.6-75.5 0-.7-109.7-114.7-140.1-145.5l-7.9-8v151.8c0 83.4.2 151.7.4 151.7s33.5-33.5 74-74.5z"
            id="prefix__a"
          />
          <mask
            id="prefix__b"
            maskContentUnits="userSpaceOnUse"
            maskUnits="objectBoundingBox"
            x={-15}
            y={-15}
            width={1009.278}
            height={1006.4}
          >
            <path fill="#fff" d="M-14.278-14.4H995V992H-14.278z" />
            <use xlinkHref="#prefix__a" />
          </mask>
        </defs>
        <g fill="none" fillRule="evenodd">
          <g fillRule="nonzero" transform="matrix(1 0 0 -1 15 1001)">
            <use fill="#000" fillRule="evenodd" xlinkHref="#prefix__a" />
            <use
              stroke="#FFF"
              mask="url(#prefix__b)"
              strokeWidth={30}
              xlinkHref="#prefix__a"
            />
          </g>
          <path
            d="M752.3 511.2c-.3 110.7-.5 201.6-.6 202.1-.1.4-58.2-44.6-129-99.9-70.8-55.3-128.6-101.1-128.4-101.7.4-1.4 255.9-201.5 257.3-201.6.9-.1 1 51.6.7 201.1zM185.4 436.5c40.5 41 73.6 75 73.6 75.5 0 .7-109.7 114.7-140.1 145.5l-7.9 8V513.7c0-83.4.2-151.7.4-151.7s33.5 33.5 74 74.5z"
            fill="#FFF"
          />
        </g>
      </svg>
    </a>
  );
}
