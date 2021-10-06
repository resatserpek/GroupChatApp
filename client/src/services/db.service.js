import http from "../http-common";

class DBService {
    createRoom(data) {
        return http.post("/room", data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    getRooms(signal) {
        return http.get("/rooms", signal);
    }
}

export default new DBService();