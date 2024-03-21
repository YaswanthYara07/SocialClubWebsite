const questions = document.querySelectorAll('.faq-question');


questions.forEach(question => {
  question.addEventListener('click', () => {
    // Remove active class from all questions
    questions.forEach(q => {
      q.classList.remove('active');
    });

    // Add active class to clicked question
    question.classList.add('active');

    // Toggle answer visibility
    const answer = question.nextElementSibling;
    if (answer.style.display === 'none') {
      answer.style.display = 'block';
    } else {
      answer.style.display = 'none';
    }
  });
});
