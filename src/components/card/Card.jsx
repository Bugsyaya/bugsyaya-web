import React from 'react';
import style from './card.module.scss'
import Tag from './../tag/Tag'

function Card({project}) {

    let createdAt = new Date(project.createdAt)
    return (
        <div className={style.card}>
            <a href={project.url}>
                <div className={style.title}>{project.name}</div>
                <div className={style.createdAt}>{createdAt.toLocaleString('fr-FR', { timeZone: 'UTC' })}</div>
                <div className={style.description}>{project.description}</div>
                <div className={style.tags}>
                    {project.languages.nodes.map(language =>
                        <Tag key={language.name} language={language} />
                    )}
                </div>
            </a>
        </div>
    )
}

export default Card;