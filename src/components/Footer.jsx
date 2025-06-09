import { Icon } from "@iconify/react/dist/iconify.js";

function Footer () {
    return (
      <div>
    <footer>
    <div className="bg-black">
    <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div>
      <img src="/Logo-Retup-white.png" className="w-25 h-20" />
      <p className="mt-4 max-w-xs text-gray-500">
       Berlangganan untuk mendapatkan info barang terbaru
      </p>
        <input
        type="text"
        placeholder="Email mu untuk berlangganan"
        className="w-full border rounded px-3 py-2 ring-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />


      <ul className="mt-8 flex gap-6">
        {/* ...social icons... */}
        <Icon icon="mdi:instagram" width={32} height={32} className="bg-color-white"></Icon>
      </ul>
      </div>

      <div className="grid grid-cols-2 gap-20 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
      <div>
        <p className="font-medium text-white">Produk</p>
        <ul className="mt-6 space-y-4 text-sm">
        <li>
          <a href="#" className="text-white transition hover:opacity-75"> Mouse </a>
        </li>
        <li>
          <a href="#" className="text-white transition hover:opacity-75"> Keyboard </a>
        </li>
        <li>
          <a href="#" className="text-white transition hover:opacity-75"> Deskmat </a>
        </li>
        <li>
          <a href="#" className="text-white transition hover:opacity-75"> Monitor </a>
        </li>
        <li>
          <a href="#" className="text-white transition hover:opacity-75"> Other </a>
        </li>
        </ul>
      </div>

      <div>
        <p className="font-medium text-white">Help</p>
        <ul className="mt-6 space-y-4 text-sm">
        <li>
          <a href="#" className="text-white transition hover:opacity-75"> Contact </a>
        </li>
        <li>
          <a href="#" className="text-white transition hover:opacity-75"> FAQs </a>
        </li>
        <li>
          <a href="#" className="text-white transition hover:opacity-75"> Live Chat </a>
        </li>
        </ul>
      </div>

      {/* Make this column long, not dropdown style */}
      <div className="lg:col-span-2">
        <p className="font-medium text-white">Alamat</p>
        <p className="mt-6 text-sm text-white max-w-lg">
        Ruko Mangga 2 Mall No.45A Ruko Mangga Dua mall, Deretan Bank Panin, RT.1/RW.12, South Mangga Dua, Sawah Besar, Central Jakarta City, Jakarta 10730, Indonesia.
        </p>
      </div>
      </div>
    </div>

    <div className="flex justify-between ">
    <p className="text-xs text-gray-500">&copy; 2022. Company Name. All rights reserved.</p>
    <p className="text-xs text-white">Metode Pembayaran</p>
    </div>
    <img src="./Logo-Retup-white.png" className="w-4 h-4 items-end flex"/>
    </div>
    </div>
  </footer>
      </div>
    );
}

export default Footer