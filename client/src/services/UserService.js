import $api from "../http";

export default class UserService {
    static async setTheme(isDarkTheme) {
        return $api.post('/theme', { isDarkTheme } );
    }

    static async getTheme() {
        return $api.get('/theme' );
    }
}