'use server';
import styles from '@css/main/section.module.css';
import data from '@data/sections.json';

export default async function Section({ children, name, type }) {
    return (
        <div className={styles.sitesection} id={data.ids[name]}>
            <div className={styles.siteheading}>
                <h2 className={styles.sectionheader}>{data.headings[name]}</h2>
                <p className={styles.sectionsubheader}>{data.descriptions[name]}</p>
            </div>

            {type === 'grid' ? <div className={styles.featuregrid}>{children}</div> : children}
        </div>
    );
}
