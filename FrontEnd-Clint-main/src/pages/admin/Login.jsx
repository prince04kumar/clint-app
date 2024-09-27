import { useEffect, useState } from 'react';
import restorent from '../../assets/logoRestorent.svg'
import { useNavigate } from 'react-router-dom';
import showToastMessage from '../../utils/toast_message';
export default function Login() {
    const [adminId, setAdminId] = useState("");
    const [adminPass, setAdminPass] = useState("");
    const navigate = useNavigate();
    const loginAction = async (e) => {
        e.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_APP_URL}/api/admin/auth`, {
            method: 'POST',
            headers: {
                'id': adminId,
                'pass': adminPass,
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            localStorage.setItem("adminId", adminId);
            localStorage.setItem("adminPass", adminPass);
            navigate('/admin'); // Redirect to /admin
        }

    }
    useEffect(() => {
        const tryLogin = async () => {
            const res = await fetch(`${import.meta.env.VITE_APP_URL}/api/admin/auth`, {
                method: 'POST',
                headers: {
                    'id': localStorage.getItem("adminId") || " ",
                    'pass': localStorage.getItem("adminPass") || " ",
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                navigate('/admin'); // Redirect to /admin
            }

        }
        tryLogin();

    }, []);
    return (
        <section className="bg-gray-200 darkdicarted:bg-gray-900 h-[100vh] flex align-middle">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 darkdicarted:text-white">
                    <img className="w-8 h-8 mr-2" src={restorent} alt="logo" />
                    AFFECTIONARY
                </a>
                <div className="w-full bg-white rounded-lg shadow darkdicarted:border md:mt-0 sm:max-w-md xl:p-0 darkdicarted:bg-gray-800 darkdicarted:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl darkdicarted:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={loginAction}>
                            <div>
                                <label htmlFor="adminID" className="block mb-2 text-sm font-medium text-gray-900 darkdicarted:text-white">Admin Id</label>
                                <input type="text" id="adminID" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkdicarted:bg-gray-700 darkdicarted:border-gray-600 darkdicarted:placeholder-gray-400 darkdicarted:text-white darkdicarted:focus:ring-blue-500 darkdicarted:focus:border-blue-500" placeholder="admin" required value={adminId} onChange={(e) => setAdminId(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 darkdicarted:text-white">Password</label>
                                <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darkdicarted:bg-gray-700 darkdicarted:border-gray-600 darkdicarted:placeholder-gray-400 darkdicarted:text-white darkdicarted:focus:ring-blue-500 darkdicarted:focus:border-blue-500" required value={adminPass} onChange={(e) => setAdminPass(e.target.value)} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 darkdicarted:bg-gray-700 darkdicarted:border-gray-600 darkdicarted:focus:ring-primary-600 darkdicarted:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 darkdicarted:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline darkdicarted:text-primary-500">Forgot password?</a>
                            </div><br />
                            <button className="w-full text-blue-500 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center darkdicarted:bg-primary-600 darkdicarted:hover:bg-primary-700 darkdicarted:focus:ring-primary-800 border-blue-200 border">Sign in</button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}