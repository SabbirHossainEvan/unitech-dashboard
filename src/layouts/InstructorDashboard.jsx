import { Outlet } from "react-router";
import TopNavbar from "../adminComponents/TopNavbar";
import InstructorSideNavbar from "../instructorComponent/InstructorSideNavBar";

export default function InstructorDashboard() {
  return (
    <div className="flex">
              {/* side navbar */}
      <section className="sticky top-0 h-fit">
        <InstructorSideNavbar></InstructorSideNavbar>
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
