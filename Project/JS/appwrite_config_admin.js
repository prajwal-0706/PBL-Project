/*                      Appwrite Declarations                  */
const { Client, Account, ID, Databases, Storage } = Appwrite;
const client = new Client();
const databases = new Databases(client);
const storage = new Storage(client);
const account = new Account(client);
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('64385f72bbae8835bef7');

/*                       Initial Declarations                  */

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
const file = document.querySelector('.file');
const inputBoxes = document.querySelectorAll('.create-event-input-box');
const CreateEventform = document.querySelector('.create-event');
const CreateEvent_handler = document.querySelector('.add-event .btn');
const AdminBody = document.querySelectorAll('.admin-body');
const createEventCross = document.querySelector('.create-event-cross');
const date_handler = document.querySelector('.admin-current-date');
const image = document.querySelector('.create-event-image img');
let fileName;
let createEvent = {
  eventName: '',
  eventStartDate: '',
  eventEndDate: '',
  eventType: '',
  eventDescription: '',
  eventLogo: '',
};
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

/*                           Appwrite Fuctions                      */

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

const CreateEvent = async (createFileData) => {
  try {
    const promise = await databases.createDocument(
      '6453b6ad51e4917763c1',
      '6453b6c532d32950fb21',
      ID.unique(),
      {
        ...createEvent,
        eventLogo: createFileData,
      }
    );
    return promise;
  } catch (error) {
    console.log(error);
  }
};

const CreateEventFile = async () => {
  try {
    const promise = await storage.createFile(
      '6455f81f21e9822f4bf9',
      ID.unique(),
      fileName
    );
    let resultUrl = `https://cloud.appwrite.io/v1/storage/buckets/${promise.bucketId}/files/${promise.$id}/view?project=64385f72bbae8835bef7`;
    return resultUrl;
  } catch (error) {
    console.log(error);
  }
};

/*                             Initial Functions                     */

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

const removeToast = (toast) => {
  toast.classList.add('hide');
  if (toast.timeoutId) clearTimeout(toast.timeoutId);
  setTimeout(() => toast.remove(), 500);
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
  date_handler.textContent = `${Month[month]}  ${day}`;
};

const clickHandler_1 = () => {
  Toggler.classList.toggle('on');
  document.querySelector('.admin-container').classList.toggle('toggle');
  document.querySelector('.admin-sidebar').classList.toggle('toggle');
  document.querySelector('.admin-charts').classList.toggle('toggle');
};

/*                             Event Listeners                       */

Logout.addEventListener('click', (e) => {
  e.preventDefault();
  loading.style.display = 'flex';
  Admin_Container.style.opacity = 0;
  deleteSession().then(() => {
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  });
});

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

file.addEventListener('change', (e) => {
  fileName = file.files[0];
  if (fileName) {
    image.src = URL.createObjectURL(fileName);
    image.addEventListener('click', () => {
      file.style.zIndex = 10;
    });
    file.style.zIndex = -1;
  } else {
    alert('Select Valid Image');
  }
});

inputBoxes.forEach((input) => {
  input.addEventListener('change', (e) => {
    createEvent = {
      ...createEvent,
      [e.target.name]: e.target.value,
    };
    console.log(createEvent);
  });
});

CreateEventform.addEventListener('submit', (e) => {
  e.preventDefault();
  CreateEventFile().then((createFileData) => {
    console.log(createFileData);
    CreateEvent(createFileData).then((data) => {
      console.log(data);
      createToast('success', 'Event Created Successfully');
      inputBoxes.forEach((input) => (input.value = ''));
      file.value = '';
      image.src = '';
      file.style.zIndex = 1;
      CreateEventform.style.display = 'none';
      document.body.style.pointerEvents = 'auto';
    });
  });
});

CreateEvent_handler.addEventListener('click', () => {
  const value = document.querySelector('.add-event').offsetTop;
  scrollTo(0, value);
  CreateEventform.style.display = 'flex';
  CreateEventform.style.pointerEvents = 'auto';
});

createEventCross.addEventListener('click', () => {
  CreateEventform.style.display = 'none';
  document.body.style.pointerEvents = 'auto';
});

/*                              Driver Code                          */

fetchUser().then((data) => {
  if (data) {
    if (data.prefs.Admin) {
      loading.style.display = 'none';
      Admin_Container.style.opacity = 1;
      document.querySelector(
        '.admin-details-text-name-1'
      ).textContent = `${data.name}`;
      dateHandler();
      createToast('success', 'Your Login is Successful');
      window.scrollTo(0, 0);
      console.log(data);
    } else {
      deleteSession().then(() => {
        window.location.href = '/';
      });
    }
  } else {
    window.location.href = '/';
  }
});
