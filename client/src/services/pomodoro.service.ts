import { axiosWithAuth } from "@/api/interceptors";
import {
	IPomodoroSessionResponse,
	TypePomodoroRoundFormState,
	TypePomodoroSessionFormState
} from "@/types/pomodoro.types";

class PomodoroService {
	private BASE_URL: string = "user/timer";

	public async getTodaySession() {
		const res = await axiosWithAuth.get<IPomodoroSessionResponse>(
			`${this.BASE_URL}/today`
		);
		return res;
	}

	public async createSession() {
		const res = await axiosWithAuth.post<IPomodoroSessionResponse>(
			this.BASE_URL
		);
		return res;
	}

	public async updateSession(id: string, data: TypePomodoroSessionFormState) {
		const res = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data);
		return res;
	}

	public async deleteSession(id: string) {
		const res = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
		return res;
	}

	public async updateRound(id: string, data: TypePomodoroRoundFormState) {
		const res = await axiosWithAuth.put(`${this.BASE_URL}/round/${id}`, data);
		return res;
	}
}

export const pomodoroService = new PomodoroService();
