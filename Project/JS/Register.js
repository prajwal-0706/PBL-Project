const { Client, Account, ID, Databases, Storage } = Appwrite;
const client = new Client();
const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);
const AllInputs = document.querySelectorAll('.in');
let data;
let fileName;
let registerData = {
  teamName: '',
  teamLeaderName: '',
  leaderEmail: '',
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
  if (getData) {
    data = getData;
    console.log(data);
  } else {
    console.log(getData);
    window.location.href = '/Project/';
  }
});

const getEvents = async () => {
  try {
    const promise = await databases.listDocuments(
      '6453b6ad51e4917763c1',
      '645caae916725c5470b1'
    );

    return promise.documents;
  } catch (error) {
    console.log(error);
  }
};

const CreateEvent = async (createFileData) => {
  try {
    const promise = await databases.createDocument(
      '6453b6ad51e4917763c1',
      '645caae916725c5470b1',
      ID.unique(),
      {
        ...registerData,
        paymentPic: createFileData,
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
      '645caca41a3088631759',
      ID.unique(),
      fileName
    );
    let resultUrl = `https://cloud.appwrite.io/v1/storage/buckets/${promise.bucketId}/files/${promise.$id}/view?project=64385f72bbae8835bef7`;
    return resultUrl;
  } catch (error) {
    console.log(error);
  }
};

document.querySelector('.innerdiv').addEventListener('submit', (e) => {
  e.preventDefault();
  CreateEventFile().then((eventfile) => {
    CreateEvent(eventfile).then((data) => {
      console.log(data);
      setTimeout(() => {
        window.location.href = '../User%20Panel/user-side.html';
      }, 800);
    });
  });
});

AllInputs.forEach((input) => {
  input.addEventListener(
    'change',
    (e) =>
      (registerData = {
        ...registerData,
        [e.target.name]: e.target.value,
      })
  );
});

file.addEventListener('change', (e) => {
  fileName = file.files[0];
});
