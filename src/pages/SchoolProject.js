import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import  style from './projects.module.scss'
import { allProject } from '../api'
import Card from './../components/card/Card'

function SchoolProject() {
    const { loading, error, data } = useQuery(allProject);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;


    const schoolProjects = data.repositoryOwner.repositories.nodes.filter(schoolProject => schoolProject.repositoryTopics.edges.map(edge => edge.node.topic.name).includes('scolaire'))

    console.log(schoolProjects)
    return (
        <div id={style.projects}>
        {schoolProjects.map(schoolProject =>
            <Card key={schoolProject.name} project={schoolProject}/>
        )}
        </div>
    )
}

export default SchoolProject;