const { Client, Account, ID } = Appwrite;
const client = new Client();
const account = new Account(client);
const notifications = document.querySelector('.notifications');
const hello = document.querySelector('.hello');
const loading = document.querySelector('.loading-container');

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
  let text = `Hey ${name}`;
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

fetchUser().then((getData) => {
  loading.style.display = 'none';
  if (getData) {
    hello.textContent = `${getData.name}`;
    createToast('success', getData.name);
    console.log(getData.prefs.Admin);
    if (getData.prefs.Admin === 'true') {
      window.location.href =
        'http://127.0.0.1:5502/Project/HTML/Admin%20Panel/Admin.html';
    }
  } else {
    window.location.href = '/Project/';
    createToast('error');
  }
});
