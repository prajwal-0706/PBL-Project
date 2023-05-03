const { Client, Account, ID } = Appwrite;
const client = new Client();
const account = new Account(client);
const loading = document.querySelector('.loading-container');
const Admin_Container = document.querySelector('.admin-container');
const Toggler = document.querySelector('.toggleContainer');
const Logout = document.querySelector('.logout');
const SideBar = document.querySelectorAll('.sidebar-select');
const notifications = document.querySelector('.notifications');
const eventTitle_input = document.querySelector('.create-event-title');
const eventDate_input = document.querySelector('.create-event-date');
const eventDescription_input = document.querySelector(
  '.create-event-description'
);
const createEvent_input = document.querySelector('.create-event');

let createEvent = {
  eventTitle: '',
  eventDate: '',
  eventDescription: '',
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

const deleteSession = async () => {
  try {
    await account.deleteSession('current');
  } catch (err) {
    console.log(err);
  }
};

const toastDetails = {
  timer: 5000,
  success: {
    icon: 'fa-circle-check',
    text: `SuccessFully Logged In `,
  },
  error: {
    icon: 'fa-circle-xmark',
    text: 'Error: This is an error toast.',
  },
  warning: {
    icon: 'fa-triangle-exclamation',
    text: 'Warning: This is a warning toast.',
  },
  info: {
    icon: 'fa-circle-info',
    text: 'Info: This is an information toast.',
  },
};

const removeToast = (toast) => {
  toast.classList.add('hide');
  if (toast.timeoutId) clearTimeout(toast.timeoutId);
  setTimeout(() => toast.remove(), 500);
};

const createToast = (id, name) => {
  const { icon } = toastDetails[id];
  let text = `Hey.. ${name} !!!`;
  const toast = document.createElement('li');
  toast.className = `toast ${id}`;
  toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${text}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
  notifications.appendChild(toast);
  toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
};

const dateHandler = () => {
  const Month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  const date_handler = document.querySelector('.admin-current-date');
  date_handler.textContent = `${Month[month]}  ${day}`;
};

Logout.addEventListener('click', (e) => {
  e.preventDefault();
  loading.style.display = 'flex';
  Admin_Container.style.opacity = 0;
  deleteSession().then(() => {
    setTimeout(() => {
      window.location.href = '/Project/';
    }, 500);
  });
});

fetchUser().then((data) => {
  if (data) {
    if (data.prefs.Admin) {
      loading.style.display = 'none';
      Admin_Container.style.opacity = 1;
      document.querySelector(
        '.admin-details-text-name-1'
      ).textContent = `${data.name}`;
      dateHandler();
      createToast('success', 'Your Login is Successfull');
      window.scrollTo(0, 0);
      console.log(data);
    } else {
      deleteSession().then(() => {
        window.location.href = '/Project/';
        // window.location.replace(
        //   'http://127.0.0.1:5502/Project/HTML/form/pbllogin.html'
        // );
      });
    }
  } else {
    window.location.href = '/Project/';
  }
});

/*  Dark Mode Toggler  */

const clickHandler_1 = () => {
  Toggler.classList.toggle('on');
  document.querySelector('.admin-container').classList.toggle('toggle');
  document.querySelector('.admin-sidebar').classList.toggle('toggle');
  document.querySelector('.admin-charts').classList.toggle('toggle');
};

const AdminBody = document.querySelectorAll('.admin-body');

window.onscroll = () => {
  let current = 'dashboard';

  AdminBody.forEach((body) => {
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

const file = document.querySelector('.file');

file.addEventListener('change', (e) => {
  const [pra] = file.files;
  console.log(pra);

  if (pra) {
    let image = document.createElement('img');
    image.src = URL.createObjectURL(pra);
    image.classList.add('image');
    image.style.width = '250px';
    image.style.height = '250px';
    document.querySelector('.create-event-image').appendChild(image);
    image.addEventListener('click', () => {
      file.style.zIndex = 10;
    });
    file.style.zIndex = -1;
  } else {
    alert('Select Valid Image');
  }
});

const all = document.querySelectorAll('.create-event-input');

console.log(all);

all.forEach((each) => {
  each.addEventListener('change', (e) => {
    createEvent = {
      ...createEvent,
      [e.target.name]: e.target.value,
    };
    console.log(createEvent);
  });
});
