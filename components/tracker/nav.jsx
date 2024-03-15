'use client';
import styles from '../../src/css/tracker/nav.module.css';
import secondaryStyles from '@/src/css/tracker/bug.module.css';

export default function TrackerBar() {
    async function handleMobile() {
        console.log('test');
        if (typeof document !== 'undefined') {
            console.log('test2');
            const sideNavElement = document.getElementById('buglist');
            const mainsection = document.getElementsByClassName(secondaryStyles.main);

            const menubutton = document.getElementById('menubutton');
            const closebutton = document.getElementById('closebutton');

            if (sideNavElement && mainsection[0] && closebutton && menubutton) {
                console.log('test3');
                sideNavElement.classList.toggle(styles.activelist);
                mainsection[0].classList.toggle(styles.hiddenmain);

                closebutton.classList.toggle(styles.block);
                menubutton.classList.toggle(styles.hidden);
            }
        }
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.navbarlogo}>
                <img className={styles.logo} src='https://cdn.polarlab.app/src/img/polarlogo.png' alt='alt' />
                <a className={styles.header} href='/'>
                    Polar Lab Bug Tracker
                </a>
            </div>
            <div className={styles.navlinks}>
                <a className={styles.navlink}>Home</a>
                <a className={styles.navlink}>Docs</a>
                <a className={styles.navlink}>Status</a>
            </div>
            <div className={styles.createnewcontainer}>
                <a className={styles.createnew} href='/tracker/create'>
                    Create New
                </a>
            </div>
            <img
                src='https://cdn.polarlab.app/src/icons/efive/sidenav.png'
                className={styles.menuicon}
                id='menubutton'
                onClick={handleMobile}></img>
            <img
                src='https://cdn.polarlab.app/src/icons/efive/close.png'
                className={styles.closeicon}
                id='closebutton'
                onClick={handleMobile}></img>
        </div>
    );
}
