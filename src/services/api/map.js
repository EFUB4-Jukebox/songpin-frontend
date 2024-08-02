import client from "./client";

const get = async url => {
    const res = await client.get(url);
    return res?.data;
};

const post = async (url, data) => {
    const res = await client.post(url, data);
    return res?.data;
};

export const postAllMarkers = async () => {
    try {
        const request = {
                "boundCoords": {
                    "swLat": 35.0,
                    "swLng": 126.0,
                    "neLat": 40.0,
                    "neLng": 129.0
                },
                "genreNameFilters": null
        };
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
