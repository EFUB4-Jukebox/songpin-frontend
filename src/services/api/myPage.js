import client from "./client";

const get = async url => {
  const res = await client.get(url);
  return res?.data;
};

const post = async (url, data) => {
  const res = await client.post(url, data);
  return res?.data;
};

export const getMyProfile = async () => {
  try {
    const data = await get(`/me`);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

export const getMyPinFeed = async () => {
  try {
    const data = await get(`/me/feed`);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

export const editMyProfile = async editProfile => {
  try {
    const data = await client.patch(`/me`, editProfile);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

export const getMyPlaylist = async () => {
  try {
    const data = await get(`/me/playlists`);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

export const getMyPlaylistBookmark = async () => {
  try {
    const data = await get(`/me/bookmarks`);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

export const addFollowing = async followId => {
  try {
    const data = await post("/follows", followId);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

export const getFollowerList = async memberId => {
  try {
    const data = await get(`/members/${memberId}/followers`);
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

export const getFollowingList = async memberId => {
  try {
    const data = await get(`/members/${memberId}/followings`);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

export const deleteFollowing = async followId => {
  try {
    const data = await client.delete(`/follows/${followId}`);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

export const getCalendarPin = async ({ year, month }) => {
  try {
    const data = await get(`/me/calendar?year=${year}&month=${month}`);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

//북마크 추가
export const addBookmarkOne = async playlistId => {
  try {
    const data = await post(`/bookmarks`, playlistId);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

//북마크 취소
export const deleteBookmarkOne = async bookmarkId => {
  try {
    const data = await client.delete(`/bookmarks/${bookmarkId}`);
    console.log("북마크 삭제 성공:", data);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

export const searchPin = async ({ keyword }) => {
  try {
    console.log(keyword);
    const data = await get(`/me/pins?keyword=${keyword}`);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

export const resetPassword = async resetPw => {
  try {
    const data = await client.patch(`/me/pw`, resetPw);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

export const withdrawal = async passwordConfirm => {
  try {
    const data = await client.patch(`/me/status`, passwordConfirm);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};
