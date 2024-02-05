'use server';

import '../../src/css/dashboard/overview.css';
import { cookies } from 'next/headers';

export default async function Page() {
    const cookieStore = cookies();
    const userData = await cookieStore.get('userData');
    return (
        <>
            <div className='dashboardtopbar'>
                <h1 className='topbarheader'>Overview</h1>
                <hr className='topbardivider'></hr>
                <p className='topbardescription'>General information about your server</p>
            </div>
            <div className='dashboardwrapper'>
                <div className='hometop'>
                    <div className='smallinfocard'>
                        <div className='smallinfotextcontainer'>
                            <p className='smallinfoheader'>1,929</p>
                            <p className='smallinfodescription'>Members in the server</p>
                        </div>
                        <img
                            className='smallinfoimg'
                            src='https://cdn.discordapp.com/attachments/1018171583111647313/1183143971736801341/Untitled-2.png?ex=65c7dd30&is=65b56830&hm=2ccfa9d152f7a628825a5b0e8b69cbab77c1d390ce9593960d99ee5cb8cabc62&'></img>
                    </div>
                    <div className='smallinfocard'>
                        <div className='smallinfotextcontainer'>
                            <p className='smallinfoheader'>12</p>
                            <p className='smallinfodescription'>Members joined in the past 24h</p>
                        </div>
                        <img
                            className='smallinfoimg'
                            src='https://cdn.discordapp.com/attachments/1018171583111647313/1183143971736801341/Untitled-2.png?ex=65c7dd30&is=65b56830&hm=2ccfa9d152f7a628825a5b0e8b69cbab77c1d390ce9593960d99ee5cb8cabc62&'></img>
                    </div>
                    <div className='smallinfocard'>
                        <div className='smallinfotextcontainer'>
                            <p className='smallinfoheader'>27,890</p>
                            <p className='smallinfodescription'>{JSON.stringify(userData.value).username}</p>
                        </div>
                        <img
                            className='smallinfoimg'
                            src='https://cdn.discordapp.com/attachments/1018171583111647313/1183143971736801341/Untitled-2.png?ex=65c7dd30&is=65b56830&hm=2ccfa9d152f7a628825a5b0e8b69cbab77c1d390ce9593960d99ee5cb8cabc62&'></img>
                    </div>
                </div>
                <div className='overviewgraphs'></div>
                <div className='overviewdata'></div>
            </div>
        </>
    );
}
