export default async function employeeLogin(data) {
    try {
        const resp = await fetch(import.meta.env.VITE_APP_URL + '/api/employe/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (resp.ok) {
           return true;
        }
        
        return false;

    } catch (err) {
        throw err;
    }
};