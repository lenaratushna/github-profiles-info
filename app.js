const API_URL = 'https://api.github.com/users/';

const main = document.querySelector('#main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');

async function getUser(username) {
    const resp = await fetch(API_URL + username);
    const respData = await resp.json();
    
    createUserCard(respData);
    getRepos(username);
}

async function getRepos(username) {
    const resp = await fetch(API_URL + username + '/repos');
    const respData = await resp.json();

    addReposToCard(respData);
}

function createUserCard(user) {

    const cardHTML = `
        <div class="card">
            <div class="card-header">
                <div>
                    <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
                </div>
                <div>
                    <h2>${user.name}</h2>
                    <p>${user.bio}</p>
                    <ul class="list">
                        <li><span>Followers:</span> ${user.followers}</li>
                        <li><span>Following:</span> ${user.following}</li>
                        <li><span>Repos:</span> ${user.public_repos}</li>
                    </ul>
                </div>
            </div>
            <div class="repos" id="repos"></div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.querySelector('#repos');

    repos.forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');

        repoEl.href = repo.html_url;
        repoEl.target = "_blank"
        repoEl.innerHTML = repo.name;

        reposEl.appendChild(repoEl);
    });
}

form.addEventListener("submit", e => {
    e.preventDefault();
    console.log('i');
    const user = search.value;

    if(user) {
        getUser(user);
        search.value = '';
    }
})