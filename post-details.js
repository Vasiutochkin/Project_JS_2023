let apiURL = `https://jsonplaceholder.typicode.com/posts/`;
let url = new URL(location.href);
let id = url.searchParams.get("id");

const container = document.createElement('div');
container.classList.add('container');
document.body.append(container);

// Створюємо контейнер для інформації про пост
const postContainer = document.createElement('div');
postContainer.classList.add('post-container');
container.append(postContainer);

fetch(apiURL + id)
    .then(response => response.json())
    .then(post => {

        for (const key in post) {
            const div = document.createElement('div');
            postContainer.append(div);
            div.innerText = `${key} : ${post[key]}`;
        }

        fetch(apiURL + id + '/comments')
            .then(response => response.json())
            .then(comments => {

                const commentsContainer = document.createElement('div');
                commentsContainer.classList.add('comments-container');
                container.append(commentsContainer);

                for (const comment of comments) {
                    const commentDiv = document.createElement('div');
                    commentDiv.classList.add('commentDiv');
                    commentsContainer.append(commentDiv);

                    for (const key in comment) {
                        const keyDiv = document.createElement('div');
                        keyDiv.innerText = `${key} : ${comment[key]}`;
                        commentDiv.append(keyDiv);
                    }
                }
            })
            .catch(error => {
                const errorElement = document.createElement('div');
                errorElement.innerText = 'Помилка отримання даних: ' + error;
                document.body.appendChild(errorElement);
            });
    })
    .catch(error => {
        const errorElement = document.createElement('div');
        errorElement.innerText = 'Помилка отримання даних: ' + error;
        document.body.appendChild(errorElement);
    });
