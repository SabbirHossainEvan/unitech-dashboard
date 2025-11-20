import { Navigate, Outlet } from "react-router";
import SideNavbar from "../adminComponents/SideNavbar";
import TopNavbar from "../adminComponents/TopNavbar";

export default function AdminDashboard() {
  return (
    <div>
      <div className="grid grid-cols-12">
        <section className="sticky top-0 h-fit col-span-1 md:col-span-2">
          <SideNavbar></SideNavbar>
        </section>
        <section className="col-span-11 md:col-span-10">
          {/* top navbar */}
          <section className="sticky top-0 h-fit">
            <TopNavbar></TopNavbar>
          </section>
          <section>
            <Outlet>
            </Outlet>
          </section>
        </section>
      </div>
    </div>

  );
}
