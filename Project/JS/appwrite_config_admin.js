const { Client, Account, ID } = Appwrite;
const client = new Client();
const account = new Account(client);
const loading = document.querySelector('.loading-container');
const Admin_Container = document.querySelector('.admin-container');

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

fetchUser().then((data) => {
  if (data) {
    loading.style.display = 'none';
    Admin_Container.style.opacity = 1;
    window.reload = true;
    console.log(data);
  } else {
    window.location.href = '/Project/';
  }
});
