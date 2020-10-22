var fname = [];
var lname = [];
var username = [];
var password = [];
var tasks = [];
var answers = [];
var block = [];
var date = [];
var x = [];
var now = new Date();

setInterval(function () {
    now = new Date();
}, 6000);

$(document).on('click', '.signup', function() {
    var check = true;
    var today = new Date;
    $("#error").html("<li>WRONG ACTION</li>");
    for (var i = 0; i < username.length; i++) {
        if (username[i] === $("#usname").val()) {
            $("#error").append("<li>THIS NAME HAS RESERVATE</li>");
            check = false;
        }
    }
    if ($("#psw").val() !== $("#psw-repeat").val() || !$("#psw").val()) {
        $("#error").append("<li>WRONG PASSWORD</li>");
        check = false;
    }
    if ($("#psw").val().length < 8) {
        $("#error").append("<li>PASSWORD IS TOO SHORTLY</li>");
        check = false;
    }
    if (!check) {
        return 0;
    }
    fname.push($("#fname").val());
    lname.push($("#lname").val());
    username.push($("#usname").val());
    password.push($("#psw").val());
    tasks.push($("#task").val());
    answers.push($("#answer").val());
    date.push(today);
    block.push(1);
    x.push(0);
    $("fieldset").hide();
    $("body").append("<h1 id='reg'>SUCCESS</h1>");
}),

$(document).on('click', '.signin', function() {
    var check = true;
    $("#error").html("<li>WRONG ACTION</li>");
    for (var i = 0; i < username.length; i++) {
        if (username[i] === $("#username").val()) {
            if (password[i] === $("#password").val() && block[i]) {
                $("fieldset").hide();
                $("body").append("<h1 id='reg'>Welcome, " + lname[i] + " " + fname[i] + " " + "today is" + " " + date[i] + "</h1>");
                if ((now - date[i]) > 20000) {
                    date[i] = new Date();
                    var pass = prompt('PASSWORD REGISTRATION IS OUT');
                    password[i] = pass;
                }
                $(".sin, .sup").hide();
                $("header").append('<button class="sout">SIGN OUT</button>');
                return 0;
            } else if (x[i] >= 3 || !block[i]) {
                alert("YOUR ACCOUNT IS BLOCKED");
                t = confirm("REESTABLISH?");
                if (t) {
                    block[i] = 1;
                    x[i] = 0;
                    $("#error").html("");
                    $("#error").append("<li id=gr>YOUR ACCOUNT HAS REESTABLISH</li>");
                    forgot()
                };
            }
            else {
                x[i]++;
                check = false;
            }
            break;
        }
    }
    $("#error").append("<li>WRONG USER OR PASSWORD</li>");
}),

$(document).on('click', '.forgot', function() {
    forgot();
}),

$(document).on('click', '.sin, .sout', function() {
    $("fieldset, .sin, .sup").show();
    $("h1, .sout").remove();
    $("h2").text("SIGN IN");
    $("fieldset").html('<legend>INFORMATION</legend>' +
    '<label>Login:</label>' +
    '<input id="username"><br><br>' +
    '<label>Password:</label>' +
    '<input type="password" id="password"><br><br>' +
    '<div><input class="signin" type="submit" value="SIGN IN">' +
    '<input class="forgot" type="submit" value="RESET PASSWORD"></input></div>' +
    '<ul id="error"></ul>');
}),

$(document).on('click', '.sup', function() {
    $("fieldset").show();
    $("h1").remove();
    $("h2").text("Registration");
    $("fieldset").html('<legend>INFORMATION PANEL</legend>' +
        '<label>Name:</label>' +
        '<input type="text" id="fname"><br><br>' +
        '<label>Surname:</label>' +
        '<input type="text" id="lname"><br><br>' +
        '<label>Login:</label>' +
        '<input id="usname"><br><br>' +
        '<label>Password:</label>' +
        '<input type="password" id="psw"><br><br>' +
        '<label>Confirm Password:</label>' +
        '<input type="password" id="psw-repeat"><br><br>' +
        '<label>Secret question:</label>' +
        '<input type="text" id="task"><br><br>' +
        '<label>Answer:</label>' +
        '<input type="text" id="answer"><br><br>' +
        '</label><br />Choose your gender:<label><br />' +
        ' <input id="okay1" type="radio" name="pol" />Female' +
        ' <input id="okay2" type="radio" name="pol" />Male' +
        '<div><input class="signup" type="submit" value="Register my account"></div>' +
        '<ul id="error"></ul>');
});

function refresh(){
                    window.location.reload();
                }

var forgot = function() {
    var login = prompt('Enter your LOGIN')
    var inx = username.indexOf(login)
    var contr_answer = prompt(tasks[inx]);
    if (contr_answer === answers[inx]) {
        var pass = prompt('Enter new PASS');
        alert('You have new PASSWORD')
    } 
    else {
        alert('Wrong Answer');
    }
    password[inx] = pass;
}
