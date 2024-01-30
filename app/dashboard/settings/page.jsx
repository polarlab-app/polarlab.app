import '../../../src/css/dashboard/settings.css';

export default function Page() {
    return (
        <>
            <div className='dashboardtopbar'>
                <h1 className='topbarheader'>Settings</h1>
                <hr className='topbardivider'></hr>
                <p className='topbardescription'>
                    The general settings for your server (Module specific settings can be found inside their respective
                    pages)
                </p>
            </div>
            <div className='dashboardwrapper'>
                <div className='togglegroup'>
                    <div className='toggleswitchcontainer'>
                        <div className='toggleswitchtext'>
                            <p className='toggleswitchheader'>AI Functionality</p>
                            <p className='toggleswitchdescription'>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className='togglecontainer'>
                            <input type='checkbox' className='hidden'></input>
                            <span className='toggle'>
                                <span className='innertoggle'></span>
                            </span>
                        </label>
                    </div>
                </div>
                <div className='togglegroup'>
                    <div className='toggleswitchcontainer'>
                        <div className='toggleswitchtext'>
                            <p className='toggleswitchheader'>AI Functionality</p>
                            <p className='toggleswitchdescription'>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className='togglecontainer'>
                            <input type='checkbox' className='hidden'></input>
                            <span className='toggle'>
                                <span className='innertoggle'></span>
                            </span>
                        </label>
                    </div>
                    <div className='toggleswitchcontainer'>
                        <div className='toggleswitchtext'>
                            <p className='toggleswitchheader'>AI Functionality</p>
                            <p className='toggleswitchdescription'>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className='togglecontainer'>
                            <input type='checkbox' className='hidden'></input>
                            <span className='toggle'>
                                <span className='innertoggle'></span>
                            </span>
                        </label>
                    </div>
                    <div className='toggleswitchcontainer'>
                        <div className='toggleswitchtext'>
                            <p className='toggleswitchheader'>AI Functionality</p>
                            <p className='toggleswitchdescription'>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className='togglecontainer'>
                            <input type='checkbox' className='hidden'></input>
                            <span className='toggle'>
                                <span className='innertoggle'></span>
                            </span>
                        </label>
                    </div>
                    <div className='toggleswitchcontainer'>
                        <div className='toggleswitchtext'>
                            <p className='toggleswitchheader'>AI Functionality</p>
                            <p className='toggleswitchdescription'>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className='togglecontainer'>
                            <input type='checkbox' className='hidden'></input>
                            <span className='toggle'>
                                <span className='innertoggle'></span>
                            </span>
                        </label>
                    </div>
                    <div className='toggleswitchcontainer'>
                        <div className='toggleswitchtext'>
                            <p className='toggleswitchheader'>AI Functionality</p>
                            <p className='toggleswitchdescription'>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className='togglecontainer'>
                            <input type='checkbox' className='hidden'></input>
                            <span className='toggle'>
                                <span className='innertoggle'></span>
                            </span>
                        </label>
                    </div>
                </div>
                <div className='togglegroup'>
                    <div className='toggleswitchcontainer'>
                        <div className='toggleswitchtext'>
                            <p className='toggleswitchheader'>AI Functionality</p>
                            <p className='toggleswitchdescription'>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className='togglecontainer'>
                            <input type='checkbox' className='hidden'></input>
                            <span className='toggle'>
                                <span className='innertoggle'></span>
                            </span>
                        </label>
                    </div>
                    <div className='toggleswitchcontainer'>
                        <div className='toggleswitchtext'>
                            <p className='toggleswitchheader'>AI Functionality</p>
                            <p className='toggleswitchdescription'>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className='togglecontainer'>
                            <input type='checkbox' className='hidden'></input>
                            <span className='toggle'>
                                <span className='innertoggle'></span>
                            </span>
                        </label>
                    </div>
                    <div className='toggleswitchcontainer'>
                        <div className='toggleswitchtext'>
                            <p className='toggleswitchheader'>AI Functionality</p>
                            <p className='toggleswitchdescription'>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className='togglecontainer'>
                            <input type='checkbox' className='hidden'></input>
                            <span className='toggle'>
                                <span className='innertoggle'></span>
                            </span>
                        </label>
                    </div>
                    <div className='toggleswitchcontainer'>
                        <div className='toggleswitchtext'>
                            <p className='toggleswitchheader'>AI Functionality</p>
                            <p className='toggleswitchdescription'>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className='togglecontainer'>
                            <input type='checkbox' className='hidden'></input>
                            <span className='toggle'>
                                <span className='innertoggle'></span>
                            </span>
                        </label>
                    </div>
                    <div className='toggleswitchcontainer'>
                        <div className='toggleswitchtext'>
                            <p className='toggleswitchheader'>AI Functionality</p>
                            <p className='toggleswitchdescription'>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className='togglecontainer'>
                            <input type='checkbox' className='hidden'></input>
                            <span className='toggle'>
                                <span className='innertoggle'></span>
                            </span>
                        </label>
                    </div>
                </div>
                <div className='savecontainer'>
                    <p className='savetext'>Do you want to save your changes?</p>
                    <div className='savebuttoncontainer'>
                        <button className='savebutton cancel'>Cancel</button>
                        <button className='savebutton save'>Save</button>
                    </div>
                </div>
            </div>
        </>
    );
}
