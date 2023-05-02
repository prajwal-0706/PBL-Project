const { Client, Account, ID } = Appwrite;
const client = new Client();
const account = new Account(client);
const loading = document.querySelector('.loading-container');
const Admin_Container = document.querySelector('.admin-container');
const Toggler = document.querySelector('.toggleContainer');
const Logout = document.querySelector('.logout');
const SideBar = document.querySelectorAll('.sidebar-select');
const notifications = document.querySelector('.notifications');
const AdminBody = document.querySelectorAll('.admin-body');

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
  deleteSession();
  setTimeout(() => {
    window.location.href = '/Project/';
  }, 500);
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
      console.log(data);
    } else {
      deleteSession().then(() => {
        window.location.href = '/Project/';
      });
    }
  } else {
    window.location.href = '/Project/';
  }
});

/* Active Div on Dashboard */

for (let i = 0; i < SideBar.length; i++) {
  SideBar[i].addEventListener('click', () => {
    let j = 0,
      k = 0;
    while (j < SideBar.length) {
      SideBar[j++].classList.remove('active');
    }
    while (k < AdminBody.length) {
      AdminBody[k++].classList.remove('div-active');
    }
    SideBar[i].classList.add('active');
    AdminBody[i].classList.add('div-active');
  });
}

/*  Dark Mode Toggler  */

const clickHandler_1 = () => {
  Toggler.classList.toggle('on');
  document.querySelector('.admin-container').classList.toggle('toggle');
  document.querySelector('.admin-sidebar').classList.toggle('toggle');
  document.querySelector('.admin-charts').classList.toggle('toggle');
};
