export default async function getAlldishes (){
    try{
        const resp = await fetch(import.meta.env.VITE_APP_URL+'/api/dishes/getall');
        const data  = await resp.json();
        return data;
    }catch(err){
        throw err;
    }
};