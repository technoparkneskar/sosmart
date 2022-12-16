import { getProfile, getToken } from "@/utils/ElectronAPI";
import { LoaderFunction, json, redirect } from "react-router-dom";

export const RootLoader: LoaderFunction = async () => {
	const token = await getToken();
	if (token !== undefined) return json(await getProfile());
	return redirect("/login");
};
