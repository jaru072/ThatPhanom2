// Core interactions and UI navigation helpers
document.addEventListener('DOMContentLoaded', () => {
  // Scroll progress bar
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0) {
        const percent = (window.scrollY / scrollTotal) * 100;
        progressBar.style.width = percent + '%';
      }
    }, { passive: true });
  }

  // Floating scroll navigation buttons
  const scrollTopBtn = document.getElementById('scrollToTopButton');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const scrollBottomBtn = document.getElementById('scrollToBottomButton');
  if (scrollBottomBtn) {
    scrollBottomBtn.addEventListener('click', () => {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    });
  }
});
