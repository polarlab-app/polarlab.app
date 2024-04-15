import TrackerBar from '@components/tracker/nav.jsx';
import BugList from '@components/tracker/buglist.jsx';

import styles from '@css/tracker/global.module.css';
import '@css/tracker/dis.css';

export const metadata = {
    title: 'Polar Lab | Tracker',
    description: 'The official Polar Lab Issue and Suggestion Tracker',
};

export default function TrackLayout({ children }) {
    return (
        <>
            <div className={styles.mainwrapper}>
                <TrackerBar></TrackerBar>
                <div className={styles.mainsubsection}>
                    <BugList></BugList>
                    {children}
                </div>
            </div>
        </>
    );
}
