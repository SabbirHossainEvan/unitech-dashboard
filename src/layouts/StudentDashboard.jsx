import { Outlet } from "react-router";
import TopNavbar from "../adminComponents/TopNavbar";
import StudentSideNavbar from "../studentComponent/StudentSideNavbar";

export default function StudentDashboard() {
  return (
    <div className="flex">
              {/* side navbar */}
      <section className="sticky top-0 h-fit">
        <StudentSideNavbar></StudentSideNavbar>
      </section>
      {/* top navbar & main content */}
      <section className="w-full mx-auto">
        {/* top navbar */}
        <section className="sticky top-0 h-fit">
          <TopNavbar></TopNavbar>
        </section>
        {/* main content */}
        <section>
          <Outlet></Outlet>
        </section>
      </section>
    </div>
  );
}
