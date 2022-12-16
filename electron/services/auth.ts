import axios, { Axios, AxiosError } from "axios";
import { deletePassword, findCredentials, getPassword, setPassword } from "keytar";
import { userInfo } from "os";

const keytarService = "sosmart-auth";
const keytarAccount = userInfo().username;

const axiosClient = axios.create({
	baseURL: "http://localhost:3000/"
});

let profile = undefined;

export const getProfile = () => profile;
export async function getToken(): Promise<string | undefined> {
	const token = await getPassword(keytarService, keytarAccount);
	if (!token) {
		return undefined;
	}

	const info = await axiosClient.get("auth/@me", {
		headers: {
			"Authorization": token
		}
	}).catch((e: AxiosError) => e);

	if (info instanceof AxiosError || info.status !== 200) {
		await logOut();
		return undefined;
	}

	profile = info.data;
	return token;
}

export async function logOut(): Promise<boolean> {
	profile = undefined;
	return deletePassword(keytarService, keytarAccount);
}

export async function logIn(token: string): Promise<boolean> {
	if (profile) return Promise.resolve(false);
	await setPassword(keytarService, keytarAccount, token);
	return true;
}
