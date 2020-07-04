export interface ITodo {
	title: string;
	description: string;
	readonly createdAt?: Date;
	updatedAt?: Date;
	priority: Priority;
	readonly id?: number;
	readonly category?: string;
}

export enum Priority {
	LOW = 1,
	MEDIUM,
	HIGH
}
