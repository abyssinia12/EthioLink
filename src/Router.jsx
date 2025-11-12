import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import CarBookingForm from "./Pages/Dashboard/TourOfficer/Car/CarBookingForm";
import FlightBooking from "./Pages/Flights/FlightBooking";
// import CarRentalForm from './Pages/CarRental/CarRentalForm';

import CarRentalForm from "./Pages/Dashboard/RequestSection/CarRequestSection/CarRentalForm";

// import AdminDashboard from "./Pages/Dashboareds/AdminDashboard";
// import Auth from "./Pages/Auth/Auth";
// import SideLayOut from "./Components/LayOut/SideLayOut";
// import CustomerCarList from "./Pages/CarRental/CustomerSide/CustomerCarList";
// import CarDetails from "./Pages/Dashboard/TourOfficer/Car/CarDetails";

// new
// import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard'
import AdminDashboard from "./Pages/Dashboard/AdminDashboard/AdminDashboard";
import TourOfficerDashboard from "./Pages/Dashboard/TourOfficer/TourOfficerDashboard";
// import CreateOfficer from "./Pages/Dashboard/AdminDashboard/CreateOfficer";
import ManageCarPage from "./Pages/Dashboard/TourOfficer/Car/ManageCarPage";
import CarRentalsTable from "./Pages/Dashboard/TourOfficer/Car/CarRentalsTable";
import HotelList from "./Pages/Hotels/HotelList";
import HotelDetails from "./Pages/Hotels/HotelDetails";
import RoomDetail from "./Pages/Hotels/RoomDetail";
import PaymentSuccess from "./Pages/Payment/PaymentSuccess";
import PaymentFailure from "./Pages/Payment/PaymentFailure";
import RoomManagement from "./Components/Hotel/RoomManagement";
import HotelDetailOfficer from "./Components/Hotel/HotelDetailsOfficer";
import HotelListOfficer from "./Components/Hotel/HotelListOfficer";
// import TourOfficerRoute from "./OfficerRoute/TourOfficerRoute";
import DashboardLayout from "./Pages/Dashboard/TourOfficer/DashboardLayout";
import TicketOfficerDashboard from "./Pages/Dashboard/TicketOfficer/TicketOfficerDashboard";
import Gmanager from "./Pages/Gmanager/Gmanager";
import LoginPage from "./Components/LogIn/Login";
import CustomerDashboard from "./Pages/Dashboard/CustomerDashboard/CustomerDashboard";
import Register from "./Components/SignUp/Register";
import CarResults from "./Components/CarCustomer/CarResults";
import CarSearchForm from "./Components/CarCustomer/CarSearchForm";
import Bookings from "./Pages/Dashboard/TourOfficer/Car/Bookings";
import Logout from "./Components/Logout/Logout";
import DashboardLayoutTicket from "./Pages/Dashboard/TicketOfficer/DashboardLayoutTicket";
import DashboardLayoutGmanager from "./Pages/Dashboard/Gmanager/DashboardLayoutGmanager";
import GmanagerDashboard from "./Pages/Dashboard/Gmanager/GmanagerDashboard";
import Report from "./Pages/Dashboard/Gmanager/Report";
import AdminLayout from "./Pages/Dashboard/AdminDashboard/AdminLayout";
import AddNewuser from "./Pages/Dashboard/AdminDashboard/AddNewuser";
import BackUpManagement from "./Pages/Dashboard/AdminDashboard/BackUpManagement";
import AllUserlist from "./Pages/Dashboard/AdminDashboard/AllUserlist";
import SystemLog from "./Pages/Dashboard/AdminDashboard/SystemLog";
import TourHome from "./Pages/Tours/TourHome";
import TourDetail from "./Pages/Tours/TourDetail";
import BookingForm from "./Pages/Tours/BookingForm";
import Home from "./Pages/Home/Home";
import CustomerLayout from "./Pages/Dashboard/CustomerDashboard/CustomerLayout";
// import MyBooking from "./Components/CustomerComponent/MyBooking";
import PaymentHistory from "./Components/CustomerComponent/PaymentHistory";
import BookService from "./Components/CustomerComponent/BookService";
import TourCategory from "./Pages/Tours/TourCategory";
import SpecialInterestForm from "./Pages/Tours/SpecialInterestForm";
import OfficerSpecialInterestList from "./Pages/Dashboard/TourOfficer/TourPackage/OfficerSpecialInterestList";
import ManageTourPackage from "./Pages/Dashboard/TourOfficer/TourPackage/ManageTourPackage";
import EditTourPackage from "./Pages/Dashboard/TourOfficer/TourPackage/EditTourPackage";
import TourBookingList from "./Pages/Dashboard/TourOfficer/TourPackage/TourBookingList";
import Footer from "./Components/Footer/Footer";
import AboutUs from "./Components/Footer/AboutUs";
import ContactUs from "./Components/Footer/ContactUs";
import AllBookings from "./Pages/AllBookings/AllBookings";
import CarDetailPage from "./Components/CarCustomer/CarDetailPage";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import MyBooking from "./Pages/Dashboard/CustomerDashboard/MyBooking";
import { UserProvider } from "./context/UserContext";
// import Reciption from "./Pages/Receiption/Reciption";
import ReceptionDashboard from "./Pages/Receiption/ReceptionDashboard";
import ForgotPassword from "./Components/LogIn/ForgotPassword";
// import ForgotPassword from "../Components/LogIn/ForgotPassword";

// import PaymentSuccess from './Pages/PaymentSuccess/PaymentSuccess'

export default function Routering() {
  const [filters, setFilters] = useState({});
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          {/* <Route path="/CustomerCarList" element={<CustomerCarList />} /> */}
          {/* <Route path="/cardetail/:id" element={<CarDetails />} /> */}
          {/* <Route path="/car" element={<SideLayOut />} /> */}
          <Route path="/FlightBooking" element={<FlightBooking />} />
          {/* <Route path="/Auth" element={<Auth />} /> */}
          {/* tour officer route car  */}
          {/* <Route path="/tourOfficer" element={<TourOfficerRoute />} /> */}
          {/* car management  */}
          <Route path="/CarBookingForm" element={<CarBookingForm />} />
          <Route path="/CarRentalsTable" element={<CarRentalsTable />} />
          <Route path="/ManageCarPage" element={<ManageCarPage />} />
          {/* <Route path="/officer/bookings" element={<Bookings />} /> */}
          {/* car mangement customer side  */}
          <Route
            path="/carRental"
            element={
              <div>
                {/* <CarSearchForm onSearch={setFilters} /> */}
                <CarSearchForm setFilters={setFilters} />
                <CarResults filters={filters} />
              </div>
            }
          />
          <Route path="/carRental/:id" element={<CarDetailPage />} />
          {/* Gmanager report path */}
          <Route path="/Report" element={<Report />} />
          {/* tour officer route hotel  */}
          <Route path="/HotelList" element={<HotelList />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          {/* room detail  */}
          <Route path="/roomDetail/:id" element={<RoomDetail />} />
          {/* <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="my-Booking" element={<MyBooking />} />
          <Route path="book-Service" element={<BookService />} />
          <Route path="payment-History" element={<PaymentHistory />} />
        </Route> */}
          {/* <Route path="/HotelList" element={<HotelList />} />
        <Route path="/hotels/:id" element={<HotelDetails />} /> */}
          {/* <Route path="/CreateOfficer" element={<CreateOfficer />} /> */}
          {/* payment route  */}
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />
          {/* officer side hotel */}
          <Route path="/officer/hotelList" element={<HotelListOfficer />} />
          <Route path="/officer/hotels/:id" element={<HotelDetailOfficer />} />
          <Route path="/hotels/:id/manage" element={<RoomManagement />} />
          {/* <Route path="/hotelListOfficer" element={<HotelListOfficer />} />
        <Route path="/hotels/:id" element={<HotelDetailOfficer />} />
        <Route path="/hotels/:id/manage" element={<RoomManagement />} /> */}
          {/* admin redirect with role  */}
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          {/* <Route path="/tour" element={<TourOfficerDashboard />} /> */}
          {/* customer dashboard path  */}
          {/* <Route path="/customer" element={
            <UserProvider>
              <CustomerLayout />
            </UserProvider> 
            }>
            <Route index element={<CustomerDashboard />} />
            <Route path="my-Booking" element={<MyBooking />} />
            <Route path="book-Service" element={<BookService />} />
            <Route path="payment-History" element={<PaymentHistory />} />
          </Route> */}
          <Route path="/my-bookings" element={<MyBooking />} />
          {/* sample page for customer  */}
          <Route path="/myBooking" element={<MyBooking />} />
          <Route path="/paymentHistory" element={<PaymentHistory />} />
          <Route path="/bookService" element={<BookService />} />
          {/* tour officer dashboard path  */}
          <Route path="/tour" element={<DashboardLayout />}>
            <Route index element={<TourOfficerDashboard />} />
            <Route path="manage-car" element={<ManageCarPage />} />
            <Route path="manage-hotel" element={<HotelListOfficer />} />
            <Route
              path="specialInterst-list"
              element={<OfficerSpecialInterestList />}
            />
            <Route path="manage-tourPackage" element={<ManageTourPackage />} />
            <Route path="booking-tourpackage" element={<AllBookings />} />
          </Route>
          {/* <Route path="/tourBooking" element={<TourBookings />} /> */}
          <Route path="/tours/:tourId/bookings" element={<TourBookingList />} />
          {/* ticket officer dashboard path  */}
          <Route path="/ticket" element={<DashboardLayoutTicket />}>
            <Route index element={<TicketOfficerDashboard />} />
            <Route path="FlightBooking" element={<FlightBooking />} />
          </Route>
          {/* Gmanager dashboard path  */}
          <Route path="/gm" element={<DashboardLayoutGmanager />}>
            <Route index element={<GmanagerDashboard />} />
            <Route path="Report" element={<Report />} />
          </Route>
          {/* Admin path  */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="all-user" element={<AllUserlist />} />
            <Route path="add-NewUsers" element={<AddNewuser />} />
            <Route path="system-logs" element={<SystemLog />} />
            <Route path="backUp-management" element={<BackUpManagement />} />
          </Route>
          <Route path="/reception" element={<ReceptionDashboard />} />

          {/* customer dashboard  */}
          {/* <Route path="/customer" element={<CustomerDashboard />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/Payment-Success" element={<PaymentSuccess />} />
          {/* tour package  */}
          {/* <Route path="/tourPackage" element={<TourHome />} />
        <Route path="/tours/:category" element={<TourCategory />} />
        <Route path="/tours/:id" element={<TourDetail />} />
        <Route path="/book/:id" element={<BookingForm />} /> */}
          <Route path="/tours" element={<TourHome />} />
          <Route path="/tours/category/:category" element={<TourCategory />} />
          <Route path="/tours/:id" element={<TourDetail />} />
          <Route path="/tours/book/:id" element={<BookingForm />} />
          <Route path="/specialInterst" element={<SpecialInterestForm />} />
          <Route path="/edit-tour/:tourId" element={<EditTourPackage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
