import { useNavigate } from "react-router-dom";

const useNavigateWithFallback = () => {
  const navigate = useNavigate();

  const navigateWithFallback = () => {
    const referrer = document.referrer;
    const isLoggedIn = localStorage.getItem("accessToken");
    console.log(referrer);
    console.log(window.location.origin);
    console.log(window.history);
    if (!referrer.startsWith(window.location.origin)) {
      // 이전 페이지가 배포된 프론트엔드 주소가 아닌 경우
      if (isLoggedIn) {
        navigate("/home"); // 기본 홈페이지로 이동
      } else {
        navigate("/introduce"); // 소개 페이지로 이동
      }
    } else {
      navigate(-1); // 이전 페이지로 이동
    }
  };

  return navigateWithFallback;
};

export default useNavigateWithFallback;
