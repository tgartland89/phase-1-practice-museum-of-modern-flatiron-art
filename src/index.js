console.log('Write your code here');

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/current-exhibits")
      .then(r => r.json())
      .then(data => {
        const exhibit = data[0]; // Assuming the first exhibit is fetched
  
        // Update exhibit details
        document.getElementById("exhibit-title").textContent = exhibit.title;
        document.getElementById("exhibit-description").textContent = exhibit.description;
        document.getElementById("exhibit-image").src = exhibit.image;
  
        // Update comments
        const commentsSection = document.getElementById("comments-section");
        commentsSection.innerHTML = ""; // Clear existing comments
  
        exhibit.comments.forEach(comment => {
          const commentElement = document.createElement("p");
          commentElement.textContent = comment;
          commentsSection.appendChild(commentElement);
        });
  
        // Comment form submission
        const commentForm = document.getElementById("comment-form");
        const commentInput = document.querySelector('input[name="comment-input"]');
  
        commentForm.addEventListener("submit", event => {
          event.preventDefault(); // Prevent form submission
  
          const newComment = commentInput.value.trim(); // Get the value and trim whitespace
  
          if (newComment !== "") {
            const commentElement = document.createElement("p");
            commentElement.textContent = newComment;
            commentsSection.appendChild(commentElement);
  
            commentInput.value = ""; // Clear the input field
          }
        });
      });
  });