let activeMenu = undefined;
let openMenu = false
const toggleAnimation = (element, animation) => {
    element.style.transform = animation;


}

const setElementMaxHeight = (element, height) => {
    console.log(height);
    element.style.maxHeight = height;

}

const setElementImageSrc = (element, src) => {
    element.src = src;
}

const setActiveMenu = (menuHTML, iconHTML, id) => {
    activeMenu = {
        menu: menuHTML,
        icon: iconHTML,
        id: id
    }
}

const toggleMenuDropdown = (menu, animation, icon, height, src) => {
    setElementMaxHeight(menu, height);
    toggleAnimation(menu, animation)
    setElementImageSrc(icon, src)
}


const setCloseMenuEventListener = () => {
    const closeButton = document.querySelector('.close');
    const overlay = document.querySelector('.overlay');
    const navBar = document.querySelector('.primary-navigation');

    const openButton = document.querySelector(".open");
    navBar.classList.add('animate')

    openButton.addEventListener('click', (event) => {
        overlay.classList.add('overlay-active');
        toggleAnimation(navBar, 'translateX(0%)')
        event.stopPropagation()
    })

    closeButton.addEventListener('click', (event) => {
        overlay.classList.remove('overlay-active');
        toggleAnimation(navBar, 'translateX(100%)')
        event.stopPropagation()
        navBar.style.transform = ""
    })
}


const setToggleDropdownEventListener = () => {
    const toggleBtns = document.querySelectorAll('.dropdown-toggle');
    const menus = document.querySelectorAll('.dropdown-menu');
    const icons = document.querySelectorAll('.icon-arrow');
    const lists = document.querySelectorAll('.dropdown-list');
    for (let i = 0; i < toggleBtns.length; i++) {

        menus[i].classList.add('animate');
        menus[i].style.width = lists[i].clientWidth + 40 + "px";
        toggleBtns[i].addEventListener('click', (event) => {
            if (activeMenu && activeMenu.id !== i) {
                closeActiveMenu();
            }
            if (!openMenu) {
                toggleMenuDropdown(menus[i], "scaleY(1)", icons[i], `${lists[i].clientHeight}px`,"images/icon-arrow-up.svg");
                setActiveMenu(menus[i], icons[i], i);
            } else {
                toggleMenuDropdown(menus[i], "scaleY(0)", icons[i], "", "images/icon-arrow-down.svg");

            }
            openMenu = !openMenu;
            event.stopPropagation();
        })
    }

}

const closeActiveMenu = () => {
    const { menu, icon, id } = activeMenu;
    menu.style.maxHeight = "";
    menu.style.transform = "scaleY(0)"
    icon.src = "images/icon-arrow-down.svg"
    activeMenu = undefined;
    openMenu = false;
}

const setWindowListeners = () => {
    window.addEventListener('click', (e) => {
        if (activeMenu) {
            closeActiveMenu();

        }
    })

}

setCloseMenuEventListener();
setToggleDropdownEventListener();

setWindowListeners()