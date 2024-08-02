import client from "./client";

export const getSongs = async ({ keyword, sortBy, page, size }) => {
  try {
    const res = await client.get(
      `/songs?keyword=${keyword}&sortBy=${sortBy}&page=${page}&size=${size}`,
    );
    console.log(res);
    return res.data.songList;
  } catch (e) {
    console.error(e);
  }
};

export const getSongDetails = async songId => {
  try {
    const res = await client.get(`/songs/${songId}`);
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getSongPins = async songId => {
  try {
    const res = await client.get(`/songs/${songId}/pins`);
    console.log(res);
    return res.data.songDetailsPinList || [];
  } catch (e) {
    console.erroe(e);
  }
};

export const getMySongPins = async songId => {
  try {
    const res = await client.get(`/songs/${songId}/pins/me`);
    console.log(res);
    return res.data.songDetailsPinList || [];
  } catch (e) {
    console.erroe(e);
  }
};
