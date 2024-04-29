const loadUserDetails = () => {
  const user_id = localStorage.getItem('user_id');
  fetch(`https://testing-8az5.onrender.com/users/${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      const parent = document.getElementById('user-details-container');
      const div = document.createElement('div');
      div.classList.add('user-all');
      div.innerHTML = `
          <div class="user-img">
            <img src="./Images/man-1.jpg" alt="" />
          </div>
          <div class="user-info">
            <h1>${data.username}</h1>
           
            <h3>${data.email}</h3>
          </div>
            `;
      console.log(div)
      parent.appendChild(div);
    });
};

loadUserDetails();
