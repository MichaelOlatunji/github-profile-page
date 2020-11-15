client = GraphQL.makeClient("https://api.github.com/graphql")
client.setHeader("Authorization", "bearer " + githubData.token);

const query = `
  query Profile { 
    user(login: "MichaelOlatunji") {
      name
      login
      avatarUrl
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
            nodes {
              name
            }
          }
        }
        totalCount
        totalDiskUsage
      }
    }
  }
`

client.query(query, async function(response){
  console.log(response);
  const data = response;
  let repositoriesList = document.querySelector("#repositories");


  const { data: { user : { repositories }}} = data

  const noOfRepos = repositories.nodes.length;
  let result = "";
  for(let i = noOfRepos; i > 0; i--){
    let repoData = repositories.nodes[i-1];
    result += `<h3><a href=${repoData.url}>${repoData.name}</a></h3>
                <p>${repoData.description ? repoData.description : ''}</p>
                <p><div></div><span>${repoData.languages.nodes[0] ? repoData.languages.nodes[0].name : ''}<span><span>Updated ${useMoment(repoData.updatedAt)}</span></p>
                <hr>`
    // console.log(i, repositories.nodes[i]["name"])
    console.log(repoData.languages.nodes[0])
  }

  repositoriesList.innerHTML = result;

  console.log(repositories)

})


