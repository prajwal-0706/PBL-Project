const { Client, Account, ID, Databases } = Appwrite;
const client = new Client();
const databases = new Databases(client);
const account = new Account(client);
const notifications = document.querySelector('.notifications');
const loading = document.querySelector('.loading-container');
const userContainer = document.querySelector('.user-container');
const Toggler = document.querySelector('.toggleContainer');
const logOut = document.querySelector('.user-logout');

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
    console.log(promise.documents);
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

fetchUser().then((getData) => {
  if (getData) {
    console.log(getData.prefs.Admin);
    getEvents();
    setTimeout(() => {
      loading.style.display = 'none';
      userContainer.style.opacity = 1;
      createToast('success', `Welcome......${getData.name}`);
      document.querySelector('.login-userName').textContent = getData.name;
    }, 800);
    if (getData.prefs.Admin === 'true') {
      window.location.href =
        'http://127.0.0.1:5502/Project/HTML/Admin%20Panel/Admin.html';
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
      window.location.href = '/Project/';
    }, 500);
  });
});
