// ===============================
//  STRANGE WORLD SECURE SCRIPT
// ===============================


// -------- OFUSCACIÓN EMAILJS --------


const _a = [
    85,71,68,55,108,51,110,76,
    55,86,107,101,121,117,53,68,51
];


const _service = [
    115,101,114,118,105,99,101,
    95,111,121,119,55,107,100,97
];


const _registerTemplate = [
    116,101,109,112,108,97,116,
    101,95,101,99,49,118,116,107,113
];


const _recoveryTemplate = [
    116,101,109,112,108,97,116,
    101,95,53,121,109,57,103,104,98
];


const EMAIL_PUBLIC_KEY =
String.fromCharCode(..._a);


const EMAIL_SERVICE =
String.fromCharCode(..._service);


const TEMPLATE_REGISTER =
String.fromCharCode(..._registerTemplate);


const TEMPLATE_RECOVERY =
String.fromCharCode(..._recoveryTemplate);



(function(){

    emailjs.init(EMAIL_PUBLIC_KEY);

})();





// -------- URL OCULTA --------


const _download = [

104,116,116,112,115,58,47,47,
103,105,116,104,117,98,46,99,111,109

];


const DOWNLOAD_URL =
String.fromCharCode(..._download);





// -------- VARIABLES --------


let generatedOTP = null;

let currentUser = null;





// ===============================
// DATABASE BASE64
// ===============================


function loadUsers(){


    const data =
    localStorage.getItem("UsersDB");


    if(!data)
        return [];


    try{


        return JSON.parse(
            atob(data)
        );


    }catch(e){

        return [];

    }

}





function saveUsers(users){


    localStorage.setItem(

        "UsersDB",

        btoa(
            JSON.stringify(users)
        )

    );


}





// ===============================
// UI
// ===============================


function switchView(id){


    document
    .querySelectorAll(".auth-card")
    .forEach(card=>{

        card.classList.add("hidden");

    });


    document
    .getElementById(id)
    .classList.remove("hidden");

}





// ===============================
// LOGIN
// ===============================


function goToPassword(){


    const value =
    document.getElementById("id-input").value.trim();


    if(!value)
        return alert("Enter credentials");


    document
    .getElementById("target-display")
    .innerText=value;


    switchView("view-pass");

}





function finalizeLogin(){


    const user =
    document.getElementById("id-input")
    .value;


    const users = loadUsers();


    const found =
    users.find(u=>

        u.username===user

    );



    if(found){


        currentUser=found;

        unlockVault(found.username);


    }else{


        unlockVault(user);


    }


}





// ===============================
// REGISTER EMAIL
// ===============================


function sendRegisterCode(){


    const email =
    document.getElementById("reg-mail")
    .value;


    if(!email)
        return alert("Email required");



    generatedOTP =
    Math.floor(
        100000+
        Math.random()*900000
    ).toString();




    const params={

        to_email:email,

        verification_code:
        generatedOTP

    };



    emailjs.send(

        EMAIL_SERVICE,

        TEMPLATE_REGISTER,

        params

    )
    .then(()=>{


        document
        .getElementById("btn-send-reg")
        .classList.add("hidden");


        document
        .getElementById("reg-verify")
        .classList.remove("hidden");



    })
    .catch(err=>{


        alert(
        "Email error"
        );


        console.log(err);


    });



}





function verifyRegisterCode(){


    const code =
    document
    .getElementById("reg-otp")
    .value;



    if(code!==generatedOTP)

        return alert(
        "Invalid code"
        );



    const username =
    document
    .getElementById("reg-user")
    .value;



    const email =
    document
    .getElementById("reg-mail")
    .value;



    const birth =
    document
    .getElementById("reg-birth")
    .value;




    if(!birth)

        return alert(
        "Birth date required"
        );




    const users =
    loadUsers();



    users.push({

        username,

        email,

        birth,

        created:
        Date.now()

    });



    saveUsers(users);



    currentUser={

        username,

        birth,

        email

    };



    unlockVault(username);



}





// ===============================
// GOOGLE LOGIN
// ===============================


function handleGoogle(response){


    const data =
    JSON.parse(
        atob(
        response.credential.split(".")[1]
        )
    );


    unlockVault(
        data.given_name
    );


}





// ===============================
// VAULT
// ===============================


function unlockVault(name){


    document
    .getElementById("auth-system")
    .style.display="none";


    document
    .getElementById("vault-ui")
    .classList.add("unlocked");



    document
    .getElementById("user-display")
    .innerText=
    name.toUpperCase();



    createDownloadArea();


}





function logout(){

    location.reload();

}





// ===============================
// AGE CONTROL IARC 7+
// ===============================


function calculateAge(date){


    const birth =
    new Date(date);


    const today =
    new Date();



    let age =
    today.getFullYear()
    -
    birth.getFullYear();



    const month =
    today.getMonth()
    -
    birth.getMonth();



    if(
        month<0 ||
        (
            month===0 &&
            today.getDate()<birth.getDate()
        )
    ){

        age--;

    }


    return age;

}





function createDownloadArea(){


    const area =
    document.getElementById(
        "dynamicDownloadArea"
    );


    area.innerHTML="";



    if(!currentUser || !currentUser.birth){


        area.innerHTML=

        `
        <div class="age-denied">

        AGE DATA REQUIRED

        </div>
        `;


        return;

    }



    const age =
    calculateAge(
        currentUser.birth
    );



    if(age>=7){



        const btn =
        document.createElement("button");


        btn.className=
        "download-btn";


        btn.innerText=
        "DOWNLOAD SETUP.EXE";



        btn.onclick=function(){


            window.location.href=
            DOWNLOAD_URL;


        };



        area.appendChild(btn);



    }else{


        area.innerHTML=

        `

        <div class="age-denied">

        ACCESS DENIED<br>

        IARC 7+ REQUIREMENT NOT MET

        </div>

        `;


    }



}





// ===============================
// RECOVERY PASSWORD
// ===============================


function sendRecoveryCode(){


    const email =
    document.getElementById(
        "recover-mail"
    ).value;



    if(!email)

        return alert(
        "Email required"
        );



    const code =
    Math.floor(
    100000+
    Math.random()*900000
    );



    emailjs.send(

        EMAIL_SERVICE,

        TEMPLATE_RECOVERY,

        {

            to_email:email,

            verification_code:code

        }

    );



    alert(
    "Recovery code sent"
    );



}
