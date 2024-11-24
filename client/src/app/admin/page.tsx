import BarangTable from "@/components/admin/LostProductTable";
import { Search } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <div className="flex flex-row mb-4 justify-between">
        <h1 className="text-2xl font-semibold mb-4">Semua Barang Hilang</h1>
        <div className="hidden md:block flex-1 max-w-2xl mx-8">
          <div className="relative">
            <form
              //onSubmit={handleSearch}
              className="hidden md:block flex-1 max-w-2xl mx-8"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-darkBlue1" />
                </div>
                <input
                  type="text"
                  //value={searchQuery}
                  //onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari barangmu..."
                  className="block w-full pl-10 pr-3 py-2 border border-darkBlue1 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-darkBlue1 focus:border-transparent text-darkBlue1 placeholder:text-darkBlue1"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <BarangTable />
    </div>
  );
}
