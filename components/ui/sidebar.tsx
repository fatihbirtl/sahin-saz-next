import { SidebarRoutes } from "./sidebar-routes"

export const SideBar = () => {
  return (
    <div className="h-full border-l flex flex-col overflow-y-auto bg-white shadow-sm ">
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}
