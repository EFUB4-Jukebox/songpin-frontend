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
