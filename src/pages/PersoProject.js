import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import  style from './projects.module.scss'
import { allProject } from '../api'
import Card from './../components/card/Card'

function PersoProject() {
    const { loading, error, data } = useQuery(allProject);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;


    const persoProjects = data.repositoryOwner.repositories.nodes.filter(persoProject => persoProject.repositoryTopics.edges.map(edge => edge.node.topic.name).includes('global-game-jam'))

    console.log(persoProjects)
    return (
        <div id={style.projects}>
        {persoProjects.map(persoProject =>
            <Card key={persoProject.name} project={persoProject}/>
        )}
        </div>
    )
}

export default PersoProject;