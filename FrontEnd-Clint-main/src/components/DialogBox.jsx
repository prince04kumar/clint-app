export default function DialogBox(props){

    // title -- > String
    // action -- > String
    // content --> String 
    // type (delete , success , null) --> String 
    // onCancel --> function 
    // onAction --> function 

    return (
        <section className="absolute inset-0 h-screen w-screen flex justify-center items-center">
        <div className="absolute inset-0 bg-black opacity-60 h-full w-full" />
        <div className="bg-white z-10 text-secondary p-6 rounded shadow-xl w-3/4 md:w-1/2">
            <h1 className="font-bold">{props.title}</h1>
            <p>{props.content}</p>
            <div className="my-2">
                <button className={`${props.type == 'delete'  ? 'bg-red-600' : props.type == 'success' ? 'bg-green-600' : 'bg-blue-600'} p-2 rounded-md text-white font-semibold mr-2`} onClick={props.onAction} >{props.action}</button>
                <button className="bg-white border-secodary border-2 p-2 rounded-md " onClick={props.onCancel} >Cancel</button>
            </div>
        </div>
    </section>
    );
}