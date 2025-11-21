import { Navigate, Outlet } from "react-router";
import SideNavbar from "../adminComponents/SideNavbar";
import TopNavbar from "../adminComponents/TopNavbar";

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex">
        <section className="sticky top-0 h-fit">
          <SideNavbar></SideNavbar>
        </section>
        <section className="w-full mx-auto">
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
