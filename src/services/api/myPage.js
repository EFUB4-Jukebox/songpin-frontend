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

export const getMyPinFeed = async page => {
  try {
    const data = await get(`me/feed?page=${page}&size=20`);
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

export const addFollowing = async addFollowingId => {
  try {
    const data = await client.put("/follows", addFollowingId);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

export const getFollowerList = async handle => {
  try {
    console.log(handle);
    const data = await get(`/members/${handle}/followers`);
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

export const getFollowingList = async handle => {
  try {
    console.log(handle);
    const data = await get(`/members/${handle}/followings`);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

export const deleteFollowing = async deleteFollowingId => {
  try {
    const data = await client.put(`/follows`, deleteFollowingId);
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
    const data = await client.put(`/bookmarks`, playlistId);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

//북마크 취소
export const deleteBookmarkOne = async playlistId => {
  try {
    const data = await client.put(`/bookmarks`, playlistId);
    console.log("북마크 삭제 성공:", data);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

export const searchPin = async ({ keyword, page }) => {
  try {
    console.log(keyword);
    const data = await get(`/me/pins?keyword=${keyword}&page=${page}&size=20`);
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

//팔로워 삭제

export const deleteFollower = async memberId => {
  try {
    const data = await client.delete(`/follows/followers`, {
      data: { memberId: memberId },
    });
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(`데이터 불러오기에 실패하였습니다., ${error}`);
  }
};
