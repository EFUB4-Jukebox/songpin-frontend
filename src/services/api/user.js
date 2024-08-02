import client from "./client";

//유저 검색 api
export const searchUsers = async (keyword, page = 0, size = 20) => {
  const url = `/members?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`;
  try {
    const result = await client.get(url);
    return result?.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

//유저 상세정보 api
export const getUserDetail = async memberId => {
  const url = `/members/${memberId}`;
  try {
    const result = await client.get(url);
    return result;
  } catch (error) {
    console.error("Error fetching user detail:", error);
    throw error;
  }
};

//타유저 플레이리스트 조회 api
export const getUserPlaylists = async memberId => {
  const url = `/members/${memberId}/playlists`;
  try {
    const result = await client.get(url);
    return result?.data;
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    throw error;
  }
};

//타유저 핀피드 조회 api
export const getUserPins = async memberId => {
  const url = `/members/${memberId}/feed`;
  try {
    const result = await client.get(url);
    return result?.data;
  } catch (error) {
    console.error("Error fetching user feeds:", error);
    throw error;
  }
};

// 유저의 팔로워 목록 조회 API
export const getUserFollowers = async memberId => {
  const url = `/members/${memberId}/followers`;
  try {
    const result = await client.get(url);
    return result?.data;
  } catch (error) {
    console.error("Error fetching user followers:", error);
    throw error;
  }
};

// 유저의 팔로잉 목록 조회 API
export const getUserFollowings = async memberId => {
  const url = `/members/${memberId}/followings`;
  try {
    const result = await client.get(url);
    return result?.data;
  } catch (error) {
    console.error("Error fetching user followings:", error);
    throw error;
  }
};
