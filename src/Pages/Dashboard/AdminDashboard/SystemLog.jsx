import React, { useState, useEffect } from "react";
import { supabase } from "../../CarRental/CustomerSide/supabaseClient";
import classes from "./Admin.module.css";
import {
  Search,
  Filter,
  Download,
  Eye,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function SystemLog() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedModule, setSelectedModule] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(20);

  // Sample log levels and modules for filtering
  const logLevels = ["all", "error", "warning", "info", "success"];
  const modules = ["all", "auth", "booking", "payment", "user", "system"];

  useEffect(() => {
    fetchSystemLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [logs, searchTerm, selectedLevel, selectedModule]);

  const fetchSystemLogs = async () => {
    try {
      setLoading(true);

      // Fetch logs from Supabase - adjust table name as needed
      const { data, error } = await supabase
        .from("system_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) {
        console.error("Error fetching logs:", error);
        // If table doesn't exist, use sample data
        setLogs(generateSampleLogs());
      } else {
        setLogs(data || generateSampleLogs());
      }
    } catch (error) {
      console.error("Error:", error);
      setLogs(generateSampleLogs());
    } finally {
      setLoading(false);
    }
  };

  const generateSampleLogs = () => {
    const sampleLogs = [
      {
        id: 1,
        level: "info",
        module: "auth",
        message: "User login successful",
        details: "User ID: 123 logged in from IP: 192.168.1.1",
        user_id: "user_123",
        ip_address: "192.168.1.1",
        created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      },
      {
        id: 2,
        level: "error",
        module: "booking",
        message: "Booking creation failed",
        details: "Invalid tour ID provided: tour_999",
        user_id: "user_456",
        ip_address: "192.168.1.2",
        created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      },
      {
        id: 3,
        level: "warning",
        module: "payment",
        message: "Payment processing delayed",
        details: "Payment gateway timeout for transaction: tx_789",
        user_id: "user_789",
        ip_address: "192.168.1.3",
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
      {
        id: 4,
        level: "success",
        module: "user",
        message: "New user registered",
        details: "User account created successfully: john.doe@example.com",
        user_id: "user_101",
        ip_address: "192.168.1.4",
        created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      },
      {
        id: 5,
        level: "info",
        module: "system",
        message: "Database backup completed",
        details: "Daily backup completed successfully",
        user_id: "system",
        ip_address: "127.0.0.1",
        created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      },
    ];
    return sampleLogs;
  };

  const filterLogs = () => {
    let filtered = logs.filter((log) => {
      const matchesSearch =
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user_id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLevel =
        selectedLevel === "all" || log.level === selectedLevel;
      const matchesModule =
        selectedModule === "all" || log.module === selectedModule;

      return matchesSearch && matchesLevel && matchesModule;
    });

    setFilteredLogs(filtered);
    setCurrentPage(1);
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case "error":
        return <XCircle className={classes.log_icon_error} />;
      case "warning":
        return <AlertCircle className={classes.log_icon_warning} />;
      case "info":
        return <Info className={classes.log_icon_info} />;
      case "success":
        return <CheckCircle className={classes.log_icon_success} />;
      default:
        return <Info className={classes.log_icon_info} />;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "error":
        return classes.log_level_error;
      case "warning":
        return classes.log_level_warning;
      case "info":
        return classes.log_level_info;
      case "success":
        return classes.log_level_success;
      default:
        return classes.log_level_info;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const exportLogs = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Level,Module,Message,Details,User ID,IP Address,Timestamp\n" +
      filteredLogs
        .map(
          (log) =>
            `${log.level},${log.module},"${log.message}","${log.details}",${log.user_id},${log.ip_address},${log.created_at}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `system_logs_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className={classes.system_log_container}>
        <div className={classes.loading}>Loading system logs...</div>
      </div>
    );
  }

  return (
    <div className={classes.system_log_container}>
      <div className={classes.system_log_header}>
        <h2>System Logs</h2>
        <button className={classes.export_button} onClick={exportLogs}>
          <Download className={classes.icon} />
          Export CSV
        </button>
      </div>

      <div className={classes.log_filters}>
        <div className={classes.search_box}>
          <Search className={classes.search_icon} />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={classes.search_input}
          />
        </div>

        <div className={classes.filter_controls}>
          <div className={classes.filter_group}>
            <label>Level:</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className={classes.filter_select}
            >
              {logLevels.map((level) => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className={classes.filter_group}>
            <label>Module:</label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className={classes.filter_select}
            >
              {modules.map((module) => (
                <option key={module} value={module}>
                  {module.charAt(0).toUpperCase() + module.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={classes.logs_table_container}>
        <table className={classes.logs_table}>
          <thead>
            <tr>
              <th>Level</th>
              <th>Module</th>
              <th>Message</th>
              <th>Details</th>
              <th>User ID</th>
              <th>IP Address</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {currentLogs.map((log) => (
              <tr key={log.id} className={classes.log_row}>
                <td>
                  <div className={classes.log_level_cell}>
                    {getLevelIcon(log.level)}
                    <span
                      className={`${classes.log_level} ${getLevelColor(
                        log.level
                      )}`}
                    >
                      {log.level}
                    </span>
                  </div>
                </td>
                <td className={classes.log_module}>{log.module}</td>
                <td className={classes.log_message}>{log.message}</td>
                <td className={classes.log_details}>{log.details}</td>
                <td className={classes.log_user}>{log.user_id}</td>
                <td className={classes.log_ip}>{log.ip_address}</td>
                <td className={classes.log_timestamp}>
                  {formatDate(log.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredLogs.length === 0 && (
        <div className={classes.no_logs}>
          <Eye className={classes.no_logs_icon} />
          <p>No logs found matching your criteria</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className={classes.pagination}>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={classes.pagination_button}
          >
            Previous
          </button>

          <span className={classes.pagination_info}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={classes.pagination_button}
          >
            Next
          </button>
        </div>
      )}

      <div className={classes.logs_summary}>
        <p>
          Showing {currentLogs.length} of {filteredLogs.length} logs
        </p>
      </div>
    </div>
  );
}
