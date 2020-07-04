import axios from 'axios';

export const Fetch = (URL: string, callback?: Function | null) => {
	axios
		.get(URL)
		.then((res) => {
			if (callback) {
				callback(res);
			}
		})
		.catch((err) => console.error(err));
};
