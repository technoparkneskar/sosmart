import { getToken } from "@/utils/ElectronAPI";
import { json, LoaderFunction, redirect } from "react-router-dom";

export const AuthLoader: LoaderFunction = async () => {
	const token = await getToken();
	if (token !== undefined) return redirect("/");
	return null;
};
