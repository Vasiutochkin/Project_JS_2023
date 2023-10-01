const userContainerDiv = document.createElement('div');
userContainerDiv.classList.add('userContainerDiv');
document.body.append(userContainerDiv);

fetch(`https://jsonplaceholder.typicode.com/users`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Не вдалося отримати дані користувачів');
        }
        return response.json();
    })
    .then((users) => {
        for (const user of users) {
            const userDiv = document.createElement('div');
            userDiv.classList.add('userDiv');
            userDiv.innerHTML = `
        <p>ID: ${user.id}</p>
        <p>Name: ${user.name}</p>
      `;

            const button = document.createElement('button');
            button.innerText = 'User-details';
            button.onclick = () => {
                location.href = `./user-details.html?id=${user.id}`;
            };

            userDiv.appendChild(button);
            userContainerDiv.appendChild(userDiv);
        }
    })
    .catch((error) => {
        const errorElement = document.createElement('div');
        errorElement.innerText = 'Помилка отримання даних: ' + error;
        document.body.appendChild(errorElement);
    });
