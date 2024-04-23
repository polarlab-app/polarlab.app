const { inputs } = require('@data/dashboard.json');

export default async function CheckboxInput({ type, value, onChange }) {
    <div className={styles.toggleswitchcontainer}>
        <div className={styles.toggleswitchtext}>
            <p className={styles.toggleswitchheader}>{inputs[type].name}</p>
            <p className={styles.toggleswitchdescription}>{inputs[type].description}</p>
        </div>
        <label className={styles.togglecontainer}>
            <input type='checkbox' className={styles.hidden} onChange={onChange}></input>
            <span className={styles.toggle}>
                <span className={styles.innertoggle}></span>
            </span>
        </label>
    </div>;
}
