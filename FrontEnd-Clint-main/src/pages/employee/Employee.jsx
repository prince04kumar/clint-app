import attendanceImage from '../../assets/attendance.jpg'

export default function Employee(){
    return (
        <section className="h-screen w-full p-24">
            <div className="bg-yellow-200 py-6 px-8">
                <h1 className="text-2xl text-secondary">Employee Attendance</h1>
            </div>
            <form className="mx-auto border flex justify-center gap-x-8">
                <div className='border-r py-8 pr-12'>
                <div className="mb-4 w-full">
                    <label htmlFor="id">Employee ID</label>
                    <input className="block border p-2 focus:outline-none focus:border-black rounded-md" type="text" name="id" id="id" />
                </div>
                <div className="mb-4">
                    <label htmlFor="name">Employee Name</label>
                    <input className="block border p-2 focus:outline-none focus:border-black rounded-md" type="text" name="name" id="name" />
                </div>
                <button className="p-4 bg-blue-800 rounded-md text-white">Submit</button>
                </div>
                <img src={attendanceImage} className='w-1/2' alt="Attendance Image" />
            </form>
        </section>
    );
}