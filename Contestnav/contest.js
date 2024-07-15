document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.fa-thumbs-up');
    const dislikeButtons = document.querySelectorAll('.fa-thumbs-down');
  
    likeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const count = button.nextElementSibling;
        count.textContent = parseInt(count.textContent) + 1;
      });
    });
  
    dislikeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const count = button.nextElementSibling;
        count.textContent = parseInt(count.textContent) + 1;
      });
    });
  });


//buttn toggle
document.addEventListener('DOMContentLoaded', () => {
  const voteBtn = document.getElementById('vote-btn');
  const resultBtn = document.getElementById('result-btn');

  voteBtn.addEventListener('click', () => {
      voteBtn.classList.add('active');
      resultBtn.classList.remove('active');
  });

  resultBtn.addEventListener('click', () => {
      resultBtn.classList.add('active');
      voteBtn.classList.remove('active');
  });
});
