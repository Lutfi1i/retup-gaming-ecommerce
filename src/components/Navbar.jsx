import { Icon } from "@iconify/react/dist/iconify.js";

function Navbar() {
  return (
    <div className="w-full font-helvetica-light">
      <div className="bg-black text-white items-center flex justify-between text-center text-sm py-5">
        Nando Demo
      </div>

      <div className="flex items-center justify-between gap-6 px-6 py-4 bg-white">
        <div className="flex gap-4">
          <div>Home</div>
          <div>Products</div>
          <div>Warranty</div>
          <div>FAQ</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
            <Icon icon="mdi:magnified" />
            <input 
                type="text"
                className="w-45 border rounded-full py-1 px-2 pl-4 text-sm transition-colors"
                placeholder="Cari disini"
            />
        </div>

        <div className="relative">
            <Icon icon="material-symbols-light:shopping-bag-outline" width={24} height={30}></Icon>
        </div>

        <div className="relative">
            <Icon icon="weui:like-outlined" width="24" height="30" />
        </div>

        <div className="relative hover:font-ag-futura transition-normal pl-3 pointer">Login</div>
      </div>
    </div>
  );
}

export default Navbar;
