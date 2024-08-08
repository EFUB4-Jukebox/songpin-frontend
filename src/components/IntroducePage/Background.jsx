import { useEffect, useRef } from "react";
import lofi from "../../assets/common/lo_fi_Icon.svg";
import hiphop from "../../assets/common/hiphop_Icon.svg";
import rock from "../../assets/common/rock_Icon.svg";
import pop from "../../assets/common/pop_Icon.svg";
import ballade from "../../assets/common/ballad.svg";

const Background = () => {
  const canvasRef = useRef(null);

  const icons = [
    {
      x: useRef(100),
      y: useRef(100),
      r: 38,
      vx: 3,
      vy: 3,
      img: lofi,
      imgRef: useRef(null),
    },
    {
      x: useRef(1200),
      y: useRef(900),
      r: 38,
      vx: -4,
      vy: -4,
      img: lofi,
      imgRef: useRef(null),
    },
    {
      x: useRef(700),
      y: useRef(900),
      r: 38,
      vx: -3,
      vy: -3,
      img: lofi,
      imgRef: useRef(null),
    },
    {
      x: useRef(1500),
      y: useRef(1200),
      r: 38,
      vx: 3,
      vy: -3,
      img: lofi,
      imgRef: useRef(null),
    },

    {
      x: useRef(600),
      y: useRef(200),
      r: 30,
      vx: -3,
      vy: 3,
      img: hiphop,
      imgRef: useRef(null),
    },
    {
      x: useRef(1500),
      y: useRef(100),
      r: 30,
      vx: -2,
      vy: 2,
      img: hiphop,
      imgRef: useRef(null),
    },
    {
      x: useRef(200),
      y: useRef(100),
      r: 30,
      vx: 2,
      vy: 2,
      img: hiphop,
      imgRef: useRef(null),
    },
    {
      x: useRef(1200),
      y: useRef(1000),
      r: 30,
      vx: 2,
      vy: -2,
      img: hiphop,
      imgRef: useRef(null),
    },

    {
      x: useRef(600),
      y: useRef(300),
      r: 38,
      vx: 3,
      vy: 3,
      img: rock,
      imgRef: useRef(null),
    },
    {
      x: useRef(300),
      y: useRef(100),
      r: 38,
      vx: -3,
      vy: 3,
      img: rock,
      imgRef: useRef(null),
    },
    {
      x: useRef(1000),
      y: useRef(100),
      r: 38,
      vx: -2,
      vy: 2,
      img: rock,
      imgRef: useRef(null),
    },
    {
      x: useRef(1800),
      y: useRef(900),
      r: 38,
      vx: -2,
      vy: -2,
      img: rock,
      imgRef: useRef(null),
    },

    {
      x: useRef(1500),
      y: useRef(300),
      r: 32,
      vx: 3,
      vy: 2,
      img: pop,
      imgRef: useRef(null),
    },
    {
      x: useRef(1600),
      y: useRef(400),
      r: 32,
      vx: -3,
      vy: 2,
      img: pop,
      imgRef: useRef(null),
    },
    {
      x: useRef(100),
      y: useRef(400),
      r: 32,
      vx: 3,
      vy: -2,
      img: pop,
      imgRef: useRef(null),
    },
    {
      x: useRef(1200),
      y: useRef(1000),
      r: 32,
      vx: -2,
      vy: 2,
      img: pop,
      imgRef: useRef(null),
    },

    {
      x: useRef(1200),
      y: useRef(300),
      r: 35,
      vx: 3,
      vy: -3,
      img: ballade,
      imgRef: useRef(null),
    },
    {
      x: useRef(1500),
      y: useRef(100),
      r: 35,
      vx: 4,
      vy: -4,
      img: ballade,
      imgRef: useRef(null),
    },
    {
      x: useRef(900),
      y: useRef(900),
      r: 35,
      vx: 4,
      vy: -4,
      img: ballade,
      imgRef: useRef(null),
    },
    {
      x: useRef(300),
      y: useRef(800),
      r: 35,
      vx: -3,
      vy: 2,
      img: ballade,
      imgRef: useRef(null),
    },
  ];

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    icons.forEach(icon => {
      const { x, y, r } = icon;
      if (x.current > canvas.width - r) x.current = canvas.width - r;
      if (x.current < r) x.current = r;
      if (y.current > canvas.height - r) y.current = canvas.height - r;
      if (y.current < r) y.current = r;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    const createCircle = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); //0,0 : 지우기를 시작할 사각형의 왼쪽 상단 모서리의 x,y 좌표 , width, height : 지울 영역의 너비와 높이

      icons.forEach(icon => {
        const { x, y, r, imgRef, vx, vy } = icon;
        x.current += vx;
        y.current += vy;

        if (x.current > canvas.width - r || x.current < r) {
          icon.vx = -vx;
        }
        if (y.current > canvas.height - r || y.current < r) {
          icon.vy = -vy;
        }

        const scale = 1.2;
        const scaledR = r * scale;

        ctx.drawImage(
          imgRef.current,
          x.current - scaledR,
          y.current - scaledR,
          scaledR,
          scaledR,
        );
      });
    };
    const interval = setInterval(createCircle, 10);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  return (
    <>
      <canvas
        id="ballanimation"
        ref={canvasRef}
        width="1920"
        height="1080"
        style={{ border: "none", position: "fixed", top: 0, left: 0 }}
      />
      {icons.map((icon, index) => (
        <img
          key={index}
          src={icon.img}
          ref={icon.imgRef}
          style={{ display: "none" }}
        />
      ))}
    </>
  );
};

export default Background;
