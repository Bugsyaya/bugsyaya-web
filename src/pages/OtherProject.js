import React, { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import  style from './projects.module.scss'
import { allProject } from '../api'
import Card from './../components/card/Card'

function OtherProject() {
    const { loading, error, data } = useQuery(allProject);
    const ref = useRef()

    useEffect(() => {
        if (loading || !ref.current) return 
        ref.current.scrollIntoView({behavior: 'smooth'})
    }, [loading])

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const otherProjects = data.repositoryOwner.repositories.nodes.filter(otherProject => 
        !otherProject.repositoryTopics.edges.map(edge => edge.node.topic.name).includes('hacktoberfest') &&
        !otherProject.repositoryTopics.edges.map(edge => edge.node.topic.name).includes('global-game-jam')  &&
        !otherProject.repositoryTopics.edges.map(edge => edge.node.topic.name).includes('scolaire') &&
        !otherProject.repositoryTopics.edges.map(edge => edge.node.topic.name).includes('planingo') &&
        !otherProject.repositoryTopics.edges.map(edge => edge.node.topic.name).includes('calgenerator')
    )

    return (
        <div className={style.projects} ref={ref}>
        {otherProjects.map(otherProject =>
            <Card key={otherProject.name} project={otherProject}/>
        )}
        </div>
    )
}

export default OtherProject;