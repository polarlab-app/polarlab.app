import styles from '../../src/css/downloads/downloads.module.css';
import items from './downloads.json';

export const metadata = {
    title: 'Polar Lab | Downloads',
    description: 'The official Polar Lab Downloads center',
};

export default function Page() {
    return (
        <div className={styles.main}>
            <h1 className={styles.downloadsheader}>Download Center</h1>
            {items.map((item, index) => {
                const key = Object.keys(item)[0];
                return (
                    <div className={styles.downloadcategory} key={key}>
                        <h2 className={styles.downloadcategoryheader}>{key}</h2>
                        <div className={styles.downloaditems}>
                            {item[key].map((item, itemIndex) => (
                                <div
                                    className={`${styles.downloaditem} ${item.recommended ? styles.recommended : ''}`}
                                    key={itemIndex}>
                                    <div className={styles.downloaditemtext}>
                                        <p className={styles.itemheader}>{item.name}</p>
                                        <p className={styles.itemdescription}>{item.description}</p>
                                        <p className={styles.sha}>SHA1: {item.sha1}</p>
                                    </div>
                                    <a href={item.href} className={styles.itemimgcontainer} target='_blank'>
                                        <img
                                            alt='download'
                                            src='https://cdn.polarlab.app/src/icons/efive/download.png'
                                            className={styles.itemimg}></img>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
