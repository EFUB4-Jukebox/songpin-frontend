import React, { useEffect, useState } from "react";
import axios from "axios";
import { getStats } from "../../services/api/stats";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";

const DynamicSvg = ({ imageUrl, lat, lng, id }) => {
  useEffect(() => {
    const loadMapScript = () => {
      if (!window.kakao) {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.REACT_APP_MAP_API_KEY}`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
          window.kakao.maps.load(() => {
            initializeMap();
          });
        };
      } else {
        window.kakao.maps.load(() => {
          initializeMap();
        });
      }
    };

    const initializeMap = () => {
      const container = document.getElementById(`map-${id}`);
      if (container) {
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 5,
        };
        new window.kakao.maps.Map(container, options);
      } else {
        console.error("Map 컨테이너를 찾을 수 없습니다.");
      }
    };

    loadMapScript();
  }, [lat, lng, id]);
  return (
    <svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clipPath">
          <path
            d="M347.12 140.67L346.619 141.362L347.468 141.46C376.7 144.838 399.394 169.752 399.5 199.947C399.5 232.463 373.114 258.856 340.607 258.856H337.626H336.42L337.273 259.709L340.998 263.436C364.007 286.451 364.007 323.717 340.998 346.732C318.519 369.217 282.318 369.641 259.203 347.998L258.492 347.333L258.365 348.298C254.566 377.225 229.868 399.5 200 399.5C170.133 399.5 145.434 377.119 141.635 348.298L141.507 347.327L140.795 348C117.789 369.745 81.4828 369.219 59.0018 346.732C35.9932 323.717 35.9932 286.451 59.0018 263.436L62.7272 259.709L63.5805 258.856H62.3736H59.3933C26.8862 258.856 0.5 232.463 0.5 199.947C0.5 169.754 23.2976 144.838 52.5321 141.46L53.3839 141.362L52.8787 140.669C36.098 117.655 38.1032 85.3514 58.8954 64.5537C81.2697 42.1734 117.155 41.6443 140.27 62.7594L141.107 63.5242V62.3902V59.4091C141.107 26.893 167.493 0.5 200 0.5C232.507 0.5 258.893 26.893 258.893 59.4091V62.3902V63.528L259.731 62.7585C282.845 41.5392 318.729 42.1724 341.105 64.5537C361.79 85.2443 363.796 117.655 347.12 140.67Z"
            stroke="#232323"
          />
        </clipPath>
      </defs>
      <g filter="url(#filter0_b_2210_2379)">
        <path
          d="M347.12 140.67L346.619 141.362L347.468 141.46C376.7 144.838 399.394 169.752 399.5 199.947C399.5 232.463 373.114 258.856 340.607 258.856H337.626H336.42L337.273 259.709L340.998 263.436C364.007 286.451 364.007 323.717 340.998 346.732C318.519 369.217 282.318 369.641 259.203 347.998L258.492 347.333L258.365 348.298C254.566 377.225 229.868 399.5 200 399.5C170.133 399.5 145.434 377.119 141.635 348.298L141.507 347.327L140.795 348C117.789 369.745 81.4828 369.219 59.0018 346.732C35.9932 323.717 35.9932 286.451 59.0018 263.436L62.7272 259.709L63.5805 258.856H62.3736H59.3933C26.8862 258.856 0.5 232.463 0.5 199.947C0.5 169.754 23.2976 144.838 52.5321 141.46L53.3839 141.362L52.8787 140.669C36.098 117.655 38.1032 85.3514 58.8954 64.5537C81.2697 42.1734 117.155 41.6443 140.27 62.7594L141.107 63.5242V62.3902V59.4091C141.107 26.893 167.493 0.5 200 0.5C232.507 0.5 258.893 26.893 258.893 59.4091V62.3902V63.528L259.731 62.7585C282.845 41.5392 318.729 42.1724 341.105 64.5537C361.79 85.2443 363.796 117.655 347.12 140.67Z"
          stroke="#232323"
        />
        {imageUrl ? (
          <image
            href={imageUrl}
            x="0"
            y="0"
            width="400"
            height="400"
            clip-path="url(#clipPath)"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <foreignObject
            x="0"
            y="0"
            width="400"
            height="400"
            clip-path="url(#clipPath)"
          >
            <div
              id={`map-${id}`}
              style={{ width: "400px", height: "400px", borderRadius: "50%" }}
            ></div>
          </foreignObject>
        )}
      </g>
      <defs>
        <filter
          id="filter0_b_2210_2379"
          x="-4"
          y="-4"
          width="408"
          height="408"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_2210_2379"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_2210_2379"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default DynamicSvg;
