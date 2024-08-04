import { axiosWithAuth } from "@/api/interceptors";
import { ITaskResponse, TypeTaskFormState } from "@/types/task.types";

class TaskService {
	private BASE_URL = "/user/tasks";

	public async getTasks() {
		const res = await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL);
		return res;
	}

	public async createTask(data: TypeTaskFormState) {
		const res = await axiosWithAuth.post(this.BASE_URL, data);
		return res;
	}

	public async updateTask(id: string, data: TypeTaskFormState) {
		const res = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data);
		return res;
	}

	public async deleteTask(id: string) {
		const res = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
		return res;
	}
}

export const taskService = new TaskService();
