import React from 'react';
import style from './tag.module.scss'

function Tag({language}) {
    return (
        <div className={style.tag}>
            <div className={style.name}>{language.name}</div>
        </div>
    )
}

export default Tag;