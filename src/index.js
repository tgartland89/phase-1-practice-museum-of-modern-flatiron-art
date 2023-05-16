console.log('Write your code here');

document.addEventListener("DOMContentLoaded", () => {
    let exhibitData; // Variable to store the fetched exhibit data
  
    fetch("http://localhost:3000/current-exhibits")
      .then(r => r.json())
      .then(data => {
        exhibitData = data[0]; // Assuming the first exhibit is fetched
  
        // Update exhibit details
        document.getElementById("exhibit-title").textContent = exhibitData.title;
        document.getElementById("exhibit-description").textContent = exhibitData.description;
        document.getElementById("exhibit-image").src = exhibitData.image;
  
        // Update comments
        const commentsSection = document.getElementById("comments-section");
        commentsSection.innerHTML = ""; // Clear existing comments
  
        exhibitData.comments.forEach(comment => {
          const commentElement = document.createElement("p");
          commentElement.textContent = comment;
          commentsSection.appendChild(commentElement);
        });
  
        // Buy tickets button
        const buyTicketsButton = document.getElementById("buy-tickets-button");
        const ticketsBoughtElement = document.getElementById("tickets-bought");
        let ticketsBoughtCount = exhibitData.tickets_bought || 0;
  
        buyTicketsButton.addEventListener("click", () => {
          ticketsBoughtCount++;
          ticketsBoughtElement.textContent = `${ticketsBoughtCount} Tickets Bought`;
  
          // PATCH request to update tickets_bought count
          fetch(`http://localhost:3000/current-exhibits/${exhibitData.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ tickets_bought: ticketsBoughtCount })
          })
            .then(r => r.json())
            .then(updatedExhibitData => {
              exhibitData = updatedExhibitData;
            })
            .catch(error => {
              console.error("Error updating exhibit:", error);
            });
        });
  
        // Comment form submission
        const commentForm = document.getElementById("comment-form");
        const commentInput = document.querySelector('input[name="comment-input"]');
  
        commentForm.addEventListener("submit", event => {
          event.preventDefault(); // Prevent form submission
  
          const newComment = commentInput.value.trim(); // Get the value and trim whitespace
  
          if (newComment !== "") {
            exhibitData.comments.push(newComment); // Add the new comment to the exhibit data
  
            // PATCH request to update the exhibit's comments
            fetch(`http://localhost:3000/current-exhibits/${exhibitData.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ comments: exhibitData.comments })
            })
              .then(r => r.json())
              .then(updatedExhibitData => {
                exhibitData = updatedExhibitData;
  
                // Add the new comment to the comments section
                const commentElement = document.createElement("p");
                commentElement.textContent = newComment;
                commentsSection.appendChild(commentElement);
  
                commentInput.value = ""; // Clear the input field
              })
              .catch(error => {
                console.error("Error updating exhibit comments:", error);
              });
          }
        });
      });
  });
  