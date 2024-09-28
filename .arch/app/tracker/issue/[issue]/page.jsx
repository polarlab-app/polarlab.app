import styles from '@css/tracker/bug.module.css';

import getIssue from '@/lib/tracker/getBug';

export default async function Page({ params }) {
    const issueId = await params.issue;

    const issue = await getIssue(issueId);

    return (
        <div className={styles.main}>
            <div className={styles.bugtop}>
                <h1 className={styles.bugtitle}>
                    #{issue.id} - {issue.title}
                </h1>
                <div className={styles.category}>{issue.category}</div>
            </div>
            <hr className={styles.bugdivider}></hr>

            <div className={styles.bugbottom}>
                <div className={styles.bugbottomleft}>
                    <p className={styles.sectionheader}>Description</p>
                    <p className={styles.bugdescription}>{issue.description}</p>
                    <p className={styles.sectionheader}>How to reproduce:</p>
                    <p className={styles.bugdescription}>{issue.reproduce}</p>
                </div>
                <div className={styles.bugbottomdetails}>
                    <p className={styles.sectionheader}>Details</p>
                    <p className={styles.detailheader}>
                        Author: <span className={styles.detaildata}>{issue.author}</span>
                    </p>
                    <p className={styles.detailheader}>
                        Type: <span className={styles.detaildata}>{issue.type}</span>
                    </p>
                    <p className={styles.detailheader}>
                        Version: <span className={styles.detaildata}>{issue.version}</span>
                    </p>
                    <p className={styles.detailheader}>
                        Fix Version: <span className={styles.detaildata}>{issue.fixversion}</span>
                    </p>
                    <p className={styles.detailheader}>
                        Status: <span className={styles.detaildata}>{issue.status}</span>
                    </p>
                    <p className={styles.detailheader}>
                        Priority: <span className={styles.detaildata}>{issue.priority}</span>
                    </p>
                </div>
            </div>
            <div className={styles.comments}>
                <h2 className={styles.commentsheader}>
                    Comments <span className={styles.commentscount}>{issue.comments.length}</span>
                </h2>
                {issue.comments && issue.comments.length > 0 ? (
                    issue.comments.map((comment, index) => (
                        <div className={styles.comment} key={index}>
                            <p className={styles.commentauthor}>{comment.username}</p>
                            <p className={styles.commentcontent}>{comment.comment}</p>
                            <hr className={styles.commentdivider}></hr>
                        </div>
                    ))
                ) : (
                    <p>None</p>
                )}
            </div>
        </div>
    );
}
