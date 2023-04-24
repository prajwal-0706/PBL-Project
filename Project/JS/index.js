const SideBar = document.querySelectorAll('.sidebar-select');

for (let i = 0; i < SideBar.length; i++) {
  SideBar[i].addEventListener('click', () => {
    let j = 0;
    while (j < SideBar.length) {
      SideBar[j++].classList.remove('active');
    }
    SideBar[i].classList.add('active');
  });
}
