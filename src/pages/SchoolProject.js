import React, { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import  style from './projects.module.scss'
import { allProject } from '../api'
import Card from './../components/card/Card'

function SchoolProject() {
    const { loading, error, data } = useQuery(allProject);
    const ref = useRef()

    useEffect(() => {
        if (loading || !ref.current) return 
        ref.current.scrollIntoView({behavior: 'smooth'})
    }, [loading])

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const schoolProjects = data.repositoryOwner.repositories.nodes.filter(schoolProject => schoolProject.repositoryTopics.edges.map(edge => edge.node.topic.name).includes('scolaire'))

    return (
        <div className={style.projects} ref={ref}>
            {schoolProjects.map(schoolProject =>
                <Card key={schoolProject.name} project={schoolProject}/>
            )}
        </div>
    )
}

export default SchoolProject;