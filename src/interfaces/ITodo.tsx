export default interface ITodo {
	title: string;
	description?: string;
	readonly createdAt?: Date;
	updatedAt?: Date;
	priority:
	readonly id?: number;
	complete?: boolean;
};

export enum Priority {
	LOW = 'low',
	MEDIUM = ,
	HIGH
};