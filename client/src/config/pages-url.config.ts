class Dashboard {
	private root = "/app";

	HOME: string = this.root;
	TASKS: string = `${this.root}/tasks`;
	HABITS: string = `${this.root}/habits`;
	TIMER: string = `${this.root}/timers`;
	TIME_BLOCKING: string = `${this.root}/time-blocking`;
	SETTINGS: string = `${this.root}/settings";`;
}

export const DASHBOARD_PAGES: Dashboard = new Dashboard();
