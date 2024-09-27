import showToastMessage from '../utils/toast_message'
import { useEffect, useState } from 'react';
import restorent from '../assets/logoRestorent.svg'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import employeeLogin from '../utils/employee_login';

export default function EmployeeLogin() {
    const [id, setId] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const body = { "id": id, "password": pass };
        try {
            const resp = await employeeLogin(body);
            if (resp === true) {
                showToastMessage('success', 'Logged in successfully');
                localStorage.setItem('credentials', JSON.stringify(body));
                navigate('/home');
            } else {
                showToastMessage('error', 'Invalid credentials');
            }
        } catch (error) {
            showToastMessage('error', 'Something went wrong');
        }
    }

    const checkForUser = async () => {
        try {
            let cred = localStorage.getItem('credentials') ?? null;
            if (cred) {
                const resp = await employeeLogin(JSON.parse(cred));
                if (resp) {
                    navigate('/home');
                } else {
                    localStorage.removeItem('credentials');
                }
            }
        } catch (error) {
            showToastMessage('error', 'Something went wrong');
        }

    }

    useEffect(() => {
        checkForUser();
    }, [])

    return (
        <section className="bg-gray-100 h-[100vh] flex align-middle">
            <ToastContainer className='w-4/5 mx-auto mt-16' />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-8 h-8 mr-2" src={restorent} alt="logo" />
                    AFFECTIONARY
                </a>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to continue
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={onFormSubmit}>
                            <div>
                                <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900">Employee Id</label>
                                <input type="text" id="id" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="employee" required value={id} onChange={(e) => setId(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required value={pass} onChange={(e) => setPass(e.target.value)} autoComplete='on' />
                            </div>
                            <div className="flex items-center justify-end">
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                            </div><br />
                            <button className="w-full text-blue-500 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border-blue-200 border" type='submit'>Sign in</button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}