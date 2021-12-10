const createComment = (data) => {
  const {comments} = data;
  const arrComments = [];

  for (let i = 0; i < comments.length; i++) {
    const current = comments[i];
    const {comment, date, author, emotion} = current;
    const template = `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${emotion.url}" width="55" height="55" alt="${emotion.alt}">
            </span>
            <div>
              <p class="film-details__comment-text">${comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;

    arrComments.push(template);
  }

  return arrComments.join('');
};

export {createComment};
