const { Client, Account, ID } = Appwrite;
const client = new Client();
const account = new Account(client);
const hello = document.querySelector('.hello');
let getData;
console.log('hello');
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('64385f72bbae8835bef7');

const fetchUser = async () => {
  try {
    const data = await account.get();
    getData = await data;
    if (getData) {
      hello.textContent = `${data.name}`;
    } else {
      console.log(getData);
      hello.textContent = 'Nothing here';
    }
  } catch (error) {
    console.log(error);
  }
};

setTimeout(fetchUser(), 5000);
