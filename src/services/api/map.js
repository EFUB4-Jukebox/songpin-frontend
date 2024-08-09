import client from "./client";

const get = async url => {
    const res = await client.get(url);
    return res?.data;
};

const post = async (url, data) => {
    const res = await client.post(url, data);
    return res?.data;
};

export const postAllMarkers = async (request) => {
    try {
        const data = await post(`/map`, request);
        return data;
    } catch (error) {
        throw new Error("전체 기간 핀 로드 실패");
    }
};

export const postRecentMarkers = async (request) => {
    try {
        console.log('Sending Request:', request);
        const data = await post(`/map/period/recent`, request);
        console.log('Received Data:', data);
        return data;
    } catch (error) {
        throw new Error("최근 기간 핀 로드 실패");
    }
};

export const postCustomPeriodMarkers = async (request) => {
    try {
        console.log('Sending Request:', request);
        const data = await post(`/map/period/custom`, request);
        console.log('Received Data:', data);
        return data;
    } catch (error) {
        throw new Error("사용자 설정 기간 핀 로드 실패");
    }
};

export const getMyPins = async (memberId) => {
    try {
        const data = await get(`/map/members/${memberId}`);
        //onsole.log('사용자 핀 보기:', data);
        return data;
    } catch (error) {
        throw new Error("사용자 핀 로드 실패");
    }
};

export const getPlaylistPins = async (playlistId) => {
    try {
        const data = await get(`/map/playlists/${playlistId}`);
        //console.log('플리 핀 보기:', data);
        return data;
    } catch (error) {
        throw new Error("플레이리스트 핀 로드 실패");
    }
};
