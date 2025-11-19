import SideNavbar from "../adminComponents/SideNavbar";

export default function AdminDashboard() {
  return (
    <div>
      <div>
        <section className="sticky top-0 h-fit">
          <SideNavbar></SideNavbar>
        </section>
        <section></section>
      </div>
    </div>

  );
}
