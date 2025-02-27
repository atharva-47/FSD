async function loadAppointments() {
    const res = await fetch("/appointments");
    const data = await res.json();
    const tableBody = document.getElementById("appointments");
    tableBody.innerHTML = "";
    data.forEach(appt => {
        tableBody.innerHTML += `
            <tr>
                <td>${appt.patientName}</td>
                <td>${appt.doctorName}</td>
                <td>${appt.date}</td>
                <td>${appt.time}</td>
                <td>
                    <a href="edit.html?id=${appt._id}" class="btn btn-warning btn-sm">Edit</a>
                    <a href="/appointments/delete/${appt._id}" class="btn btn-danger btn-sm">Delete</a>
                </td>
            </tr>
        `;
    });
}

loadAppointments();
