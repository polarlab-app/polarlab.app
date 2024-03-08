import styles from '../../src/css/main/plus.module.css';

export default function Page() {
    return (
        <div className={styles.main}>
            <div className={`${styles.pricingtop} ${styles.appearanimation}`}>
                <h1 className={styles.pricingheader}>Pricing Accessible To Anyone</h1>
                <p className={styles.pricingdescription}>
                    Whether you want to support us little or big, you can choose! We have compiled 3 plans across which
                    you are sure to find your ideal plan. All of the plans below are purely for voluntary support and do
                    not provide many benefits, they are here to keep the project running and cover hosting funds.
                </p>
            </div>
            <div className={`${styles.pricinggrid} ${styles.appearanimation}`}>
                <div className={styles.pricingitem}>
                    <div className={styles.itemtop}>
                        <p className={styles.tier}>Free</p>
                        <h2 className={styles.price}>
                            $0.00 <span className={styles.period}>forever</span>
                        </h2>
                        <a className={styles.getbtn}>Get Free</a>
                    </div>
                    <div className={styles.itembottom}>
                        <div className={styles.advantage}>
                            <img
                                className={styles.advantageimg}
                                alt='img'
                                src='https://cdn.polarlab.app/src/icons/mono/mono_terminal.png'></img>
                            <p className={styles.advantagetext}>Moderation +400</p>
                        </div>
                    </div>
                </div>
                <div className={`${styles.pricingitem} ${styles.premium}`}>
                    <div className={styles.itemtop}>
                        <p className={styles.tier}>Premium</p>
                        <h2 className={styles.price}>
                            $4.99 <span className={styles.period}>/month</span>
                        </h2>
                        <a className={styles.getbtn}>Get Premium</a>
                    </div>
                    <div className={styles.itembottom}>
                        <div className={styles.advantage}>
                            <img
                                className={styles.advantageimg}
                                alt='img'
                                src='https://cdn.polarlab.app/src/icons/mono/mono_terminal.png'></img>
                            <p className={styles.advantagetext}>Moderation +400</p>
                        </div>
                    </div>
                </div>
                <div className={`${styles.pricingitem} ${styles.ultimate}`}>
                    <div className={styles.itemtop}>
                        <p className={styles.tier}>Ultimate</p>
                        <h2 className={styles.price}>
                            $7.99 <span className={styles.period}>/month</span>
                        </h2>
                        <a className={styles.getbtn}>Get Ultimate</a>
                    </div>
                    <div className={styles.itembottom}>
                        <div className={styles.advantage}>
                            <img
                                className={styles.advantageimg}
                                alt='img'
                                src='https://cdn.polarlab.app/src/icons/mono/mono_terminal.png'></img>
                            <p className={styles.advantagetext}>Moderation +400</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
