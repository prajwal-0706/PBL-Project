const { Client, Account, ID } = Appwrite;
const client = new Client();
const account = new Account(client);
const form = document.querySelector('.login-form');
const email_input = document.querySelector('.email');
const password_input = document.querySelector('.password');
const name_input = document.querySelector('.name');
let email;
let password;
let Name;

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('64385f72bbae8835bef7');

const createAccount = async (email, password, name) => {
  try {
    const promise = await account.create(ID.unique(), email, password, name);
    console.log(promise);
  } catch (err) {
    console.log(err);
  }
};

const googleAuth = async () => {
  try {
    const promise = await account.createOAuth2Session(
      'google',
      'http://127.0.0.1:5501/Project/HTML/Admin%20Panel/Admin.html',
      'http://127.0.0.1:5501/Project/HTML/form/pbllogin.html'
    );
    console.log(promise);
  } catch (error) {
    console.log(error);
  }
};

email_input.addEventListener('change', (e) => {
  email = e.target.value;
});

password_input.addEventListener('change', (e) => {
  password = e.target.value;
});

name_input.addEventListener('change', (e) => {
  Name = e.target.value;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  createAccount(email, password, Name);
});

document.querySelector('.ggl').addEventListener('click', () => {
  googleAuth();
});
