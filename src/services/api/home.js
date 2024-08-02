import client from './client';

const get = async url => {
    const res = await client.get(url);
    return res?.data;
};

// const post = async (url, data) => {
//     const res = await client.post(url, data);
//     return res?.data;
// };

export const getHomeInfo = async () => {
    try {
        const data = await get(`/home`);
        return data;
    } catch (error) {
        throw new Error("홈 정보 로드 실패");
    }
};