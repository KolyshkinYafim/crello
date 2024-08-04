import { IAuthForm, IAuthResponse } from "@/types/auth.types";
import { axiosClassic } from "@/api/interceptors";
import {
	removeFromStorage,
	saveTokenToStorage
} from "@/services/auth-token.service";

class AuthService {
	private BASE_URL: string = "/auth/";
	public async main(type: "login" | "register", data: IAuthForm) {
		const res = await axiosClassic.post<IAuthResponse>(
			`${this.BASE_URL}${type}`,
			data
		);

		if (res.data.access_token) saveTokenToStorage(res.data.access_token);

		return res;
	}

	public async getNewTokens() {
		const res = await axiosClassic.post<IAuthResponse>(
			`${this.BASE_URL}login/access-token`
		);
		if (res.data.access_token) saveTokenToStorage(res.data.access_token);

		return res;
	}

	public async logout() {
		const res = await axiosClassic.post<boolean>(`${this.BASE_URL}logout`);

		if (res.data) removeFromStorage();

		return res;
	}
}

export const authService = new AuthService();
