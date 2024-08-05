import client from "./client";

const get = async url => {
    const res = await client.get(url);
    return res?.data;
};

const post = async (url, data) => {
    const res = await client.post(url, data);
    return res?.data;
};

const put = async (url, data) => {
    const res = await client.put(url, data);
    return res?.data;
};

// export const postNewPin = async (request) => {
//     try {
//         const data = await post(`/pins`, request);
//         return data;
//     } catch (error) {
//         throw new Error("핀 생성 실패");
//     }
// };

//테스트 코드
export const postNewPin = async (request) => {
    try {
        const response = await fetch('/pins', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    return response;
    } catch (error) {
        console.error('핀 생성 실패:', error);
        throw error;
    }
};

export const deletePin = async (pinId) => {
    const url = `/pins/${pinId}`;
    try {
        await client.delete(url);
        console.log("핀 삭제 성공!");
    } catch (error) {
        console.error("핀 삭제 실패", error);
        throw error;
    }
};

export const editPin = async (pinId) => {
    const url = `/pins/${pinId}`;
    const data = {
        "listenedDate": "2023-12-31",
        "genreName": "POP",
        "memo": "제주도 여행 중에 가장 많이 들은 곡 ...",
        "visibility": "PUBLIC"
    };
    try {
        const result = await put(url, data);
        return result;
    } catch (error) {
        console.error("Error updating pin:", error);
        throw error;
    }
};