import { axiosClient } from "@/utils/Axios";
import { getToken } from "@/utils/ElectronAPI";
import { faChevronLeft, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function Verification() {
	const token = useLoaderData();
	const navigate = useNavigate();
	const [codes, setCodes] = useState<(number|undefined)[]>([]);
	const [keypadDisabled, setKeypadDisabled] = useState(false);
	const keypad = [1, 2, 3, 4, 5, 6, 7, 8, 9, undefined, 0, <FontAwesomeIcon icon={faDeleteLeft}/>];
	const [error, setError] = useState<string|undefined>(undefined);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (codes.length >= 6) {
			console.log(codes);
			setKeypadDisabled(true);
			(async () => {
				const response = await axiosClient.post("auth/activation/verify", JSON.stringify({
					code: Number(codes.join(""))
				}), {
					headers: {
						"Authorization": await getToken(), // token,
						"Content-Type": "application/json"
					}
				}).catch((e: AxiosError) => e);

				setKeypadDisabled(false);

				if (response instanceof AxiosError) {
					const message = JSON.parse(response.request.response).message;
					if (message === "ACCOUNT_ALREADY_VERIFIED") {
						navigate("/");
					}
					return setError(message);
				}

				if (response.status === 200) {
					return setSuccess(true);
				}
			})().catch(console.error);
		}
	}, [codes]);

    return (<div className="bg-[#DAEEB8] w-full h-screen">
		<div className="h-full w-full flex justify-center">
			<main className="w-[90%] py-4">
				<FontAwesomeIcon icon={faChevronLeft} />
				<div className="h-[1.25rem]"></div>
				<h1 className="font-bold text-2xl">Verifikasi Kode</h1>
				<p className="text-sm mt-3">Mohon masukkan kode verifikasi kode yang telah kami ke email <b>ayu@gmail.com</b></p>
				{error !== undefined && (
					<div className="alert alert-error shadow-md justify-start items-start  mt-5 transition-all ease-linear delay-150">
						<div>
							<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
							<span>{error}</span>
						</div>
					</div>
				)}
				<div className="h-[2rem]"></div>
				<div className="grid grid-cols-6 grid-rows-1 place-items-center">
					{new Array(6).fill(1).map((_, i) => (
						<div key={i} className="flex items-center justify-center rounded-full bg-[#F1C17A] h-[50px] w-[50px] shadow-lg">
							{codes[i] !== undefined ? <p className="font-bold text-xl">{codes[i]}</p> : ""}
						</div>
					))}
				</div>
			</main>
			<div className={`modal ${success ? "modal-open" : ""}`}>
				<div className="modal-box">
					<h3 className="font-bold text-lg">Akun Terverifikasi</h3>
					<p className="py-4">Terimakasih telah memverifikasi akun anda. Sekarang anda bisa menggunakan <b>SoSmart</b>!</p>
					<div className="modal-action">
						<label htmlFor="my-modal-6" className="btn" onClick={() => navigate("/")}>Back to Homepage</label>
					</div>
				</div>
			</div>
			<div className={`modal ${keypadDisabled ? "modal-open" : ""}`}>
				<button className="btn loading btn-square rounded-full"></button>
			</div>
			<div className="fixed bottom-0 left-0 right-0 w-full bg-white py-5">
				<div className={`w-[85%] m-auto grid grid-cols-3 grid-rows-4 gap-y-8 place-items-center ${keypadDisabled || success ? "text-gray-500" : "text-black"}`}>
					{keypad.map((x, i) => {
						if (x === undefined) return (<div key={i}/>)
						const handleInput = () => {
							if (keypadDisabled || success) return;
							setCodes((old) => {
								if (old.length >= 6) return old;
								return [...old, x as number];
							});
						}

						const handleDelete = () => {
							if (keypadDisabled || success) return;
							setCodes(old => {
								return [...old.filter((x, i) => i !== old.length - 1)];
							});
						}

						if (typeof x === "number") {
							return (<p onClick={handleInput} key={i} className="font-regular text-3xl">{x}</p>);
						} else {
							return (<p onClick={handleDelete} key={i} className="font-regular text-3xl">{x}</p>);
						}
					})}
				</div>
			</div>
		</div>
	</div>);
}
