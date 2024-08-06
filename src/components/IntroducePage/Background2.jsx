import { useEffect, useRef } from "react";
import lofi from "../../assets/common/lo_fi_Icon.svg";
import hiphop from "../../assets/common/hiphop_Icon.svg";
import rock from "../../assets/common/rock_Icon.svg";
import pop from "../../assets/common/pop_Icon.svg";
import ballade from "../../assets/common/ballade_Icon.svg";

const Background2 = () => {
  const canvasRef = useRef(null);

  const icons = [
    {
      x: 120,
      y: 130,
      r: 38,
      img: lofi,
      imgRef: useRef(null),
      angle: 0, // 회전 각도 추가
      rotationSpeed: 0.06, // 회전 속도
    },
    {
      x: 600,
      y: 780,
      r: 38,
      img: lofi,
      imgRef: useRef(null),
      angle: 0,
      rotationSpeed: 0.06,
    },
    {
      x: 1800,
      y: 350,
      r: 38,
      img: lofi,
      imgRef: useRef(null),
      angle: 0,
      rotationSpeed: 0.06,
    },

    {
      x: 160,
      y: 400,
      r: 30,
      img: hiphop,
      imgRef: useRef(null),
      angle: 0,
      rotationSpeed: 0.06,
    },
    {
      x: 1650,
      y: 500,
      r: 30,
      img: hiphop,
      imgRef: useRef(null),
      angle: 0,
      rotationSpeed: 0.06,
    },
    {
      x: 1600,
      y: 900,
      r: 30,
      img: hiphop,
      imgRef: useRef(null),
      angle: 0,
      rotationSpeed: 0.06,
    },

    {
      x: 400,
      y: 200,
      r: 38,
      img: rock,
      imgRef: useRef(null),
      angle: 0,
      rotationSpeed: 0.06,
    },
    {
      x: 1770,
      y: 750,
      r: 38,
      img: rock,
      imgRef: useRef(null),
      angle: 0,
      rotationSpeed: 0.06,
    },

    {
      x: 200,
      y: 580,
      r: 32,
      img: pop,
      imgRef: useRef(null),
      angle: 0,
      rotationSpeed: 0.06,
    },
    {
      x: 1750,
      y: 150,
      r: 32,
      img: pop,
      imgRef: useRef(null),
      angle: 0,
      rotationSpeed: 0.06,
    },

    {
      x: 500,
      y: 340,
      r: 32,
      img: ballade,
      imgRef: useRef(null),
      angle: 0,
      rotationSpeed: 0.06,
    },
    {
      x: 350,
      y: 900,
      r: 32,
      img: ballade,
      imgRef: useRef(null),
      angle: 0,
      rotationSpeed: 0.06,
    },
    {
      x: 1550,
      y: 600,
      r: 32,
      img: ballade,
      imgRef: useRef(null),
      angle: 0,
      rotationSpeed: 0.06,
    },
  ];

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = 1920;
    canvas.height = 1080;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const createCircle = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 지우기

      icons.forEach(icon => {
        const { x, y, r, imgRef, angle, rotationSpeed } = icon;

        // 회전 각도 업데이트
        icon.angle += rotationSpeed;

        ctx.save(); // 현재 상태 저장
        ctx.translate(x, y); // 캔버스 원점 이동
        ctx.rotate(angle); // 회전 적용

        const scaledR = r * 1.2; // 이미지 크기 조정
        ctx.drawImage(
          imgRef.current,
          -scaledR / 2,
          -scaledR / 2,
          scaledR,
          scaledR,
        );

        ctx.restore(); // 원래 상태로 복구
      });
    };

    const interval = setInterval(createCircle, 30); // 애니메이션 주기 설정
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div>
      <canvas
        id="ballanimation"
        ref={canvasRef}
        width="1920px"
        height="1080px"
        style={{
          border: "none",

          margin: "auto",
        }}
      />
      {icons.map((icon, index) => (
        <img
          key={index}
          src={icon.img}
          ref={icon.imgRef}
          style={{ display: "none" }}
        />
      ))}
    </div>
  );
};

export default Background2;
