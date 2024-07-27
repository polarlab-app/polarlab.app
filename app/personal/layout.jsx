import styles from '@css/personal/personal.module.css';
import NavBar from '@/components/personal/nav';
export default async function PersonalLayout({ children }) {
    return (
        <div className={styles.wrapper}>
            <NavBar />
            {children}
        </div>
    );
}
