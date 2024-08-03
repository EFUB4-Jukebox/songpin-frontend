import client from "./client";

const get = async url => {
    const res = await client.get(url);
    return res?.data;
};

const post = async (url, data) => {
    const res = await client.post(url, data);
    return res?.data;
};

export const postNewPin = async () => {
    try {
        const data = await post(`/pins`);
        return data;
    } catch (error) {
        throw new Error("핀 생성 실패");
    }
};