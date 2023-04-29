const SideBar = document.querySelectorAll('.sidebar-select');
const AdminBody = document.querySelectorAll('.admin-body');

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

const Toggler = document.querySelector('.toggleContainer');

const clickHandler_1 = () => {
  Toggler.classList.toggle('on');
  document.querySelector('.admin-container').classList.toggle('toggle');
  document.querySelector('.admin-sidebar').classList.toggle('toggle');
  document.querySelector('.admin-charts').classList.toggle('toggle');
};
