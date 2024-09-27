export default async function placeOrder(data) {
    try {
        const resp = await fetch(import.meta.env.VITE_APP_URL + '/api/orders/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (resp.ok) {
            const j = await resp.json();
            return j.orderId;
        } else {
            const errorResponse = await resp.json();
            console.log(errorResponse);
            throw new Error('Failed to place order');
        }

    } catch (err) {
        console.log('Error placing order : ',err);
        throw err;
    }
};