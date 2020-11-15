const githubData = {
  token: "69756818fcfe57bc75d2c3c25bb2423d3aa9d2a0",
  username: "MichaelOlatunji"
}

client = GraphQL.makeClient("https://api.github.com/graphql")
client.setHeader("Authorization", "bearer " + githubData.token);

const query = `
  query Profile { 
    user(login: "MichaelOlatunji") {
      name
      login
      twitterUsername
      followers {
        totalCount
      }
      following {
        totalCount
      }
      bio
      location
      email
      websiteUrl
      twitterUsername
      starredRepositories {
        totalCount
      }
      watching {
        totalCount
      }
      organizations(last: 10) {
        nodes {
          name
          avatarUrl
        }
      }
      projects(first: 10){
        totalCount
        nodes{
          name
          updatedAt
        }
      }
      packages(first: 10){
        totalCount
        nodes{
          name
          packageType
        }
      }
      pinnedItems(first: 6, types: REPOSITORY) {
        totalCount
        nodes {
          ... on Repository {
            name
            description
            url
            createdAt
            forkCount
            stargazerCount
            languages(first: 1) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
      repositories(last: 20, privacy: PUBLIC) {
        nodes {
          name
          description
          url
          updatedAt
          forkCount
          stargazerCount
          languages(first: 1) {
            edges {
              node {
                name
              }
            }
          }
        }
        totalCount
        totalDiskUsage
      }
    }
  }
`

client.query(query, function(response){
  console.log(response);
})

