import { useContext } from "react";
import { orderContext } from "../pages/Home";

export default function UserInfo() {
  const { user } = useContext(orderContext);
  const [setUserInfo, userInfo, errors, onInfoSubmit] = user;
  return (
    <form className="bg-gray-100 w-3/4 mx-auto p-12 mt-4" onSubmit={onInfoSubmit}>
      <div className="mb-2">
        <label htmlFor="name">Customer name</label>
        <input
          className={`w-full block border p-2 mt-1 outline-none focus:border-secondary rounded-sm transition-all ${errors.name ? 'border-red-500' : ''}`}
          type="text"
          name="name"
          id="name"
          placeholder="Enter Your Name"
          onChange={(e) => setUserInfo((prev) => ({ ...prev, name: e.target.value }))}
          value={userInfo.name}
        />
        {errors.name && <span className="text-red-500">{errors.name}</span>}
      </div>

      <div className="mb-2">
        <label htmlFor="number">Phone Number</label>
        <input
          className={`w-full block border p-2 mt-1 outline-none focus:border-secondary rounded-sm transition-all ${errors.number ? 'border-red-500' : ''}`}
          type="text"
          name="number"
          id="number"
          placeholder="+91 XXXXXXXXXX"
          onChange={(e) => setUserInfo((prev) => ({ ...prev, number: e.target.value }))}
          value={userInfo.number}
        />
        {errors.number && <span className="text-red-500">{errors.number}</span>}
      </div>

      <div className="mb-2">
        <label htmlFor="table">Table Number</label>
        <input
          className={`w-full block border p-2 mt-1 outline-none focus:border-secondary rounded-sm transition-all ${errors.table ? 'border-red-500' : ''}`}
          type="text"
          name="table"
          id="table"
          placeholder="Enter Table Number"
          onChange={(e) => setUserInfo((prev) => ({ ...prev, table: e.target.value }))}
          value={userInfo.table}
        />
        {errors.table && <span className="text-red-500">{errors.table}</span>}
      </div>

      <div className="mb-2">
        <button className="p-2 bg-blue-500 hover:bg-blue-700 w-full text-white" type="submit">Continue</button>
      </div>
    </form>
  );
}