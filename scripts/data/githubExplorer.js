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

function getLanguageColor(lang){
  lang = lang.toLowerCase();
  let color = "";
  switch(lang){
    case "css":
      color = "#563D7C";
      break;
    case "javascript":
      color = "#F1E05A";
      break;
    case "typescript":
      color = "#2B7489";
      break;
    case "python":
      color = "#3572A5";
      break;
    case "shell":
      color = "#89E051";
      break;
    case "php":
      color = "#4F5D95";
      break;
    case "html":
      color = "#E34C26";
      break;
    case "makefile":
      color = "#427819";
      break;
    default:
      color = "red"
  }

  return color
}

client.query(query, async function(response){
  console.log(response);
  const data = response;
  const repositoriesList = document.querySelector("#repositories");
  const bio = document.querySelector("#profile-bio");
  const { data: { user }, data: { user : { repositories }}} = data

  let userData = `
    <div class="details p-2">
      <div class="cont">
        <div>
          <img src=${user.avatarUrl} alt="avatar" />
        </div>
        <div>
          <h2 class="mb-0">${user.name}</h2>
          <p class="username mt-0">${user.login}</p>
        </div>
      </div>
      <p class="">${user.bio}</p>
      <p class="text-md text-default"><i class="fa fa-user-friends pr-1"></i><span class="text-black pr-1 text-bold">${user.followers.totalCount}</span>followers <b class="p-1">&centerdot;</b>
      <span class="text-black pr-1 text-bold">${user.following.totalCount}</span>following<b class="p-1">&centerdot;</b><i class="far fa-star pr-1"></i><span class="text-black pr-1 text-bold">${user.starredRepositories.totalCount}</span></p>
      <p class="text-md"><i class="fa fa-map-marker-alt pr-1 text-default"></i>${user.location}</p>
      <p class="text-md"><i class="far fa-envelope pr-1 text-default"></i><a href="mailto:${user.email}">${user.email}</a></p>
      <p class="text-md"><i class="fa fa-link pr-1 text-default"></i><a href=${user.websiteUrl}>${user.websiteUrl}</a></p>
      <p class="text-md"><i class="fab fa-twitter pr-1 text-default"></i><a href="https://twitter.com/${user.twitterUsername}">@${user.twitterUsername}</a></p>
    </div>
    <hr>
  `;
  bio.innerHTML = userData;

  const noOfRepos = repositories.nodes.length;
  let repos = "";
  for(let i = noOfRepos; i > 0; i--){
    let repoData = repositories.nodes[i-1];
    repos += `
    <div class="repo-container">
     <div>
      <h3 class="repo-name mb-0 mt-5"><a href=${repoData.url}>${repoData.name}</a></h3>
      <p class="text-sm mt-2 text-default">${repoData.description ? repoData.description : ''}</p>
      <p class="text-default"><div class="repo-details">${repoData.languages.nodes[0] ? '<div class="language-dot mr-1" style="background-color:'+getLanguageColor(repoData.languages.nodes[0].name)+'"></div><span class="pr-4 text-default text-sm">'+ repoData.languages.nodes[0].name +'</span>' : ''}
        ${repoData.stargazerCount ? '<span class="pr-4 text-default text-sm nowrap"><i class="far fa-star pr-1"></i>'+ repoData.stargazerCount +'</span>':''}
        ${repoData.forkCount ? '<span class="pr-4 text-default text-sm nowrap"><i class="fa fa-code-branch pr-1"></i>'+ repoData.forkCount +'</span>':''}
          <span class="text-default text-sm">Updated ${useMoment(repoData.updatedAt)}</span>
        </div>
      </p>
     </div>
     <div>
      <button class="mt-5"><i class="far fa-star mr-1"></i>Star</button>
     </div>
    </div>
    <hr>
      `;
    // console.log(i, repositories.nodes[i]["name"])
  }
  repositoriesList.innerHTML = repos;

  console.log(repositories)

})
