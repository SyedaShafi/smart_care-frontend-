const getParams = () => {
  const param = new URLSearchParams(window.location.search).get('doctorId');
  //   console.log(param);
  loadTime(param);
  fetch(`https://testing-8az5.onrender.com/doctor/list/${param}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data))
    .catch((err) => console.log(err));

  fetch(`https://testing-8az5.onrender.com/doctor/review/?doctor_id=${param}`)
    .then((res) => res.json())
    .then((data) => doctorReview(data))
    .catch((err) => console.log(err));
};

const doctorReview = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById('doc-details-review');
    const div = document.createElement('div');
    div.classList.add('review-card');
    div.innerHTML = `
            <img src="./Images/girl.png" alt="" />
                <h4>${review.reviewer}</h4>
                <p>
                 ${review.body.slice(0, 100)}
                </p>
                <h6>${review.rating}</h6>
            `;
    parent.appendChild(div);
  });
};

const displayDetails = (doctor) => {
  const parent = document.getElementById('doc-details');
  const div = document.createElement('div');
  div.classList.add('doc-details-container');
  // console.log(doctor);
  div.innerHTML = `
    <div class="doctor-img">
        <img src="${doctor.image}" alt="" />
    </div>

    <div class="doc-info">
        <h1>${doctor.full_name}</h1>
        <h6>${doctor.designation}</h6>
        <h6>${doctor.specialization}</h6>

        ${doctor.specialization.map((item) => {
          return `<button class="doc-detail-btn"> ${item} </button>`;
        })}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
          laborum aut rerum! Nesciunt ipsum tenetur numquam corrupti porro,
          accusamus modi totam minus aut!
        </p>
        <h4>Fees: ${doctor.fee} BDT</h4>
        <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        >
        Take Appointment
        </button>
       
    </div>`;

  parent.appendChild(div);
};

const loadTime = (id) => {
  fetch(
    `https://testing-8az5.onrender.com/doctor/availabletime/?doctor_id=${id}`
  )
    .then((res) => res.json())
    .then((data) => displayTime(data))
    .catch((err) => console.log(err));
};

const displayTime = (times) => {
  times.forEach((time) => {
    const parent = document.getElementById('time-container');
    const option = document.createElement('option');
    option.value = time.id;
    option.innerHTML = time.name;
    parent.appendChild(option);
  });
};

const handleAppointment = () => {
  const param = new URLSearchParams(window.location.search).get('doctorId');
  const status = document.getElementsByName('status');
  const selected = Array.from(status).find((button) => button.checked);
  const symptom = document.getElementById('symptom').value;
  const time = document.getElementById('time-container');
  const selectedTime = time.options[time.selectedIndex];
  const patient_id = localStorage.getItem('patient_id');
  //   console.log(selectedTime.value);
  //   console.log(selected.value);

  const info = {
    appointment_type: selected.value,
    appointment_status: 'Pending',
    time: selectedTime.value,
    symptom: symptom,
    cancel: false,
    patient: patient_id,
    doctor: param,
  };
  //   console.log(info);

  fetch('https://testing-8az5.onrender.com/appointment/', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.href = `pdf.html?doctorId=${param}`;
      // handlePdf();
      console.log(data);
    });
};

const loadPatientId = () => {
  const user_id = localStorage.getItem('user_id');
  fetch(`https://testing-8az5.onrender.com/patient/list/?user_id=${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem('patient_id', data[0].id);
    });
};

loadPatientId();

getParams();
