// import { useEffect, useState } from "react";
// import classes from './Manage.module.css'

// export default function OfficerSpecialInterestList() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/special-interest")
//       .then((res) => res.json())
//       .then((data) => {
//         setRequests(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching special interest requests:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading requests...</p>;
//   if (!requests.length) return <p>No special interest requests yet.</p>;

//   return (
//     <div className={classes.container}>
//       <h2>Special Interest Requests</h2>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Full Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Country</th>
//             <th>Group Size</th>
//             <th>Visit Date</th>
//             <th>Request</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requests.map((req) => (
//             <tr key={req.id}>
//               <td>{req.full_name}</td>
//               <td>{req.email}</td>
//               <td>{req.phone_number}</td>
//               <td>{req.country}</td>
//               <td>{req.group_size}</td>
//               <td>
//                 {req.start_date} to {req.end_date}
//               </td>
//               <td>{req.request}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import classes from "./Manage.module.css";
import { AtSign, Calendar, UsersRound, MapPin, Phone } from "lucide-react";

export default function OfficerSpecialInterestList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/special-interest")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching special interest requests:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading requests...</p>;
  if (!requests.length) return <p>No special interest requests yet.</p>;

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

  return (
    <div className={classes.pageContainer}>
      <div className={classes.header}>
        <h2 className={classes.headerTitle}>
          All Requests ({requests.length})
        </h2>
        <span className={classes.totalRequests}>
          {requests.length} total requests
        </span>
      </div>
      <div className={classes.requestsGrid}>
        {requests.map((req) => (
          <div key={req.id} className={classes.requestCard}>
            <div className={classes.cardHeader}>
              <div className={classes.initialsCircle}>
                {getInitials(req.full_name)}
              </div>
              <span className={classes.fullName}>{req.full_name}</span>
            </div>
            <div className={classes.cardBody}>
              <div className={classes.infoItem}>
                <AtSign size={18} color="orange" />
                <span className={classes.spp}>{req.email}</span>
              </div>
              <div className={classes.infoItem}>
                <Phone size={18} color="orange" />
                <span className={classes.spp}>{req.phone_number}</span>
              </div>
              <div className={classes.infoItem}>
                <MapPin size={18} color="orange" />
                <span className={classes.spp}>{req.country}</span>
              </div>
              <div className={classes.infoItem}>
                <UsersRound size={18} color="orange" />
                <span className={classes.spp}>
                  {req.group_size} {req.group_size === 1 ? "person" : "people"}
                </span>
              </div>
              <div className={classes.infoItem}>
                <Calendar size={18} color="orange" />
                <span className={classes.spp}>
                  {req.start_date} to {req.end_date}
                </span>
              </div>
            </div>
            <div className={classes.specialRequest}>
              <p className={classes.specialRequestTitle}>Special Request:</p>
              <p>{req.request}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}