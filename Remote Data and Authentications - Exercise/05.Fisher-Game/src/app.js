const baseUrl = "http://localhost:3030";  // Base URL for API
const catchesUrl = `${baseUrl}/data/catches`;
const usersUrl = `${baseUrl}/users`;

window.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    
    document.getElementById("logout").addEventListener("click", logout);
    document.querySelector("#register-view form").addEventListener("submit", register);
    document.querySelector("#login-view form").addEventListener("submit", login);
    document.querySelector(".load").addEventListener("click", loadCatches);
    document.querySelector("#addForm").addEventListener("submit", createCatch);
    
    updateNav(userData);
});

function updateNav(userData) {
    if (userData) {
        document.getElementById("guest").style.display = "none";
        document.getElementById("user").style.display = "inline-block";
        document.querySelector(".email span").textContent = userData.email;
        document.querySelector(".add").disabled = false;
    } else {
        document.getElementById("guest").style.display = "inline-block";
        document.getElementById("user").style.display = "none";
        document.querySelector(".email span").textContent = "guest";
        document.querySelector(".add").disabled = true;
    }
}

async function register(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const rePass = formData.get("rePass");

    if (password !== rePass) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch(`${usersUrl}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error("Failed to register");
        }

        const data = await response.json();
        sessionStorage.setItem("userData", JSON.stringify(data));
        updateNav(data);
    } catch (err) {
        alert(err.message);
    }
}

async function login(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const response = await fetch(`${usersUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        const data = await response.json();
        sessionStorage.setItem("userData", JSON.stringify(data));
        updateNav(data);
    } catch (err) {
        alert(err.message);
    }
}

async function logout() {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (!userData) return;

    try {
        await fetch(`${usersUrl}/logout`, {
            method: "GET",
            headers: { "X-Authorization": userData.accessToken }
        });

        sessionStorage.removeItem("userData");
        updateNav(null);
    } catch (err) {
        alert("Logout failed");
    }
}

async function loadCatches() {
    try {
        const response = await fetch(catchesUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch catches");
        }

        const data = await response.json();
        displayCatches(data);
    } catch (err) {
        alert(err.message);
    }
}

function displayCatches(catches) {
    const catchesContainer = document.getElementById("catches");
    catchesContainer.innerHTML = "";

    const userData = JSON.parse(sessionStorage.getItem("userData"));

    catches.forEach(c => {
        const isOwner = userData && userData._id === c._ownerId;
        const catchElement = document.createElement("div");
        catchElement.className = "catch";
        catchElement.innerHTML = `
            <label>Angler</label>
            <input type="text" class="angler" value="${c.angler}" ${!isOwner ? "disabled" : ""}>
            <label>Weight</label>
            <input type="number" class="weight" value="${c.weight}" ${!isOwner ? "disabled" : ""}>
            <label>Species</label>
            <input type="text" class="species" value="${c.species}" ${!isOwner ? "disabled" : ""}>
            <label>Location</label>
            <input type="text" class="location" value="${c.location}" ${!isOwner ? "disabled" : ""}>
            <label>Bait</label>
            <input type="text" class="bait" value="${c.bait}" ${!isOwner ? "disabled" : ""}>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${c.captureTime}" ${!isOwner ? "disabled" : ""}>
            <button class="update" data-id="${c._id}" ${!isOwner ? "disabled" : ""}>Update</button>
            <button class="delete" data-id="${c._id}" ${!isOwner ? "disabled" : ""}>Delete</button>
        `;

        if (isOwner) {
            catchElement.querySelector(".update").addEventListener("click", () => updateCatch(c._id, catchElement));
            catchElement.querySelector(".delete").addEventListener("click", () => deleteCatch(c._id));
        }

        catchesContainer.appendChild(catchElement);
    });
}


async function createCatch(event) {
    event.preventDefault();
    
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (!userData) return;

    const formData = new FormData(event.target);
    const newCatch = {
        angler: formData.get("angler"),
        weight: Number(formData.get("weight")),
        species: formData.get("species"),
        location: formData.get("location"),
        bait: formData.get("bait"),
        captureTime: Number(formData.get("captureTime"))
    };

    try {
        const response = await fetch(catchesUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": userData.accessToken
            },
            body: JSON.stringify(newCatch)
        });

        if (!response.ok) {
            throw new Error("Failed to add catch");
        }

        loadCatches();
    } catch (err) {
        alert(err.message);
    }
}

async function updateCatch(catchId, catchElement) {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (!userData) return;

    const updatedCatch = {
        angler: catchElement.querySelector(".angler").value,
        weight: Number(catchElement.querySelector(".weight").value),
        species: catchElement.querySelector(".species").value,
        location: catchElement.querySelector(".location").value,
        bait: catchElement.querySelector(".bait").value,
        captureTime: Number(catchElement.querySelector(".captureTime").value)
    };

    try {
        const response = await fetch(`${catchesUrl}/${catchId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": userData.accessToken
            },
            body: JSON.stringify(updatedCatch)
        });

        if (!response.ok) {
            throw new Error("Failed to update catch");
        }

        loadCatches(); // Refresh the catches list
    } catch (err) {
        alert(err.message);
    }
}

async function deleteCatch(catchId) {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (!userData) return;

    if (!confirm("Are you sure you want to delete this catch?")) return;

    try {
        const response = await fetch(`${catchesUrl}/${catchId}`, {
            method: "DELETE",
            headers: {
                "X-Authorization": userData.accessToken
            }
        });

        if (!response.ok) {
            throw new Error("Failed to delete catch");
        }

        loadCatches(); // Refresh the list
    } catch (err) {
        alert(err.message);
    }
}
