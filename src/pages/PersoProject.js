import React, { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import  style from './projects.module.scss'
import { allProject } from '../api'
import Card from './../components/card/Card'

function PersoProject() {
    const { loading, error, data } = useQuery(allProject);
    const ref = useRef()

    useEffect(() => {
        if (loading || !ref.current) return 
        ref.current.scrollIntoView({behavior: 'smooth'})
    }, [loading])

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const planingoProjects = data.repositoryOwner.repositories.nodes.filter(persoProject => persoProject.repositoryTopics.edges.map(edge => edge.node.topic.name).includes('planingo'))
    const calGeneratorProjects = data.repositoryOwner.repositories.nodes.filter(persoProject => persoProject.repositoryTopics.edges.map(edge => edge.node.topic.name).includes('calgenerator'))
    const persoProjects = data.repositoryOwner.repositories.nodes.filter(persoProject => persoProject.repositoryTopics.edges.map(edge => edge.node.topic.name).includes('global-game-jam'))

    

    return (
        <div ref={ref}>
            <div className={style.titleContainer}>
                <h1>Planingo</h1>
            </div>
            <div className={style.projects}>
                {planingoProjects.map(persoProject =>
                    <Card key={persoProject.name} project={persoProject}/>
                )}
            </div>
            <div className={style.titleContainer}>
                <h1>CalGenerator (POC de Planingo)</h1>
            </div>
            <div className={style.projects}>
                {calGeneratorProjects.map(persoProject =>
                    <Card key={persoProject.name} project={persoProject}/>
                )}
            </div>
            <div className={style.titleContainer}>
                <h1>Global game jam</h1>
            </div>
            <div className={style.projects}>
                {persoProjects.map(persoProject =>
                    <Card key={persoProject.name} project={persoProject}/>
                )}
            </div>
        </div>
    )
}

export default PersoProject;