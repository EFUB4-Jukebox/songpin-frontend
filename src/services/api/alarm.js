import client from "./client";

const get = async url => {
    const res = await client.get(url);
    return res?.data;
};

const post = async (url, data) => {
    const res = await client.post(url, data);
    return res?.data;
};

export const showAlarms = async () => {
    try {
        const data = await client.patch(`/alarms`);
        return data;
    } catch (error) {
        throw new Error("알림 정보 로드 실패");
    }
};

// export const postNewAlarms = async () => {
//     try {
//         const data = await post(`/alarms/subscribe`);
//         return data;
//     } catch (error) {
//         throw new Error("실시간 새 알림 정보 로드 실패");
//     }
// };