import { axiosClient } from "@/utils/Axios";
import { ActionFunctionArgs, Form, json, redirect, useActionData, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { logIn } from "@/utils/ElectronAPI";

export async function action({ request }: ActionFunctionArgs) {
	try {
		const response = await axiosClient.post(`http://localhost:3000/auth/login`, Object.fromEntries(new URLSearchParams(await request.text())), {
			headers: {
				"Content-Type": "application/json"
			}
		});

		if (response.status === 200) {
			return json(response.data);
		}
	} catch (e) {
		return json(JSON.parse((e as AxiosError).request.response));
	}

	return null;
}

export default function Login() {
	const navigate = useNavigate();
	const data = useActionData() as { status: number; message: string; token?: string } | undefined;
	const [error, setError] = useState<string|void>(undefined);
	const [buttonDisabled, setButtonDisabled] = useState(false);
	useEffect(() => {
		setButtonDisabled(false);
		if (data && data.status !== 200) {
			setError(data.message);
		} else if (data && data.status === 200) {
			logIn(data.token!);
			navigate("/", { replace: true });
		}
	}, [data]);

	return (<div className="bg-[#DAEEB8] h-screen w-screen flex flex-col justify-between items-center">
		<section>
			<img src={"/Login_Vector.svg"} alt="Line" height={340} width={565}></img>
			<div className="absolute -top-4 z-10 mx-6 flex">
				<img src={"/Lamp.png"} alt="Lamp" width={191} height={283} style={{ width: "191px", height: "283px" }}></img>
				<img className="-ml-12" src={"/Lamp.png"} alt="Lamp" width={146} height={194} style={{ width: "146px", height: "194px" }}></img>
			</div>
		</section>
		<section className="w-[90%] flex flex-col justify-center items-center">
			<h1 className="font-medium text-4xl self-start">Login</h1>
			{error !== undefined && (
				<div className="alert alert-error shadow-lg mt-3">
					<div className="text-start">
						<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
						<span>{error}</span>
					</div>
				</div>
			)}
			<Form method="post" className="w-full mt-3 flex flex-col gap-y-4">
				<div className="w-full">
					<label htmlFor="email" className="text-xl font-medium">E-mail</label>
					<input className="mt-1 w-full px-4 py-3 rounded-lg border border-black" type={"email"} id="email" name="email" placeholder="youremail@gmail.com"></input>
				</div>
				<div>
					<label htmlFor="password" className="text-xl font-medium">Password</label>
					<input className="mt-1 w-full px-4 py-3 rounded-lg border border-black" type={"password"} id="password" name="password" placeholder="Your Password"></input>
				</div>
				<br></br>
				<button
					type="submit"
					onClick={() => setButtonDisabled(true)}
					className={`btn btn-wide mt-5 bg-[#2B2D32] rounded-full h-[46px] self-center ${buttonDisabled ? "btn-disabled loading" : ""}`}>{
						buttonDisabled ? "" : "Masuk"
					}</button>
			</Form>
		</section>
		<br/>
	</div>);
}
