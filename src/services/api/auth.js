import client from "./client";

const post = async (url, data) => {
  const res = await client.post(url, data);
  return res?.data;
};

export const postSignup = async userData => {
  try {
    const res = await client.post("/signup", userData);
    if (res.status === 409) {
      alert("이미 가입된 이메일입니다.");
      return null;
    }
    console.log(userData, "회원가입 성공");
  } catch (e) {
    console.error(e);
    throw new Error(e.response.data.message);
  }
};

export const postLogin = async userData => {
  try {
    const res = await post("/login", userData);
    console.log(userData);
    console.log(res);
    const token = res.accessToken;
    localStorage.setItem("accessToken", token);
    console.log(token);
    return { token };
  } catch (e) {
    console.error(e);
    if (e.response) {
      return { error: e.response.data.message, status: e.response.status };
    }
    return null;
  }
};

export const postLogout = async () => {
  try {
    const res = await client.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        withCredentials: true,
      },
    );
    localStorage.removeItem("accessToken");
    console.log("로그아웃 성공");
    alert("로그아웃 되었습니다.");
  } catch (e) {
    if (e.response) {
      if (e.response.status === 401) {
        alert("로그인 상태가 아닙니다.");
        console.error(e.response, "로그아웃 실패");
      }
    } else {
      console.error(e, "로그아웃 실패");
    }
  }
};

const getAccessToken = () => localStorage.getItem("accessToken");

export const postToken = async () => {
  try {
    const res = await client.post(
      "/token",
      {},
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        withCredentials: true,
      },
    );

    const { accessToken } = res.data;
    console.log(accessToken);
    localStorage.setItem("accessToken", accessToken);
    console.log(accessToken);

    return accessToken;
  } catch (e) {
    console.error(e);

    if (e.response.status === 401) {
      if (e.response.errorCode === "EXPIRED_REFRESH_TOKEN")
        window.location.href = "/home";
    }
    throw e;
  }
};

export const postMail = async email => {
  try {
    const res = await client.post("/mail/pw", { email });
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    throw e.response && e.response.data
      ? e.response.data
      : { message: e.message };
  }
};

export const patchResetPw = async uuidResetPw => {
  try {
    const data = await client.patch(`/login/pw`, uuidResetPw);
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};
