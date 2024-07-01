const IndividualCard = ({ icon, count, title }) => {
  return (
    <div className="col-xxl-4 col-lg-6 mb-5">
      <div className="card h-100">
        <div className="card-header py-0 pt-4 d-flex align-items-center justify-content-between">
          {title !== "Employee Earning" && (
            <div
              className={`badge bg-label-${
                (title === "Notifications" && "primary") ||
                (title === "Individuals" && "danger") ||
                (title === "Messages" && "warning") ||
                (title === "Support Ticket Notifications" && "info") ||
                (title === "Available Open Shifts" && "success") ||
                (title === "CareLink Digest" && "secondary") ||
                (title === "Reminder Module" && "danger")
              } p-4 rounded mb-4`}
            >
              <i className={icon}></i>
            </div>
          )}

          <div className="card-title mb-0 text-center">
            <h5 className="m-0 me-2">{title}</h5>
          </div>
          {title !== "Employee Earning" && (
            <div className="avatar avatar-sm me-3">
              <span className="avatar-initial rounded-circle bg-label-secondary">
                {count}
              </span>
            </div>
          )}
        </div>
        <ul className="p-2 mb-5 list-group list-group-flush custom-scroll" style={{ height: "300px" }}>
          <li className="list-group-item">
            <span>asdfsdf</span>
          </li>
          <li className="list-group-item">
            <span>asdfsdf</span>
          </li>
          <li className="list-group-item">
            <span>asdfsdf</span>
          </li>
          <li className="list-group-item">
            <span>asdfsdf</span>
          </li>
          <li className="list-group-item">
            <span>asdfsdf</span>
          </li>
          <li className="list-group-item">
            <span>asdfsdf</span>
          </li>
          <li className="list-group-item">
            <span>asdfsdf</span>
          </li>
          <li className="list-group-item">
            <span>asdfsdf</span>
          </li>
          <li className="list-group-item">
            <span>asdfsdf</span>
          </li>
          <li className="list-group-item">
            <span>asdfsdf</span>
          </li>
          <li className="list-group-item">
            <span>asdfsdf</span>
          </li>
          <li className="list-group-item">
            <span>asdfsdf</span>
          </li>
          <li className="list-group-item">
            <span>asdfsdf</span>
          </li>
          <li className="list-group-item">
            <span>asdfsdf</span>
          </li>
          <li className="list-group-item">
            <span>asdfsdf</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IndividualCard;
