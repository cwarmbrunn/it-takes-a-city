<<<<<<< HEAD
// function for submission of a new comment
// capture the form content
  async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector("").value.trim();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  // defining the method as a POST
  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment_text
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      document.location.reload();
=======
async function newFormHandler(event) {
    // Prevents default from happening
    event.preventDefault();
  
    // Sets title to query selector with post-title
    const comment_text = document.querySelector('input[name="comment-text"]').value;
  
    const post_id = 6;
  
    // Response for POST
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({
        comment_text,
        post_id
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    // If Response is OK - do the following
    if (response.ok) {
      document.location.replace("/profile");
>>>>>>> feature/profile
    } else {
      alert(response.statusText);
    }
  }
<<<<<<< HEAD
}

// this is event listener for submission of a new comment
document.querySelector("").addEventListener("submit", commentFormHandler);
=======
  
  // Event Listener for New Post Form
  document
    .querySelector(".add-comment-form")
    .addEventListener("submit", newFormHandler);
  
>>>>>>> feature/profile
