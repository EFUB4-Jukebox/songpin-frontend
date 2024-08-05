import client from "./client";

const get = async url => {
  const res = await client.get(url);
  return res?.data;
};

const post = async (url, data) => {
  const res = await client.post(url, data);
  return res?.data;
};

const put = async (url, data) => {
  const res = await client.put(url, data);
  return res?.data;
};

export const postNewPin = async request => {
  try {
    const response = await post("/pins", request);

    return response;
  } catch (error) {
    console.error("핀 생성 실패:", error);
    throw error;
  }
};

export const deletePin = async pinId => {
  const url = `/pins/${pinId}`;
  try {
    await client.delete(url);
    console.log("핀 삭제 성공!");
  } catch (error) {
    console.error("핀 삭제 실패", error);
    throw error;
  }
};

export const getPin = async pinId => {
  try {
    const response = await get(`/pins/${pinId}`);
    return response;
  } catch (error) {
    console.error("핀 정보 로드 실패:", error);
    throw error;
  }
};

export const editPin = async (pinId, request) => {
  try {
    const response = await put(`/pins/${pinId}`, request);
    return response;
  } catch (error) {
    console.error("핀 수정 실패:", error);
    throw error;
  }
};
