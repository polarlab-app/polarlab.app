import Nav from '@/components/gdk/nav';
import styles from '@css/gdk/nav.module.css';
import '@css/gdk/gdk.global.css';

export default function GdkLayout({ children }) {
    return (
        <div className={styles.wrapper}>
            <Nav />
            {children}
        </div>
    );
}
