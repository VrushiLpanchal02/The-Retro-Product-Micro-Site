document.addEventListener('DOMContentLoaded', function () {
  // nav highlight
  const navLinks = document.querySelectorAll('#globalNav a');
  if (navLinks.length > 0) {
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  }

  // product gallery
  const thumbs = document.querySelectorAll('.thumbs img');
  const mainImage = document.getElementById('main-image');
  const caption = document.getElementById('caption');
  if (thumbs.length > 0 && mainImage) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', function (e) {
        e.preventDefault();
        mainImage.src = this.src.replace('-thumb', '');
        mainImage.alt = this.alt;
        if (caption) {
          caption.textContent = this.dataset.caption || this.alt;
        }
      });
    });
  }

  // review form
  const reviewForm = document.getElementById('review-form');
if (reviewForm) {
  reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const ratingInput = document.querySelector('input[name="rating"]:checked');
    const comment = document.getElementById('comment').value;
    // ...
  });
}
  // support form
  const supportForm = document.getElementById('support-form');
  if (supportForm) {
    supportForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('support-name').value;
      const issue = document.getElementById('support-issue').value;

      if (!name || !issue) {
        alert('Please enter your name and select an issue type.');
        return;
      }
      alert(`Thank you, ${name}! Your ${issue} support request has been received.`);
      supportForm.reset();
    });
  }
});
