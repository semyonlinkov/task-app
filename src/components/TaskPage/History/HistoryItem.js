import React from 'react';
import styles from "./MyTasksItem.module.scss";
import Moment from "react-moment";

const HistoryItem = ({title,  withLine, active = [], failed, activeText = []}) => {
    console.log(activeText)
    return (
        <div className={`${styles.processItem} ${active.length || activeText.length ? styles.activeProcess : null} ${failed ? styles.failedProcess : null}`}>
            {withLine ? <div className={styles.line}></div> : null}
            <div className={styles.circle}></div>
            <div>
                <p>{title}</p>
                {activeText.length && !failed ? <p style={{fontSize: 13, color: "black"}}>{activeText}</p> : null}
                {activeText.length && failed ? <p style={{fontSize: 13, color: "red"}}>{activeText}</p> : null}
                {active.length ? <p style={{fontSize: 11, color: "grey"}}><Moment format={'DD.MM.YYYY HH:mm:ss'}>{active[1]}</Moment></p> : null}
            </div>
        </div>
    );
}



export default HistoryItem;
