import { React, useState } from "react";
import AddTourPackageForm from "../TourPackage/AddTourPackageForm";
import EditTourPackage from "./EditTourPackage";
import TourPackageList from "./TourPackageList";
import TourBookingList from "./TourBookingList";
import classes from "./Manage.module.css";

function ManageTourPackage() {
  const [selectedTourId, setSelectedTourId] = useState(null);
  const [view, setView] = useState("list"); // list | add | edit | bookings


  const handleEdit = (id) => {
    setSelectedTourId(id);
    setView("edit");
  };

  const handleViewBookings = (id) => {
    setSelectedTourId(id);
    setView("bookings");
  };

  const handleAddNew = () => {
    setSelectedTourId(null);
    setView("add");
  };

  const handleBackToList = () => {
    setSelectedTourId(null);
    setView("list");
  };
  return (
    <div>
      {view === "list" && (
        <div>
          <button className={classes.addBtn} onClick={handleAddNew}>
            + Add New Tour Package
          </button>
          <TourPackageList
            onEdit={handleEdit}
            onViewBookings={handleViewBookings}
          />
        </div>
      )}

      {view === "add" && (
        <div>
          <button className={classes.Backbtn} onClick={handleBackToList}>
            ⬅ Back
          </button>
          <AddTourPackageForm onDone={handleBackToList} />
        </div>
      )}

      {view === "edit" && selectedTourId && (
        <div>
          <button className={classes.Backbtn} onClick={handleBackToList}>
            ⬅ Back
          </button>
          <EditTourPackage tourId={selectedTourId} onDone={handleBackToList} />
        </div>
      )}

      {view === "bookings" && selectedTourId && (
        <div>
          <button className={classes.Backbtn} onClick={handleBackToList}>
            ⬅ Back
          </button>
          <TourBookingList tourId={selectedTourId} />
        </div>
      )}
    </div>
  );
  
}

export default ManageTourPackage
