const { Client, Account, ID, Databases } = Appwrite;
const client = new Client();
const databases = new Databases(client);
const account = new Account(client);
const notifications = document.querySelector('.notifications');
const loading = document.querySelector('.loading-container');
const userContainer = document.querySelector('.user-container');
const Toggler = document.querySelector('.toggleContainer');
const logOut = document.querySelector('.user-logout');
const currentUl = document.querySelector('.user-current-events');
const UserBody = document.querySelectorAll('.user-body');
const SideBar = document.querySelectorAll('.sidebar-select');

let date_for_event = new Date();
let currMonths = date_for_event.getMonth();
let currYears = date_for_event.getFullYear();
let currDates = date_for_event.getDate();

const toastDetails = {
  timer: 5000,
  success: {
    icon: 'fa-circle-check',
  },
  error: {
    icon: 'fa-circle-xmark',
  },
  warning: {
    icon: 'fa-triangle-exclamation',
  },
  info: {
    icon: 'fa-circle-info',
  },
};

const removeToast = (toast) => {
  toast.classList.add('hide');
  if (toast.timeoutId) clearTimeout(toast.timeoutId);
  setTimeout(() => toast.remove(), 500);
};

const createToast = (id, name) => {
  const { icon } = toastDetails[id];
  const toast = document.createElement('li');
  toast.className = `toast ${id}`;
  toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${name}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
  notifications.appendChild(toast);
  toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
};

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('64385f72bbae8835bef7');

const fetchUser = async () => {
  try {
    const data = await account.get();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getEvents = async () => {
  try {
    const promise = await databases.listDocuments(
      '6453b6ad51e4917763c1',
      '6453b6c532d32950fb21'
    );

    return promise.documents;
  } catch (error) {
    console.log(error);
  }
};

const deleteSession = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.log(error);
  }
};

let data;

fetchUser().then((getData) => {
  if (getData) {
    setTimeout(() => {
      loading.style.display = 'none';
      data = getData;
      console.log(data);
      userContainer.style.opacity = 1;
      createToast('success', `Welcome......${getData.name}`);
      document.querySelector('.login-userName').textContent = getData.name;
      getEvents().then((userData) => {
        console.log(userData);
        for (let user = 0; user < userData.length; user++) {
          let userdata = userData[user];
          if (
            parseInt(userdata.eventStartDate.slice(0, 4)) <= currYears &&
            parseInt(userdata.eventStartDate.slice(5, 7)) <= currMonths + 1 &&
            parseInt(userdata.eventStartDate.slice(8, 10)) < currDates
          ) {
            createPastEvents(userData[user], user);
          } else {
            createCurrentEvent(userData[user]);
          }
        }
      });
    }, 800);
    if (getData.prefs.Admin === 'true') {
      window.location.href =
        'https://event-management-site.web.app/HTML/Admin%20Panel/Admin.html';
    }
  } else {
    console.log(getData);
    window.location.href = '/Project/';
    createToast('error', 'Something Went worng');
  }
});

const clickHandler_1 = () => {
  Toggler.classList.toggle('on');
  document.querySelector('.user-container').classList.toggle('toggle');
  document.querySelector('.user-sidebar').classList.toggle('toggle');
};

logOut.addEventListener('click', () => {
  loading.style.display = 'flex';
  userContainer.style.opacity = 0;
  deleteSession().then(() => {
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  });
});

const createCurrentEvent = (data) => {
  let eventLi = document.createElement('li');
  eventLi.classList.add('booking-card');
  eventLi.style.backgroundImage = `url(${data.eventLogo})`;

  eventLi.innerHTML = `
  <div class="book-container">
  <div class="content">
  <a href="../form/register.html"> 
    <button class="btn">Register Now</button>
    </a>
  </div>
</div>
<div class="informations-container">
  <h2 class="title">
    ${data.eventName}
  </h2>
  <p class="sub-title">This Event is related to ${data.eventType} activities</p>
  <p class="price">
    <svg
      class="icon"
      style="width: 24px; height: 24px"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3,6H21V18H3V6M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M7,8A2,2 0 0,1 5,10V14A2,2 0 0,1 7,16H17A2,2 0 0,1 19,14V10A2,2 0 0,1 17,8H7Z"
      /></svg
    >Fees: &#x20b9;  ${data.eventEndDate}
  </p>
  <div class="more-information">
    <div class="info-and-date-container">
      <div class="box info">
        <svg
          class="icon"
          style="width: 24px; height: 24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
          />
        </svg>
        <p>Registrations are Closing Soon</p>
      </div>
      <div class="box date">
        <svg
          class="icon"
          style="width: 24px; height: 24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"
          />
        </svg>
        <p>${data.eventStartDate}</p>
      </div>
    </div>
    <p class="disclaimer">
      ${data.eventDescription}
    </p>
  </div>
</div>`;

  currentUl.appendChild(eventLi);
};

const createPastEvents = (data, index) => {
  let createLi = document.createElement('li');

  createLi.innerHTML = `
  <div class="direction-${index % 2 === 0 ? 'l' : 'r'}">
  <div class="flag-wrapper">
    <span class="flag">${data.eventName}</span>
    <span class="time-wrapper"
      ><span class="time">${data.eventStartDate}</span></span
    >
  </div>
  <div class="desc">
   ${data.eventDescription}
  </div>
</div>
  `;

  document.querySelector('.timeline').appendChild(createLi);
};

window.onscroll = () => {
  let current = 'main-events';

  UserBody.forEach((body) => {
    const bodyTop = body.offsetTop;
    if (scrollY >= bodyTop - 60) {
      current = body.getAttribute('id');
    }
  });

  SideBar.forEach((sidebar) => {
    sidebar.classList.remove('active');
    if (sidebar.href.includes(current)) {
      sidebar.classList.add('active');
    }
  });
};

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  slidesPerView: 3,
  gap: '15px',
  loop: true,

  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  autoplay: {
    delay: 1500,
  },
});
