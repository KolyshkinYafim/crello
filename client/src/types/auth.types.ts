export interface IAuthForm {
	email: string;
	password: string;
}
export interface IUser {
	id: number;
	email: string;
	name?: string;

	workInterval?: number;
	breakInterval?: number;
	intervalCounts?: number;
}

export interface IAuthResponse {
	access_token: string;
	user: IUser;
}

export type TypeUserForm = Omit<IUser, "id"> & { password?: string };
