var user;
function get_info(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            user = JSON.parse(this.responseText);
            let welcome=``;

            welcome = `Welcome ${user.username}`;

            document.getElementById("welcome").innerHTML=welcome;

            console.log("Current User: " + JSON.stringify(user));
            // set the user info to modal
            document.getElementById("user_name").value = user.username;
            document.getElementById("email").value = user.email;

            document.getElementById("given_name").value = user.given_name;
            document.getElementById("family_name").value = user.family_name;
            document.getElementById("DOF").value = user.date_of_birth;
            document.getElementById("contact_number_input").value = user.contact_number;
            document.getElementById("genderinput").value = user.gender;
        }

    };
    xmlhttp.open("GET", "/users/load_info", true);
    xmlhttp.send();
}

// When the user clicks the button, open the modal
function pop_up() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function x_close() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// When the user clicks the button, open the modal
function pop_up_history() {
    var modal = document.getElementById("myModal_history");
    modal.style.display = "block";
    load_history();
}

// When the user clicks on <span> (x), close the modal
function x_close_history() {
    var modal = document.getElementById("myModal_history");
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.getElementById("myModal_history");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};



// When the user clicks the button, open the modal
function pop_up_Account() {
    var modal = document.getElementById("myModal_account");
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function x_close_Account() {
    var modal = document.getElementById("myModal_account");
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.getElementById("myModal_account");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

function logout() {


    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            window.location.replace("/login.html");
        } else{
            window.location.replace("/login.html");
        }
    };
    xmlhttp.open("POST", "/users/logout", true);
    xmlhttp.send();

}

function check_in(){

    let c = {
        code: document.getElementById("check_in").value
    };

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            window.location.replace("/users/main.html");
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Checkin failed");
            window.location.replace("/users/main.html");
        }
    };
    xmlhttp.open("POST", "/users/checkin", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(c));
}

function load_history(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            rows = JSON.parse(this.responseText);
            let history=``;

            for(let row of rows){
                history = history + `<tr>
                                <td>${row.username}</td>
                                <td>${row.date}</td>
                                </tr>`;
            }
            document.getElementById("history_table").innerHTML=history;
        }

    };
    xmlhttp.open("GET", "/users/history", true);
    xmlhttp.send();
}


//update account
function update_acc(){

    let c = {
        uname: document.getElementById("user_name").value,
        mail: document.getElementById("email").value,

        gname: document.getElementById("given_name").value,
        fname: document.getElementById("family_name").value,
        dobirth:document.getElementById("DOF").value,
        phone: document.getElementById("contact_number_input").value,
        gener_n: document.getElementById("genderinput").value,
        userid: user.u_id
    };

    console.log("Update C: " + JSON.stringify(c));

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            alert("Update successfully!");
        }
    };
    xmlhttp.open("POST", "/users/update_info", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(c));
}

function goto_map(){
    window.location.replace("/users/mapPage.html");
}