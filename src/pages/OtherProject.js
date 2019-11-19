import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import  style from './projects.module.scss'
import { allProject } from '../api'
import Card from './../components/card/Card'

function OtherProject() {
    const { loading, error, data } = useQuery(allProject);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;


    const otherProjects = data.repositoryOwner.repositories.nodes.filter(otherProject => otherProject.repositoryTopics.edges.lenght === 0)

    console.log('otherProjects', otherProjects)
    return (
        <div id={style.projects}>
        {otherProjects.map(otherProject =>
            <Card key={otherProject.name} project={otherProject}/>
        )}
        </div>
    )
}

export default OtherProject;