export default interface ITodo {
	title: string;
	description?: string;
	readonly createdAt?: Date;
	updatedAt?: Date;
	priority: number;
	readonly id?: number;
	complete?: boolean;
};
