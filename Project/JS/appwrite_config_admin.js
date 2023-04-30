const { Client, Account, ID } = Appwrite;
const client = new Client();
const account = new Account(client);
const loading = document.querySelector('.loading-container');
const Admin_Container = document.querySelector('.admin-container');
const Toggler = document.querySelector('.toggleContainer');
const Logout = document.querySelector('.logout');
const SideBar = document.querySelectorAll('.sidebar-select');
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
    loading.style.display = 'none';
    Admin_Container.style.opacity = 1;
    document.querySelector(
      '.admin-details-text-name-1'
    ).textContent = `${data.name}`;
    console.log(data);
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
