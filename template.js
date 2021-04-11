templates={
    'root':`
   <div class='login-wrapper'>
    <div class="login">
    <div class="login__header">
      <h2 class="login__header--heading">JSEditor</h2>
      <p class="login__header--headingDesc">Online JSEditor</p>
      

    </div>
    <div class="successBanner">
          <p class="successBanner--description" >Registered Sucessfully Login to continue</p>
      </div>
    <div class="login__form">
      <p class="login__form--heading">User Login</p>
      <div class="login__form--wrapper">
        <input type="text" name="Username" class="usernameL" placeholder="Email" autocomplete="off">
        <input type="password" name="Password"
           class="passwordL" placeholder="Password" autocomplete="off">
           </div>
        <p class="registerUser">New User?<span class="SignUp">Sign Up</span>  </p>
        <p class="forgotPass">Forgot  Password ?</p>
       
      </div>
      <div class="submitForm">
        <button class="submitFormbtn">Login</button>
      </div>


    </div>
    </div>
    `
    ,
    'reset':
           `<div class='login-wrapper'>
    <div class="loginReset" >
    <div class="login__header" >
      <h2 class="login__header--heading">JSEditor</h2>
      <p class="login__header--headingDesc">Online JSEditor</p>

    </div>
    <div class="login__form" style="margin-top:2.5vh">
      
      <div class="login__form--wrapper" >
        <p class="login__form--heading"  >Password Reset</p>
        <input type="text" name="Username" class="username" placeholder="Email"  autocomplete="off" style="margin:0px">
     
        
      </div>
      <div class="submitForm"  style="margin-top:4.5vh">
        <button class="submitFormReset">Reset</button>
      </div>


    </div>
    </div>`
    ,
    'reg':
    `<div class='login-wrapper'>
    <div class="login">
    <div class="login__header">
      <h2 class="login__header--heading">JSEditor</h2>
      <p class="login__header--headingDesc">Online JSEditor</p>

    </div>
    <div class="login__form">
      <p class="login__form--heading">Register</p>
      <div class="login__form--wrapper">
      <input type="text" name="name" class="nameUser" placeholder="Name" autocomplete="off"  >
        <input type="text" name="Username" class="username" placeholder="Email"  autocomplete="off">
        <input type="password" name="Password"
           class="password" placeholder="Password" autocomplete="off">
           </div>
        
      </div>
      <div class="submitForm">
        <button class="submitFormReg">Sign Up</button>
      </div>


    </div>
    </div>`
    ,
   'editor':`<div class="header ">
    <div class="header__headingWrapper flexrow ">
      <h4 class="header__heading">Give Me Some Name!</h4>

      <span class="hamburger">
        <div class="ham"></div>
        <div class="ham"></div>
        <div class="ham"></div>

      </span>
    </div>
    <div class="header__headerOptions ">
   
      <button class="header__Save"><i class="fas fa-cloud"></i>Save</button>
      <button class="header__Load"><i class="fas fa-cloud"></i>Load Project</button>
      <button class="header__New"><i class="fas fa-plus"></i>New Project</button>
     
      <button class="header__Logout"><i class="fas fa-sign-out-alt"></i>Logout</button>

     
      </div>

    </div>


    <div class="contentArea">
       <div class="contentArea__editor">
      <div class="contentArea__html">
        <li class="contentArea__html--heading">HTML</li>
        <div id="htmlEditor">

        </div>
      </div>
      <div class="contentArea__CSS edits">
        <li class="contentArea__CSS--heading">CSS</li>
         <div id="cssEditor">
          
         </div>
      </div>
      <div class="contentArea__JS edits">
        <li class="contentArea__JS--heading">JS</li>

         <div id="jsEditor">
          
         </div>
      </div>
    </div>  
    <div class="contentArea__result">
        <li class="contentArea__result--heading">Result <button class="View">New Window</button></li>
        <div class="frame-wrapper">
        <iframe id="result" name="" frameborder="0" ></iframe>
        </div>
      </div>
      
            
    </div>` ,
    projectName:`<p class="popup__heading">Project Name</p>
        <input type="text" class="popup__input" placeholder="My Awesome Project">
        <button class="saveName">Done</button>`
        ,
    projectData:`
               <p  class="popupContent__heading">Select Project</p>  
              <div class="wrapProject">
          
             <div class="flexd heading">
             <p>Name</p>
             <p>Last Modified</p>
             </div>
             
             
        </div>
`    
        ,htmlTemp:` 
        <div class=" projectWrapper">
        <div class="flexd projectItem">
        <p>@Name</p>
        <p>@time</p>
            </div>
        <button class="deletBtn" id="@id" title="Delet Project"><i class="far fa-trash-alt"></i></button>      
          </div>  
            `
           ,
           'LogHtml':`<div class="con-wrapper">
                      <button class="console-display" onclick="shows()">
                       <p class="console__heading">Console</p>
                       <p class="fas fa-exclamation-circle">!</p>
                       </button>
                       <div class="log-disp">
        
                      </div>
                      </div>`
           ,
           'LogCSS':`.con-wrapper{
                     position: fixed;
                     bottom: 0;
                     left: 0;
                     right:0;

                    }
                   .console-display{
                    width: 100%;
                     cursor:pointer;  
                    margin:0px;
                    padding:0px;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    height:20px;
                    padding:0em 0.2em;
                    }
                   .fa-exclamation-circle{
                    color:white;
                    width:15px;
                    height:15px;
                    background-color:red ;
                    border-radius:50%;
            
                    display:none;


                    }
                    .console__heading{
                     color:black !important;
                     }
                     .log-disp{
                     
                      display: none;
                      width:100%;
                     height:30vh;
                      overflow:auto;
                      background-color:black;
                      margin:0px;
                      padding:0px;
                     

  
                    }
                    .log-disp>p{
                     margin:0px;
                     padding:0em 0.35em;
                      color:white !important;

                     }
                    .showlog{
                     display: block;
                     }
                     
                     }
                     `

                    
                     ,
    'spinner':`<div class="loadingio-spinner-spinner-s2pg4bnp2s8"><div class="ldio-q9tbp963vv">
<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
</div></div>
<style type="text/css">
@keyframes ldio-q9tbp963vv {
  0% { opacity: 1 }
  100% { opacity: 0 }
}
.ldio-q9tbp963vv div {
  left: 94px;
  top: 48px;
  position: absolute;
  animation: ldio-q9tbp963vv linear 1s infinite;
 /* background: #314452;*/
  width: 12px;
  height: 24px;
  border-radius: 6px / 12px;
  transform-origin: 6px 52px;
}.ldio-q9tbp963vv div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -0.9166666666666666s;
  background: #ccd9ff;
}.ldio-q9tbp963vv div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -0.8333333333333334s;
  background: #ccd9ff;
}.ldio-q9tbp963vv div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.75s;
  background: #ccd9ff;
}.ldio-q9tbp963vv div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.6666666666666666s;
  background: #ccd9ff;
}.ldio-q9tbp963vv div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.5833333333333334s;
  background: #ccd9ff;
}.ldio-q9tbp963vv div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.5s;
  background: #ccd9ff;
}.ldio-q9tbp963vv div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.4166666666666667s;
  background: #ccd9ff;
}.ldio-q9tbp963vv div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.3333333333333333s;
  background: #ccd9ff;
}.ldio-q9tbp963vv div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.25s;
  background: #ccd9ff;
}.ldio-q9tbp963vv div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.16666666666666666s;
  background: #ccd9ff;
}.ldio-q9tbp963vv div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.08333333333333333s;
  background: #ccd9ff;
}.ldio-q9tbp963vv div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
  background: #ccd9ff;
}
.loadingio-spinner-spinner-s2pg4bnp2s8 {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  /*background: #f1f2f3;*/
}
.ldio-q9tbp963vv {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-q9tbp963vv div { box-sizing: content-box; }
/* generated by https://loading.io/ */
</style>`
  }
