import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default async function admin_logined() {
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${import.meta.env.VITE_APP_URL}/api/admin/auth`, {
            method: 'POST',
            headers: {
                'id': localStorage.getItem("adminId"),
                'pass': localStorage.getItem("adminPass"),
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Authentication failed');
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.log('Error:', error);
            navigate('/admin/login');
        });
    }, [])
}