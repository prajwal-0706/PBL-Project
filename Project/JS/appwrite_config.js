const { Client, Account, ID } = Appwrite;
const client = new Client();
const account = new Account(client);
const form = document.querySelector('.login-form');
const email_input = document.querySelector('.email');
const password_input = document.querySelector('.password');
const name_input = document.querySelector('.name');
const loadingContainer = document.querySelector('.loading-container');
const logInContainer = document.querySelector('.login-container');
let email;
let password;
let Name;

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('64385f72bbae8835bef7');

const createAccount = async (email, password, name) => {
  try {
    const promise = await account.create(ID.unique(), email, password, name);
    return promise;
    console.log(promise);
  } catch (err) {
    console.log(err);
  }
};

const createSession = async (email, password) => {
  try {
    await account.createEmailSession(email, password);
  } catch (error) {
    console.log(error);
  }
};

const googleAuth = () => {
  // e.preventDefault();
  try {
    account.createOAuth2Session(
      'google',
      'http://127.0.0.1:5502/Project/HTML/User%20Panel/user-side.html',
      'http://127.0.0.1:5502/Project/HTML/form/pbllogin.html'
    );
  } catch (error) {
    console.log(error);
  }
};

const githubAuth = async () => {
  try {
    const promise = await account.createOAuth2Session(
      'github',
      'http://127.0.0.1:5502/Project/HTML/User%20Panel/user-side.html',
      'http://127.0.0.1:5502/Project/HTML/form/pbllogin.html'
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
  loadingContainer.style.display = 'flex';
  logInContainer.style.display = 'none';
  createAccount(email, password, Name).then((data) => {
    setTimeout(() => {
      createSession(email, password).then(() => {
        window.location.href = '/Project/HTML/User Panel/user-side.html';
      });
    }, 300);
  });
});

document.querySelector('.ggl').addEventListener('click', (e) => {
  googleAuth();
});

document.querySelector('.fbb').addEventListener('click', () => {
  githubAuth();
});

setTimeout(() => {
  loadingContainer.style.display = 'none';
  logInContainer.style.display = 'flex';
}, 1000);
