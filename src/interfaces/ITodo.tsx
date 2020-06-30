export interface ITodo {
	title: string;
	description?: string;
	readonly createdAt?: Date;
	updatedAt?: Date;
	priority: Priority;
	readonly id?: number;
	complete?: boolean;
}

export enum Priority {
	LOW = 1,
	MEDIUM,
	HIGH
}
