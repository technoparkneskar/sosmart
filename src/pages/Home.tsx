import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faBolt, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Card } from "../components/Card";
import { Navbar } from "../components/Navbar";
import { redirect, useLoaderData } from "react-router-dom";

export default function Home() {
    const sockets = new Array(4).fill(1);
    const usage = new Array(5).fill(1);
    const categories = ["Ruang Tamu", "Ruang Keluarga", "Dapur", "Ruang Makan"];
    const [currentActive, setCurrentActive]= useState(categories[0]);
    return (<div className="bg-[#DAEEB8]">
        <div className="h-full w-full flex justify-center">
            <main className="w-[90%] py-4">
                {/* Title */}
                <div className="flex justify-between">
                    <div className="w-4/5">
                        <h1 className="inline font-bold text-xl">Selamat datang di Rumah Shafa 👋</h1>
                    </div>
                    <img src={"/avatar_dummy.jpg"} alt="Avatar Profile" width={44} height={44} className="w-[44px] h-[44px] rounded-md shadow-md"></img>
                </div>
                <br></br>
                {/* Categories Tab */}
                <div className="flex gap-x-4 flex-wrap gap-y-2 m-0">
                    {categories.map((x, i) => (<button onClick={() => setCurrentActive(x)} className={`tab ${currentActive === x ? "tab-active" : ""}`} key={i}>{x}</button>))}
                </div>
                <br></br>
                {/* Socket Cards */}
                <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                    {sockets.map((_, i) => (
                        <Card key={i} active={true} className="flex flex-col justify-between min-h-[184px] min-w-[167px]">
                            <div className="">
                                <p className="font-medium text-xs text-[#AB5200]">Socket Pertama</p>
                                <h1 className="font-bold text-lg mt-[2px]">Rice Cooker</h1>
                            </div>
                            <div className="flex items-center justify-center gap-x-2">
                                <div className="flex items-center justify-center gap-x-1">
                                    <FontAwesomeIcon icon={faClock} color="#AB5200" size="sm"/>
                                    <p className="text-xs">2j 30m</p>
                                </div>
                                <p>|</p>
                                <div className="flex items-center justify-center gap-x-1">
                                    <FontAwesomeIcon icon={faBolt} color="#AB5200" size="sm"/>
                                    <p className="text-xs">30 W</p>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <h1 className="font-medium">ON</h1>
                                <input type="checkbox" className="toggle" />
                            </div>
                        </Card>
                    ))}
                </div>
                <br></br>
                {/* Usage History */}
                <section className="mt-4">
                    <h1 className="font-bold text-xl">History Penggunaan</h1>
                    <br/>
                    <div className="w-full flex flex-col items-center justify-center gap-y-5">
                    {usage.map((_, i) => (
                        <div key={i} className="w-full bg-[#FFE768] p-4 rounded-xl shadow-md flex items-center gap-x-8 justify-between">
                            <div>
                                <p className="text-sm text-[#AB5200]">Socket Pertama</p>
                                <h1 className="font-bold text-lg mt-1">Rice Cooker</h1>
                            </div>
                            <h1 className="font-medium"><FontAwesomeIcon icon={faClock} color="#AB5200"/> 2j 30m</h1>
                            <h1 className="font-medium"><FontAwesomeIcon icon={faDollarSign} color="#AB5200"/> Rp. 30.000</h1>
                        </div>
                    ))}
                    </div>
                </section>
            </main>
        </div>
        <Navbar></Navbar>
    </div>);
}
