import { IUser, TypeUserForm } from "@/types/auth.types";
import { axiosWithAuth } from "@/api/interceptors";
import { AxiosResponse } from "axios";

export interface IProfileResponse {
	user: IUser;
	statistics: { label: string; value: string }[];
}

class UserService {
	private BASE_URL: string = "user/profile";

	public async getProfile() {
		const res: AxiosResponse<IProfileResponse> =
			await axiosWithAuth.get<IProfileResponse>(this.BASE_URL);
		return res.data;
	}

	public async updateProfile(data: TypeUserForm) {
		const res = await axiosWithAuth.put(this.BASE_URL, data);
		return res.data;
	}
}
