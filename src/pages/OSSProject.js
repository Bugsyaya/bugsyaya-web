import React, { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import  style from './projects.module.scss'
import { allProject } from '../api'
import Card from './../components/card/Card'

function OSSProject() {
    const { loading, error, data } = useQuery(allProject);
    const ref = useRef()

    useEffect(() => {
        if (loading || !ref.current) return 
        ref.current.scrollIntoView({behavior: 'smooth'})
    }, [loading])

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const persoProjects = data.repositoryOwner.repositories.nodes.filter(persoProject => 
        persoProject.repositoryTopics.edges.map(edge => edge.node.topic.name).includes('hacktoberfest') &&
        !persoProject.repositoryTopics.edges.map(edge => edge.node.topic.name).includes('global-game-jam')  &&
        !persoProject.repositoryTopics.edges.map(edge => edge.node.topic.name).includes('scolaire') &&
        !persoProject.repositoryTopics.edges.map(edge => edge.node.topic.name).includes('planingo') &&
        !persoProject.repositoryTopics.edges.map(edge => edge.node.topic.name).includes('calgenerator'))

    return (
        <div className={style.projects} ref={ref}>
            {persoProjects.map(persoProject =>
                <Card key={persoProject.name} project={persoProject}/>
            )}
        </div>
    )
}

export default OSSProject;