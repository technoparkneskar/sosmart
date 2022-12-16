import { useNavigate } from "react-router-dom";

export default function Register() {
	const navigate = useNavigate();

    return (<div className="h-full w-screen flex flex-col justify-between items-center">
        <section>
            <img src={"/Login_Vector.svg"} alt="Line" height={340} width={565}></img>
            <div className="absolute -top-4 z-10 mx-6 flex">
                <img src={"/Lamp.png"} alt="Lamp" width={191} height={283} style={{ width: "191px", height: "283px" }}></img>
                <img className="-ml-12" src={"/Lamp.png"} alt="Lamp" width={146} height={194} style={{ width: "146px", height: "194px" }}></img>
            </div>
        </section>
        <section className="w-[90%] flex flex-col justify-center items-center">
            <h1 className="font-medium text-4xl self-start">Daftar</h1>
            <br></br>
            <form onSubmit={(e) => { e.preventDefault(); navigate("/") }} className="w-full mt-3 flex flex-col gap-y-4">
                <div className="w-full">
                    <label htmlFor="email" className="text-xl font-medium">E-mail</label>
                    <input className="mt-1 w-full px-4 py-3 rounded-lg border border-black" type={"email"} id="email" name="email" placeholder="youremail@gmail.com"></input>
                </div>
                <div>
                    <label htmlFor="password" className="text-xl font-medium">Password</label>
                    <input className="mt-1 w-full px-4 py-3 rounded-lg border border-black" type={"password"} id="password" name="password" placeholder="Your Password"></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="text-xl font-medium">Konfirmasi Password</label>
                    <input className="mt-1 w-full px-4 py-3 rounded-lg border border-black" type={"password"} id="confirmPassword" name="confirmPassword" placeholder="Your Password"></input>
                </div>
                <button type="submit" className="btn btn-wide mt-5 bg-[#2B2D32] rounded-full h-[46px] self-center">Daftar</button>
            </form>
        </section>
        <br/>
    </div>);
}
