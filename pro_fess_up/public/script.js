document.addEventListener('DOMContentLoaded', function() {

    if (window.location.pathname.endsWith('index.html')) {
        // REVIEW TEST BUTTON - DELETE AFTER
        var reviewButton = document.querySelector('.review-button');
        if (reviewButton) { // Corrected condition
            reviewButton.addEventListener('click', function() {
                window.location.href = 'review.html';
            });
        } else {
            console.error('.review-button not found');
        }
    }
    
    // Sign In Button
    var signInButton = document.querySelector('.sign-in-button');
    if (signInButton) {
        signInButton.addEventListener('click', function() {
            window.location.href = 'signIn.html';
        });
    } else {
        console.error('.sign-in-button not found');
    }

    // Sign Up Button
    var signUpButton = document.querySelector('.sign-up-button');
    if (signUpButton) {
        signUpButton.addEventListener('click', function() {
            window.location.href = 'signup.html';
        });
    } else {
        console.error('.sign-up-button not found');
    }

    // Search Button
    var searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            window.location.href = 'searchResults.html';
        });
    } else {
        console.error('.search-button not found');
    }

    // Function to create a professor button
    function createProfessorButton(professor) {
        const button = document.createElement("button");
        button.classList.add("result-box");

        const titleElement = document.createElement("div");
        titleElement.classList.add("result-title");
        titleElement.textContent = professor.fullName; // Use the 'fullName' property

        const descriptionElement = document.createElement("div");
        descriptionElement.classList.add("result-description");
        descriptionElement.textContent = professor.course; // Replace 'course' with the actual field name in your professor data

        button.appendChild(titleElement);
        button.appendChild(descriptionElement);

        button.addEventListener("click", async function () {
            // Open a new window with professor details
            const title = professor.fullName; // Replace 'title' with the actual field name in your professor data
            var myWindow = window.open("/professor", "_self");

            if (myWindow) {
                myWindow.document.write(`
                    <h1>${title}</h1>
                    <p>This is a professor's introduction.</p>
                `);
            } else {
                console.error("Popup window blocked or not supported by the browser.");
            }
        });

        return button;
    }

    if (window.location.pathname.endsWith('searchResults.html')) {
        const nameInput = document.getElementById("nameInput");
        const addProfessorButton = document.getElementById("addProfessorButton");

        // Add a click event listener to the "Add Professor" button
        addProfessorButton.addEventListener("click", async function () {
            // Get the selected title and name from the input fields
            const professorName = nameInput.value;

            const professorData = {
                fullName: professorName,
                joinedDate: Date.now
            };

            // Make a POST request to the server's /professors endpoint
            try {
                const response = await fetch('/professors', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(professorData)
                });

                if (response.ok) {
                    // Professor successfully added to the database
                    nameInput.value = "";
                    console.log('Professor added successfully');
                } else {
                    console.error('Error adding professor1:', response.statusText);
                }
            } catch (error) {
                console.error('Error adding professor:', error.message);
            }
        });
    }

    // Fetch professors from the server and create buttons
    if (window.location.pathname.endsWith('searchResults.html')) {
        const professorsContainer = document.getElementById("professors-container");

        // Assuming you have a route that returns a JSON array of professors
        fetch("/professors")
            .then((response) => response.json())
            .then((professors) => {
                professors.forEach((professor) => {
                    const button = createProfessorButton(professor);
                    professorsContainer.appendChild(button);
                });
            })
            .catch((error) => {
                console.error("Error fetching professors:", error);
            });
    }

});