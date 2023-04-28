const { Client, Account, ID } = Appwrite;
const client = new Client();
const account = new Account(client);

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('64385f72bbae8835bef7');

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

document.querySelector('.ggl').addEventListener('click', () => {
  googleAuth();
});
