import client from "./client";

export const getPlaces = async ({ keyword, sortBy, page, size }) => {
  try {
    const res = await client.get(
      `/places?keyword=${keyword}&sortBy=${sortBy}&page=${page}&size=${size}`,
    );
    console.log(res);
    return res.data.placeList;
  } catch (e) {
    console.error(e);
  }
};

export const getPlaceDetails = async placeId => {
  try {
    const res = await client.get(`/places/${placeId}`);
    return res;
  } catch (e) {
    console.error(e);
  }
};
