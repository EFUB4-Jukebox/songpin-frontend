import client from "./client";

const get = async url => {
  const res = await client.get(url);
  return res?.data;
};

const post = async (url, data) => {
  const res = await client.post(url, data);
  return res?.data;
};

const patch = async (url, data) => {
  const res = await client.patch(url, data);
  return res?.data;
};

export const createPlaylist = async createdPlaylist => {
  try {
    const data = await post(`/playlists`, createdPlaylist);
    return data;
  } catch (error) {
    throw new Error("데이터 불러오기에 실패하였습니다.");
  }
};

//특정 핀을 내 플레이리스트에 추가
export const addPinPlaylist = async pinPlaylist => {
  const data = await client.post(`/playlists/pins`, pinPlaylist);
  console.log(data);
  return data;
};

// 플레이리스트 메인 api 연결
export const getPlaylists = async () => {
  const url = "/playlists/main";
  try {
    const result = await get(url);
    // console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw error;
  }
};

//플레이리스트 검색 api 연결
export const searchPlaylists = async (
  keyword,
  sortBy = "ACCURACY",
  page = 0,
  size = 20,
) => {
  const url = `/playlists?keyword=${keyword}&sortBy=${sortBy}&page=${page}&size=${size}`;
  try {
    const result = await client.get(url);
    return result?.data;
  } catch (error) {
    console.error("Error searching playlists:", error);
    throw error;
  }
};

// 플레이리스트 상세정보 api 연결
export const getPlaylistDetail = async playlistId => {
  const url = `/playlists/${playlistId}`;
  try {
    const result = await get(url);
    return result;
  } catch (error) {
    console.error("Error fetching playlist detail:", error);
    throw error;
  }
};

//플레이리스트 생성 api 연결
export const PostPlaylist = async (playlistName, visibility) => {
  const url = "/playlists";
  const data = {
    playlistName,
    visibility,
  };
  try {
    const result = await post(url, data);
    return result;
  } catch (error) {
    console.error("Error creating playlist:", error);
    throw error;
  }
};

//플레이리스트 삭제 api 연결
export const deletePlaylist = async playlistId => {
  const url = `/playlists/${playlistId}`;
  try {
    await client.delete(url);
  } catch (error) {
    console.error("Error deleting playlist:", error);
    throw error;
  }
};

// 플레이리스트 수정 api 연결
export const editPlaylist = async (
  playlistId,
  playlistName,
  visibility,
  pinCount,
  pinList,
) => {
  const url = `/playlists/${playlistId}`;
  const data = {
    playlistName,
    visibility,
    pinCount,
    pinList,
  };
  try {
    const result = await patch(url, data);
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error updating playlist:", error);
    throw error;
  }
};

// 북마크 상태 변경
export const toggleBookmark = async playlistId => {
  const url = "/bookmarks";
  const data = { playlistId };
  try {
    const response = await client.put(url, data);
    return response?.data;
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    throw error;
  }
};
