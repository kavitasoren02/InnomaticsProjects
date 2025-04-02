import Sidebar from "../ui/Sidemenu";

const AdminLayout = ({children}) => {
    return (
        <div className="flex h-screen">
            <div>
                <Sidebar />
            </div>
            <div className="w-full bg-blue-100 overflow-x-hidden overflow-y-auto">
                {children}
            </div>
        </div>

    )
}
export default AdminLayout;