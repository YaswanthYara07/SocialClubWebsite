


function google_add() {

    var xhttp = new XMLHttpRequest();


    xhttp.open("GET", "/googleAdd", true);

    xhttp.send();
}


function do_google_login(idToken) {

    var xhr = new XMLHttpRequest();


    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            window.location.href = '/landing.html';
        }
    };

    xhr.open('POST', '/google', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(idToken));

}



/*
function logout(){
    var xhttp = new XMLHttpRequest();


    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {


window.location.href="/";
console.log("Success");
}

    };
    xhttp.open("GET", "/logout", true);

    xhttp.send();
} */


function logout() {

    let req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            window.location.href = "/";
            // alert('Logged Out');
        } else if (req.readyState === 4 && req.status === 403) {
            // alert('Not logged in');
        }
    };

    req.open('GET', '/logout', true);
    req.send();

}








// Sign Up Page
function signup() {
    var xhttp = new XMLHttpRequest();

    var frst_nme = document.getElementById("signup_first_name").value;
    var lst_nme = document.getElementById("signup_last_name").value;
    var email = document.getElementById("signup_email").value;
    var phone = document.getElementById("signup_phone").value;

    var dob = document.getElementById("signup_phone").value;
    var course = document.getElementById("signup_course").value;
    var password = document.getElementById("signup_password").value;
    var username = document.getElementById("signup_username").value;

    if (frst_nme === '' || lst_nme === '' || email === '' || phone === '' || dob === '' || course === '' || password === '' || username === '' || password.length < 8) {
        document.getElementById("hider").innerText = "Please fill in all required fields and have a password atleast 8 characters in length";
        return;
    }

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {


            window.location.href = "signin.html";

        }
    };

    xhttp.open("POST", "/signup", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("first_name=" + encodeURIComponent(frst_nme) + "&last_name=" + encodeURIComponent(lst_nme) + "&email=" + encodeURIComponent(email) + "&phone=" + encodeURIComponent(phone) + "&dob=" + encodeURIComponent(dob) + "&course=" + encodeURIComponent(course) + "&password=" + encodeURIComponent(password) + "&username=" + encodeURIComponent(username));
}





// Sign In Page
function signin() {
    var xhttp = new XMLHttpRequest();
    var user_nme = document.getElementById("user_name").value;
    var pass = document.getElementById("password").value;

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var responseData = (this.responseText);
            // console.log(responseData);

            if (responseData === "true") {

                window.location.href = '/landing.html';

            } else {

                let passes = document.getElementById("error");

                passes.style.display = "block";

            }



        }
    };
    xhttp.open("POST", "/signin", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("user_name=" + encodeURIComponent(user_nme) + "&password=" + encodeURIComponent(pass));

}

function adminin() {
    var xhttp = new XMLHttpRequest();
    var user_nme = document.getElementById("user_name").value;
    var pass = document.getElementById("password").value;

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var responseData = (this.responseText);
            // console.log(responseData);

            if (responseData === "true") {

                window.location.href = '/landing.html';

            } else {

                let passes = document.getElementById("error");

                passes.style.display = "block";

            }



        }
    };
    xhttp.open("POST", "/adminin", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("user_name=" + encodeURIComponent(user_nme) + "&password=" + encodeURIComponent(pass));

}

function clubManager_in() {
    var xhttp = new XMLHttpRequest();
    var user_nme = document.getElementById("user_name").value;
    var pass = document.getElementById("password").value;

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var responseData = (this.responseText);
            // console.log(responseData);

            if (responseData === "true") {

                window.location.href = '/landing.html';
            } else {

                let passes = document.getElementById("error");

                passes.style.display = "block";

            }



        }
    };
    xhttp.open("POST", "/clubin", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("user_name=" + encodeURIComponent(user_nme) + "&password=" + encodeURIComponent(pass));

}





// Post Function
function posts() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {


            document.getElementById("hide").style.display = "none";

            document.getElementById("hidden").style.display = "block";


        }
    };
    xhttp.open("GET", "/post", true);

    xhttp.send();


}






function posted() {
    var xhttp = new XMLHttpRequest();
    var content = document.getElementById("content").value;
    var title = document.getElementById("title").value;

    let radioChecked;
    let publicA = document.getElementById("post_public");
    let privateA = document.getElementById("post_private");

    if (publicA.checked) {
        radioChecked = "Public";

    } else if (privateA.checked) {
        radioChecked = "Private";
    }


    // var publicPrivate = document.querySelector('input[name="post_publicPrivate"]:checked').value;
    let dates = new Date().toLocaleDateString();




    xhttp.open("POST", "/posted", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.send("dates=" + encodeURIComponent(dates) + "&post_name=" + encodeURIComponent(title) + "&post_content=" + encodeURIComponent(content) + "&publicPrivate=" + encodeURIComponent(radioChecked));



}






// Profile




function getPost() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var responseData = JSON.parse(this.responseText);
            var insert = document.getElementById("hide");
            insert.innerText = "";

            responseData.forEach(function (post) {
                var row = document.createElement('section');
                row.className = "Div";
                row.innerHTML = '<h2 class="titles">' + post.post_name + '</h2><p class="contents">' + post.post_content;
                insert.appendChild(row);
                var breaks = document.createElement('br');
                insert.append(breaks);

            });
        }
    };

    xhttp.open("GET", "/posted", true);
    xhttp.send();

}


function showAddClub() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {


            document.getElementById("hide").style.display = "none";

            document.getElementById("hidden").style.display = "block";
            document.getElementById("hider").style.display = "none";

        }
    };
    xhttp.open("GET", "/post", true);

    xhttp.send();
}
// makes a club
function addClub() {
    var xhttp = new XMLHttpRequest();
    var content = document.getElementById("content").value;
    var title = document.getElementById("title").value;
    let dates = new Date().toLocaleDateString();



    xhttp.open("POST", "/clubbed", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.send("dates=" + encodeURIComponent(dates) + "&club_name=" + encodeURIComponent(title) + "&club_description=" + encodeURIComponent(content));
}


// displays club
function getClub() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            var responseData = JSON.parse(this.responseText);
            var insert = document.getElementById("hide");
            insert.innerText = "";

            responseData.forEach(function (club) {
                var row = document.createElement('section');
                row.innerHTML = '<h2 class="titles">' + club.club_name + '<br><p class="contents">' + club.club_description + `<br><button id=${club.club_name} class="add" type=button onclick="addPersonClub()">Join Club</button>`;
                insert.appendChild(row);
            });
        }
    };

    xhttp.open("GET", "/getClub", true);
    xhttp.send();
}

function redirect() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {


            window.location.href = "/";
        }

    };
    xhttp.open("GET", "/redirect", true);
    xhttp.send();
}


function EventJoiner() {
    var xhttp = new XMLHttpRequest();
    var addButtons = document.getElementsByClassName('add');


    for (var i = 0; i < addButtons.length; i++) {

        addButtons[i].addEventListener('click', function (event) {
            var targetter = event.target.getAttribute('id');
            var targetted = event.target;
            targetted.innerText = "Event Joined!";
            targetted.style.backgroundColor = "lightgreen";



            xhttp.open("POST", "/EventJoiner", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("club_name=" + encodeURIComponent(targetter));
        });
    }
}


function showAddEvent() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {


            document.getElementById("hide").style.display = "none";

            document.getElementById("hidden").style.display = "block";


        }
    };
    xhttp.open("GET", "/showAddEvent", true);

    xhttp.send();
}

function addEvent() {
    var xhttp = new XMLHttpRequest();
    var content = document.getElementById("content").value;
    var title = document.getElementById("title").value;
    let dates = document.getElementById("event_date").value;
    let time = document.getElementById("event_time").value;
    let event_club = document.getElementById("event_club").value;



    xhttp.open("POST", "/addEvent", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.send("dates=" + encodeURIComponent(dates) + "&event_name=" + encodeURIComponent(title) + "&event_description=" + encodeURIComponent(content) + "&time=" + encodeURIComponent(time) + "&event_club=" + encodeURIComponent(event_club));
}





function memberEvent() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var responseData = (this.responseText);

            if (responseData === "User") {
                document.getElementById("EVENTS").style.display = "none";


            }


        }

    };
    xhttp.open("GET", "/memberEvent", true);
    xhttp.send();

}

function memberPost() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var responseData = (this.responseText);

            if (responseData === "User") {
                document.getElementById("EVENTS").style.display = "none";


            }


        }

    };
    xhttp.open("GET", "/memberPost", true);
    xhttp.send();

}


function getEvent() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var responseData = JSON.parse(this.responseText);
            var insert = document.getElementById("hide");
            insert.innerText = "";

            responseData.forEach(function (event) {
                var row = document.createElement('section');
                row.innerHTML = '<h2 class="titles">' + event.event_description + '</h2><p class="contents">' + event.event_name + '<p class="contents">' + event.event_date + '<p class="contents">' + event.event_time + `<button id=${event.event_name} class="add" type=button onclick="EventJoiner()">RSVP</button>`;
                insert.appendChild(row);
            });
        }
    };

    xhttp.open("GET", "/getEvent", true);
    xhttp.send();
}


function showUser() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let x = JSON.parse(this.responseText);


            document.getElementById("U").innerText = "Hi " + x.role + " " + x.user_nme;


        }
    };
    xhttp.open("POST", "/profile", true);
    xhttp.send();

}


function getProfile() {
    var xhttp = new XMLHttpRequest();
    var user = document.getElementById("username");
    var frst_nme = document.getElementById("first_name");
    var lst_nme = document.getElementById("last_name");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var dob = document.getElementById("dob");
    var course = document.getElementById("course");
    var password = document.getElementById("password");

    /* var dob_day = document.getElementById("dob_day").value;
     var dob_month = document.getElementById("dob_month").value;
     var dob_year = document.getElementById("dob_year").value;
     var course = document.getElementById("course").value;
       if (frst_nme === '' || lst_nme === '' || email === '' ||
       phone === '' || dob === '' || course === '' || password === ''
       || username === '' || password.length < 8){
         return;
             }
     */

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let x = JSON.parse(this.responseText);




            frst_nme.value = x[0].first_name;
            lst_nme.value = x[0].last_name;
            user.value = x[0].username;
            email.value = x[0].email;
            phone.value = x[0].phone;
            dob.value = x[0].dob;
            course.value = x[0].course;
            password.value = x[0].password;


        }
    };
    xhttp.open("GET", "/profiles", true);
    xhttp.send();
}


function set_profile() {
    var xhttp = new XMLHttpRequest();

    var user_name = document.getElementById("username").value;
    var first_name = document.getElementById("first_name").value;
    var last_name = document.getElementById("last_name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var dob = document.getElementById("dob").value;
    var course = document.getElementById("course").value;
    var password = document.getElementById("password").value;




    xhttp.open("POST", "/set_profile", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("first_name=" + encodeURIComponent(first_name) + "&last_name=" + encodeURIComponent(last_name) + "&email=" + encodeURIComponent(email) + "&phone=" + encodeURIComponent(phone) + "&dob=" + encodeURIComponent(dob) + "&course=" + encodeURIComponent(course) + "&password=" + encodeURIComponent(password) + "&username=" + encodeURIComponent(user_name));
}

function set_profile_manager() {
    var xhttp = new XMLHttpRequest();

    var user_name = document.getElementById("user_username").value;
    var first_name = document.getElementById("user_first_name").value;
    var last_name = document.getElementById("user_last_name").value;
    var email = document.getElementById("user_email").value;

    xhttp.open("POST", "/set_profile_manager", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("first_name=" + encodeURIComponent(first_name) + "&last_name=" + encodeURIComponent(last_name) + "&email=" + encodeURIComponent(email) + "&username=" + encodeURIComponent(user_name));
}

function twiter() {
    var title = document.getElementById("title").value;
    var body = document.getElementById("content").value;
    var date = document.getElementById("event_date").value;
    var time = document.getElementById("event_time").value;
    var url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent("Title: " + title + "\nDescription: " + body + "\nDate: " + date + "\nTime: " + time);
    document.getElementById("twitter").setAttribute("href", url);
}


function joinClub() {
    var xhttp = new XMLHttpRequest();

    let title = document.getElementById('title').value;

    xhttp.open("POST", "/joinClub", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("club_name=" + encodeURIComponent(title));
}


function addPersonClub() {
    var xhttp = new XMLHttpRequest();
    var addButtons = document.getElementsByClassName('add');

    for (var i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener('click', function (event) {
            var targetId = event.target.getAttribute('id');
            var targetted = event.target;
            targetted.innerText = "Club Joined!";
            targetted.style.backgroundColor = "lightgreen";

            xhttp.open("POST", "/addPersonClub", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("club_name=" + encodeURIComponent(targetId));
        });
    }
}



function joinEvent() {
    var xhttp = new XMLHttpRequest();


    xhttp.open("POST", "/joinEvent", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}



function showMember() {
    var xhttp = new XMLHttpRequest();
    var club_name = document.getElementById("club_name").value;
    // console.log(club_name);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            var responseData = JSON.parse(this.responseText);

            var insert = document.getElementById("hide");
            insert.innerText = "Members in Club: " + club_name;

            responseData.forEach(function (user) {
                var row = document.createElement('section');
                row.innerHTML = '<h2 class="titles">' + user.first_name + " " + user.last_name;
                insert.appendChild(row);
            });
        }
    };

    xhttp.open("POST", "/showMember", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("&club_name=" + encodeURIComponent(club_name));
}



function managerEvent() {
    var xhttp = new XMLHttpRequest();
    var club_name = document.getElementById("member_event").value;
    // console.log(club_name);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            var responseData = JSON.parse(this.responseText);

            var insert = document.getElementById("hide");
            insert.innerText = "Members particpating in event:  " + club_name;

            responseData.forEach(function (user) {
                var row = document.createElement('section');
                row.innerHTML = '<h2 class="titles">' + user.first_name + " " + user.last_name;
                insert.appendChild(row);
            });
        }
    };

    xhttp.open("POST", "/managerEvent", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("&club_name=" + encodeURIComponent(club_name));
}


// Admin page
function ban_user() {
    var xhttp = new XMLHttpRequest();
   // var user = document.getElementById("user_id").value;
    var username = document.getElementById("user_username").value;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (username === 'No username found') { document.getElementById("user_notice").innerText = "No user found to ban"; } else { document.getElementById("user_notice").innerText = "User: " + username + " banned"; }
        }
    };
    xhttp.open("POST", "/user_banned", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("username=" + encodeURIComponent(username));
}

function delete_post() {
    var xhttp = new XMLHttpRequest();
   // var post_id = document.getElementById("post_id").value;
    var post_name = document.getElementById("post_name").value;

    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            if (post_name === 'No post name found') {
                document.getElementById("post_notice").innerText = "No post found to delete";
            } else {
                document.getElementById("post_notice").innerText = "Post: " + post_name + " deleted";
            }
        }
    };

    xhttp.open("POST", "/post_deleted", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("post_name=" + encodeURIComponent(post_name));
}

function admin_edit_post() {
    var xhttp = new XMLHttpRequest();
    var post_name = document.getElementById("post_name").value;
    var post_content = document.getElementById("post_content").value;
    var post_id = document.getElementById("post_id").value;

    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            if (post_name === 'No post name found') {
                document.getElementById("post_notice").innerText = "No post found to update";
            } else { document.getElementById("post_notice").innerText = "Post: " + post_name + " updated"; }
        }
    };

    xhttp.open("POST", "/admin_edit_post", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("post_name=" + encodeURIComponent(post_name) + "&post_content=" + encodeURIComponent(post_content) + "&post_id=" + encodeURIComponent(post_id));
}

function admin_edit_user() {
    var xhttp = new XMLHttpRequest();
    var username = document.getElementById("user_username").value;
    var first_name = document.getElementById("user_first_name").value;
    var last_name = document.getElementById("user_last_name").value;
    var email = document.getElementById("user_email").value;
    var user_id = document.getElementById("user_id").value;
    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            if (username === 'No username found') { document.getElementById("user_notice").innerText = "No user found to update"; } else { document.getElementById("user_notice").innerText = "User: " + username + " updated"; }
        }
    };

    xhttp.open("POST", "/admin_edit_user", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("username=" + encodeURIComponent(username) + "&first_name=" + encodeURIComponent(first_name) + "&last_name=" + encodeURIComponent(last_name) + "&email=" + encodeURIComponent(email) + "&user_id=" + encodeURIComponent(user_id));
}


function delete_club() {
    var xhttp = new XMLHttpRequest();
    // var club_id = document.getElementById("club_id").value;
    var club_name = document.getElementById("club_name").value;

    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            if (club_name === 'No club name found') {
                 document.getElementById("club_notice").innerText = "No club found to delete";
        } else {
                document.getElementById("club_notice").innerText = "Club: " + club_name + " deleted";
            }
        }
    };

    xhttp.open("POST", "/club_deleted", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("club_name=" + encodeURIComponent(club_name));
}

function admin_edit_club() {
    var xhttp = new XMLHttpRequest();
    var club_name = document.getElementById("club_name").value;
    var club_description = document.getElementById("club_description").value;
    var club_id = document.getElementById("club_id").value;

    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            if (club_name === 'No club name found') {
                document.getElementById("club_notice").innerText = "No club found to update";
            } else {
                document.getElementById("club_notice").innerText = "Club: " + club_name + " updated";
            }
        }
    };

    xhttp.open("POST", "/admin_edit_club", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("club_name=" + encodeURIComponent(club_name) + "&club_description=" + encodeURIComponent(club_description) + "&club_id=" + encodeURIComponent(club_id));
}

function editing_club() {
    const editing_club_name = document.getElementById("club_name");
    const editing_club_description = document.getElementById("club_description");
    editing_club_name.removeAttribute("readonly");
    editing_club_description.removeAttribute("readonly");
    document.getElementById("club_notice").innerText = "Editing club fields enabled";
    document.getElementById("search_club_details").addEventListener('input', () => {
        document.getElementById("club_notice").innerText = "";
    });
}

function editing_post() {
    const editing_post_name = document.getElementById("post_name");
    const editing_post_content = document.getElementById("post_content");
    editing_post_name.removeAttribute("readonly");
    editing_post_content.removeAttribute("readonly");
    document.getElementById("post_notice").innerText = "Editing post fields enabled";
    document.getElementById("search_club_posts").addEventListener('input', () => {
        document.getElementById("post_notice").innerText = "";
    });
}

function editing_user() {
    const editing_username = document.getElementById("user_username");
    const editing_first_name = document.getElementById("user_first_name");
    const editing_last_name = document.getElementById("user_last_name");
    const editing_email = document.getElementById("user_email");
    editing_username.removeAttribute("readonly");
    editing_first_name.removeAttribute("readonly");
    editing_last_name.removeAttribute("readonly");
    editing_email.removeAttribute("readonly");
    document.getElementById("user_notice").innerText = "Editing user fields enabled";
    document.getElementById("search_user_details").addEventListener('input', () => {
        document.getElementById("user_notice").innerText = "";
    });
}

function promoteAdmin() {
    var xhttp = new XMLHttpRequest();
    var user_name = document.getElementById("user_username").value;


    xhttp.open("POST", "/promoteAdmin", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("user_name=" + encodeURIComponent(user_name));
}


function management() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var responseData = (this.responseText);

            if (responseData === "clubmanager") {

            let maindiv=document.getElementById("changedddd");
                    maindiv.innerHTML=`<div onclick="nav1()" class="navigation_div"><p class="styled">Clubs</p></div>
                    <div onclick="nav2()" class="navigation_div"><p class="styled">Profile</p></div>
                    <div onclick="nav3()" class="navigation_div"><p class="styled">Events</p></div>
                    <div onclick="nav4()" class="navigation_div"><p class="styled">Forum</p></div>
                    <div onclick="nav5()" class="navigation_div"><p class="styled">Club Manager Settings</p></div>`;
            } else if (responseData === "admin") {

                let maindiv=document.getElementById("changedddd");

                maindiv.innerHTML=`<div onclick="nav1()" class="navigation_div"><p class="styled">Clubs</p></div>
                <div onclick="nav2()" class="navigation_div"><p class="styled">Profile</p></div>
                <div onclick="nav3()" class="navigation_div"><p class="styled">Events</p></div>
                <div onclick="nav4()" class="navigation_div"><p class="styled">Forum</p></div>
                <div onclick="nav5()" class="navigation_div"><p class="styled">Club Manager Settings</p></div>
                <div onclick="nav6()" class="navigation_div"><p class="styled">System Admin Settings</p></div>`;

            }


        }

    };
    xhttp.open("GET", "/memberEvent", true);
    xhttp.send();

}
