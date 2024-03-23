import axios from 'axios';
const BASEURL = process.env.NEXT_PUBLIC_BASEURL;

const getService = async (route: string) => {
	try {
		const response = await axios.get(route);
		return response?.data;
	} catch (error) {
		console.log(JSON.stringify(error, null, 2));
	}
};
export const getUser = async (id: String) => {
	return await getService(`${BASEURL}/getUser/${id}`);
};
export const getAllUsers = async () => {
	return await getService(`${BASEURL}/getAllUsers`);
};
