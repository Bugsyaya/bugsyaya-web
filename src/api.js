import { gql } from "apollo-boost";
import SECRET from './.secret.json'
import ApolloClient from 'apollo-boost';

const ENDPOINT_URL = 'https://api.github.com/graphql'

export const client = new ApolloClient({
  uri: ENDPOINT_URL,
  headers: { Authorization: 'Bearer ' + SECRET.TOKEN }
});


export const user =
gql`
  query { 
    repository(name:"Bugsyaya", owner:"Bugsyaya") {
    	id
    	object(expression: "HEAD:") {
      	... on Tree {
        	entries {
            name
            object {
            	... on Blob {
              	text
            	}
          	}
        	}
      	}
    	}
  	}
    user(login:"Bugsyaya") {
        id
        name
        createdAt
        updatedAt
        company
        login
        organizations(last:10) {
            nodes {
                id
                name
                avatarUrl
                description
            }
        }
        followers {
            totalCount
        }
        following {
            totalCount
        }
        bio
        avatarUrl
    }
  }
`

export const allProject =
    gql`
    {
        repositoryOwner(login:"Bugsyaya") {
            repositories(first:100, orderBy: {field: CREATED_AT, direction: DESC}) {
                nodes{
                    createdAt,
                    languages(first:10) {
                        nodes{
                            name
                        }
                    },
                    description,
                    forkCount,
                    name,
                    url,
                    repositoryTopics(first:10) {
                        edges{
                            node{
                                topic{
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    `