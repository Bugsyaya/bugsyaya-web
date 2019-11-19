import { gql } from "apollo-boost";
import { TOKEN } from './secret'
import ApolloClient from 'apollo-boost';

const ENDPOINT_URL = 'https://api.github.com/graphql'

export const client = new ApolloClient({
  uri: ENDPOINT_URL,
  headers: { Authorization: 'Bearer ' + TOKEN }
});

export const allProject =
    gql`
    {
        repositoryOwner(login:"Bugsyaya") {
            repositories(first:50) {
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