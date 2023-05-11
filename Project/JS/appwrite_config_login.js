const { Client, Account, ID } = Appwrite;
const client = new Client();
const account = new Account(client);
const email_input = document.querySelector('.email');
const password_input = document.querySelector('.pass');
const form = document.querySelector('.login-form');

let email, password;

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('64385f72bbae8835bef7');

const createSession = async (email, password) => {
  try {
    await account.createEmailSession(email, password);
    window.location.href =
      'https://event-management-site.web.app/HTML/User%20Panel/user-side.html';
  } catch (error) {
    console.log(error);
  }
};

const googleAuth = async () => {
  try {
    await account.createOAuth2Session(
      'google',
      'https://event-management-site.web.app/HTML/User%20Panel/user-side.html',
      'https://event-management-site.web.app/HTML/form/pbllogin.html'
    );
  } catch (error) {
    console.log(error);
  }
};

const githubAuth = async () => {
  try {
    await account.createOAuth2Session(
      'github',
      'https://event-management-site.web.app/Project/User%20Panel/user-side.html',
      'https://event-management-site.web.app/Project/form/pbllogin.html'
    );
  } catch (error) {
    console.log(error);
  }
};

email_input.addEventListener('change', (e) => {
  email = e.target.value;
  console.log(email);
});

password_input.addEventListener('change', (e) => {
  password = e.target.value;
  console.log(password);
});

document.querySelector('.ggl').addEventListener('click', () => {
  googleAuth();
});

document.querySelector('.fbb').addEventListener('click', () => {
  githubAuth();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  createSession(email, password);
});
