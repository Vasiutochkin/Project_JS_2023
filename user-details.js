function buildDOMAndOutputData(container, data) {
    for (const key in data) {
        const value = data[key];
        const div = document.createElement('div');
        div.classList.add('property');

        if (typeof value === 'object') {
            div.innerText = key;
            container.appendChild(div);
            const subContainer = document.createElement('div');
            subContainer.classList.add('sub-container');
            buildDOMAndOutputData(subContainer, value);
            div.appendChild(subContainer);
        } else {
            div.innerText = `${key}: ${value}`;
            container.appendChild(div);
        }
    }
}

const apiURL = `https://jsonplaceholder.typicode.com/users/`;
const url = new URL(location.href);
const id = url.searchParams.get('id')

fetch(apiURL + id)
    .then(response => response.json())
    .then(data => {
        const container = document.createElement('div');
        container.classList.add('userDetailsDiv');
        buildDOMAndOutputData(container, data);
        document.body.appendChild(container);

        const postsButton = document.createElement('button');
        postsButton.innerText = 'Post of current user';
        container.appendChild(postsButton);

        const postsContainer = document.createElement('div');
        postsContainer.classList.add('userPostsDiv');
        container.appendChild(postsContainer);

        postsButton.onclick = () => {
            postsButton.disabled = true

            fetch(apiURL + id + '/posts')
                .then(response => response.json())
                .then(posts => {

                    postsContainer.innerHTML = '';

                    for (const post of posts) {
                        const postTitle = document.createElement('div');
                        postTitle.classList.add('postTitle');
                        postTitle.innerText = post.title;

                        postTitle.onclick = () => {
                            location.href = `./post-details.html?id=${post.id}`;
                        };

                        postsContainer.appendChild(postTitle);
                    }
                })
                .catch(error => {
                    const errorElement = document.createElement('div');
                    errorElement.innerText = 'Помилка отримання даних: ' + error;
                    document.body.appendChild(errorElement);
                });
        };
    })
    .catch(error => {
        const errorElement = document.createElement('div');
        errorElement.innerText = 'Помилка отримання даних: ' + error;
        document.body.appendChild(errorElement);
    });
