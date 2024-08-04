import { axiosWithAuth } from "@/api/interceptors";
import {
	ITimeBlockResponse,
	TypeTimeBlockFormState
} from "@/types/time-block.types";

class TimeBlockService {
	private BASE_URL: string = "user/time-blocks";

	public async getTimeBlocks() {
		const res = await axiosWithAuth.get<ITimeBlockResponse>(this.BASE_URL);
		return res;
	}

	public async createTimeBlock(data: TypeTimeBlockFormState) {
		const res = await axiosWithAuth.post(this.BASE_URL, data);
		return res;
	}

	public async updateTimeBlock(id: string, data: TypeTimeBlockFormState) {
		const res = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data);
		return res;
	}

	public async updateOrderTimeBlock(ids: string[]) {
		const res = await axiosWithAuth.put(` ${this.BASE_URL}/update-order`, {
			ids
		});
		return res;
	}

	public async deleteTimeBlock(id: string) {
		const res = await axiosWithAuth.delete(` ${this.BASE_URL}/${id}`);
		return res;
	}
}

export const timeBlockService = new TimeBlockService();
