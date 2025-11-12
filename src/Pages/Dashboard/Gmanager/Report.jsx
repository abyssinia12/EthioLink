import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Report.module.css";
import {
  Car,
  BedDouble,
  Map,
  AtSign,
  Calendar,
  UsersRound,
  MapPin,
  Phone,
} from "lucide-react";

export default function Report() {
  const [reports, setReports] = useState({
    carBookings: [],
    tourBookings: [],
    roomBookings: [],
    specialRequests: [],
    summary: {},
  });
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  useEffect(() => {
    fetchReportData();
  }, [selectedPeriod]);

  const fetchReportData = async () => {
    try {
      setLoading(true);

      // Fetch all bookings data (same as AllBookings page)
      const bookingsResponse = await axios.get(
        "http://localhost:5000/api/bookings/all"
      );

      // Fetch special interest requests (same as OfficerSpecialInterestList page)
      const specialRequestsResponse = await axios.get(
        "http://localhost:5000/api/special-interest"
      );

      setReports({
        carBookings: bookingsResponse.data.carBookings || [],
        tourBookings: bookingsResponse.data.tourBookings || [],
        roomBookings: bookingsResponse.data.roomBookings || [],
        specialRequests: specialRequestsResponse.data || [],
        summary: calculateSummary(
          bookingsResponse.data.carBookings || [],
          bookingsResponse.data.tourBookings || [],
          bookingsResponse.data.roomBookings || [],
          specialRequestsResponse.data || []
        ),
      });
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSummary = (
    carBookings,
    tourBookings,
    roomBookings,
    specialRequests
  ) => {
    const totalBookings =
      carBookings.length + tourBookings.length + roomBookings.length;
    const totalSpecialRequests = specialRequests.length;

    const completedBookings = [
      ...carBookings,
      ...tourBookings,
      ...roomBookings,
    ].filter((booking) => booking.status === "confirmed").length;
    const pendingBookings = [
      ...carBookings,
      ...tourBookings,
      ...roomBookings,
    ].filter((booking) => booking.status === "pending").length;
    const cancelledBookings = [
      ...carBookings,
      ...tourBookings,
      ...roomBookings,
    ].filter((booking) => booking.status === "cancelled").length;

    return {
      totalBookings,
      totalSpecialRequests,
      completedBookings,
      pendingBookings,
      cancelledBookings,
      carBookings: carBookings.length,
      tourBookings: tourBookings.length,
      roomBookings: roomBookings.length,
    };
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "badge-pending";
      case "confirmed":
        return "badge-confirmed";
      case "cancelled":
        return "badge-cancelled";
      default:
        return "badge-default";
    }
  };

  const getInitials = (fullName) => {
    if (!fullName) return "";
    const names = fullName.split(" ");
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <div className={classes.loadingSpinner}></div>
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div className={classes.reportContainer}>
      <div className={classes.reportHeader}>
        <h1>Tour Officer Performance Report</h1>
        <div className={classes.filters}>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className={classes.filterSelect}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className={classes.summaryCards}>
        <div className={classes.summaryCard}>
          <h3>Total Bookings</h3>
          <p className={classes.summaryNumber}>
            {reports.summary.totalBookings}
          </p>
        </div>

        <div className={classes.summaryCard}>
          <h3>Special Requests</h3>
          <p className={classes.summaryNumber}>
            {reports.summary.totalSpecialRequests}
          </p>
        </div>

        <div className={classes.summaryCard}>
          <h3>Completed</h3>
          <p className={classes.summaryNumber}>
            {reports.summary.completedBookings}
          </p>
        </div>

        <div className={classes.summaryCard}>
          <h3>Pending</h3>
          <p className={classes.summaryNumber}>
            {reports.summary.pendingBookings}
          </p>
        </div>
      </div>

      {/* Car Bookings Report */}
      <div className={classes.reportSection}>
        <h2 className={classes.booking_section_title}>
          <Car color="#F7921F" size={30} /> Car Bookings{" "}
          <span className={classes.section_count}>
            ({reports.summary.carBookings})
          </span>
        </h2>
        <div className={classes.booking_cards_grid}>
          {reports.carBookings.length > 0 ? (
            reports.carBookings.map((b) => (
              <div key={b.id} className={classes.booking_card}>
                <div>
                  <div className={classes.booking_card_header}>
                    <h3 className={classes.booking_item_title}>
                      {b.car_model || "N/A"}
                    </h3>
                    <span
                      className={`${classes.status_badge} ${
                        classes[getStatusBadgeClass(b.status)]
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <p className={classes.booking_detail}>
                    {b.first_name} {b.last_name}
                  </p>
                  <p className={classes.booking_detail}>{b.user_email}</p>
                </div>
              </div>
            ))
          ) : (
            <p className={classes.no_bookings_message}>
              No car bookings found.
            </p>
          )}
        </div>
      </div>

      {/* Tour Bookings Report */}
      <div className={classes.reportSection}>
        <h2 className={classes.booking_section_title}>
          <Map color="#F7921F" size={30} /> Tour Bookings{" "}
          <span className={classes.section_count}>
            ({reports.summary.tourBookings})
          </span>
        </h2>
        <div className={classes.booking_cards_grid}>
          {reports.tourBookings.length > 0 ? (
            reports.tourBookings.map((b) => (
              <div key={b.id} className={classes.booking_card}>
                <div>
                  <div className={classes.booking_card_header}>
                    <h3 className={classes.booking_item_title}>
                      {b.tour_name || "N/A"}
                    </h3>
                    <span
                      className={`${classes.status_badge} ${
                        classes[getStatusBadgeClass(b.status)]
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <p className={classes.booking_detail}>
                    {b.first_name} {b.last_name}
                  </p>
                  <p className={classes.booking_detail}>{b.email}</p>
                </div>
              </div>
            ))
          ) : (
            <p className={classes.no_bookings_message}>
              No tour bookings found.
            </p>
          )}
        </div>
      </div>

      {/* Room Bookings Report */}
      <div className={classes.reportSection}>
        <h2 className={classes.booking_section_title}>
          <BedDouble color="#F7921F" size={30} /> Room Bookings{" "}
          <span className={classes.section_count}>
            ({reports.summary.roomBookings})
          </span>
        </h2>
        <div className={classes.booking_cards_grid}>
          {reports.roomBookings.length > 0 ? (
            reports.roomBookings.map((b) => (
              <div key={b.id} className={classes.booking_card}>
                <div>
                  <div className={classes.booking_card_header}>
                    <h3 className={classes.booking_item_title}>
                      {b.room_type || "N/A"}
                    </h3>
                    <span
                      className={`${classes.status_badge} ${
                        classes[getStatusBadgeClass(b.status)]
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <p className={classes.booking_detail}>{b.full_name}</p>
                  <p className={classes.booking_detail}>{b.email}</p>
                  <p className={classes.booking_detail}>
                    {new Date(b.check_in_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}{" "}
                    to{" "}
                    {new Date(b.check_out_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className={classes.no_bookings_message}>
              No room bookings found.
            </p>
          )}
        </div>
      </div>

      {/* Special Requests Report */}
      <div className={classes.reportSection}>
        <h2 className={classes.booking_section_title}>
          Special Interest Requests{" "}
          <span className={classes.section_count}>
            ({reports.summary.totalSpecialRequests})
          </span>
        </h2>
        <div className={classes.requestsGrid}>
          {reports.specialRequests.length > 0 ? (
            reports.specialRequests.map((req) => (
              <div key={req.id} className={classes.requestCard}>
                <div className={classes.cardHeader}>
                  <div className={classes.initialsCircle}>
                    {getInitials(req.full_name)}
                  </div>
                  <span className={classes.fullName}>{req.full_name}</span>
                </div>
                <div className={classes.cardBody}>
                  <div className={classes.infoItem}>
                    <AtSign size={18} color="#F7921F" />
                    <span className={classes.spp}>{req.email}</span>
                  </div>
                  <div className={classes.infoItem}>
                    <Phone size={18} color="#F7921F" />
                    <span className={classes.spp}>{req.phone_number}</span>
                  </div>
                  <div className={classes.infoItem}>
                    <MapPin size={18} color="#F7921F" />
                    <span className={classes.spp}>{req.country}</span>
                  </div>
                  <div className={classes.infoItem}>
                    <UsersRound size={18} color="#F7921F" />
                    <span className={classes.spp}>
                      {req.group_size}{" "}
                      {req.group_size === 1 ? "person" : "people"}
                    </span>
                  </div>
                  <div className={classes.infoItem}>
                    <Calendar size={18} color="#F7921F" />
                    <span className={classes.spp}>
                      {req.start_date} to {req.end_date}
                    </span>
                  </div>
                </div>
                <div className={classes.specialRequest}>
                  <p className={classes.specialRequestTitle}>
                    Special Request:
                  </p>
                  <p>{req.request}</p>
                </div>
              </div>
            ))
          ) : (
            <p className={classes.no_bookings_message}>
              No special interest requests found.
            </p>
          )}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className={classes.reportSection}>
        <h2>Performance Metrics</h2>
        <div className={classes.metricsGrid}>
          <div className={classes.metricCard}>
            <h4>Completion Rate</h4>
            <p className={classes.metricValue}>
              {reports.summary.totalBookings > 0
                ? Math.round(
                    (reports.summary.completedBookings /
                      reports.summary.totalBookings) *
                      100
                  )
                : 0}
              %
            </p>
          </div>

          <div className={classes.metricCard}>
            <h4>Cancellation Rate</h4>
            <p className={classes.metricValue}>
              {reports.summary.totalBookings > 0
                ? Math.round(
                    (reports.summary.cancelledBookings /
                      reports.summary.totalBookings) *
                      100
                  )
                : 0}
              %
            </p>
          </div>

          <div className={classes.metricCard}>
            <h4>Special Request Rate</h4>
            <p className={classes.metricValue}>
              {reports.summary.totalBookings > 0
                ? Math.round(
                    (reports.summary.totalSpecialRequests /
                      reports.summary.totalBookings) *
                      100
                  )
                : 0}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
