import client from "./client";

export const getExSpotify = async ({ keyword, offset = 0 }) => {
  try {
    const res = await client.get(
      `/external/songs?keyword=${keyword}&offset=${offset}`,
    );
    console.log(res);
    return Array.isArray(res.data) ? res.data : [];
  } catch (e) {
    console.error(e);
    return [];
  }
};
