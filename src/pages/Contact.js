import React, { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import  style from './projects.module.scss'
import { user } from '../api'
import { Button, Input, TextareaAutosize } from '@material-ui/core';

function Contact() {
    const { loading, error, data } = useQuery(user);
    const ref = useRef()

    useEffect(() => {
        if (loading || !ref.current) return 
        ref.current.scrollIntoView({behavior: 'smooth'})
    }, [loading])

    if (loading) return 'Loading...';

    if (error) return `Error! ${error.message}`;
    let createdAt = new Date(data.user.createdAt)
    let updatedAt = new Date(data.user.updatedAt)

    var showdown  = require('showdown'),
    converter = new showdown.Converter(),
    text      = data.repository.object.entries[0].object.text,
    html      = converter.makeHtml(text);

    return (
        <div id={style.contactContainer} ref={ref}>
            <img src={data.user.avatarUrl} id={style.avatar} alt="avartar bugsyaya" />
            <div id={style.contact}>
                <div>
                    <p>{data.user.name} ({data.user.login})</p>
                </div>
                <div>
                    <p>💻{data.user.bio}🖌</p>
                </div>
                <div>
                    <p>Entreprise : {data.user.company}</p>
                </div>
                <div>
                    <p>Création du compte github le {createdAt.toLocaleString('fr-FR', { timeZone: 'UTC' })}</p>
                </div>
                <div>
                    <p>Mise à jour du compte github le {updatedAt.toLocaleString('fr-FR', { timeZone: 'UTC' })}</p>
                </div>
                <div>
                    <p>Abonnés : {data.user.followers.totalCount} / Abonnement : {data.user.following.totalCount}</p>
                </div>
                <div id={style.container}>
                    {data.user.organizations.nodes.map(orga => 
                        <div key={orga.id} id={style.orgaContainer}>
                            <img src={orga.avatarUrl} alt={`avartar ${orga.name}`} />
                            <div id={style.orga}>
                                <p className={style.orgaTitle}>{orga.name}</p>
                                <p>{orga.description}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <div dangerouslySetInnerHTML={{ __html: html }} />
                <form action="mailto:contact@bugsyaya.dev" method="GET">
                    <Input name="subject" type="text" placeholder="Objet du mail"/>
                    <TextareaAutosize name="body" placeholder="Que souhaitez-vous me dire ?" style={{ height: 180 }}/>
                    <Button type="submit">Envoyer le message ✈️</Button>
                </form>
            </div>
        </div>
    )
}

export default Contact;