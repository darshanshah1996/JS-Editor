var net=require("ace/lib/net");
var old=window.console;

const initialHeight=window.innerHeight;

 document.documentElement.style.setProperty('overflow', 'auto')
 const metaViewport = document.querySelector('meta[name=viewport]')
 metaViewport.setAttribute('content', 'height=' + initialHeight + 'px, width=device-width, initial-scale=1.0');



let router=(function(templates){

  let routes={
     '/':{path:LoginScreen,template:templates['root']},
     '/edit':{path:EditorScreen,template:templates['editor']},
     '/register':{path:RegisterScreen,template:templates['reg']},
     '/reset':{path:ResetScreen,template:templates['reset']}
  }

  return{
    routes:routes
  }
})(templates);
let uiController = (function() {
 
 let locators;
  function locatorUpdate()
  { 
  locators = {
    hamberger: document.querySelector(".hamburger"),
    headerOptions: document.querySelector(".header__headerOptions"),
    iframe:document.querySelector("#result"),
    container:document.querySelector('.container'),
    SignUp:document.querySelector('.SignUp'),
    Register:document.querySelector('.submitFormReg'),
    SignUpName:document.querySelector('.nameUser'),
    SignUpEmail:document.querySelector('.username'),
    SignUpPassword:document.querySelector('.password'),
    ErrorWrapper:document.querySelector('.errorWarning'),
    ErrorMessage:document.querySelector('.errorMessage'),
    SpinnerWrapper:document.querySelector('.spinnerWrapper'),
    SuccessBanner:document.querySelector('.successBanner'),
    LoginEmail:document.querySelector('.usernameL'),
    LoginPassword:document.querySelector('.passwordL'),
    Login:document.querySelector('.submitFormbtn'),
    LogOut:document.querySelector('.header__Logout'),
    Save:document.querySelector('.header__Save'),
    Load:document.querySelector('.header__Load'),
    projectName:document.querySelector('.header__heading'),
    Popup:document.querySelector('.popupWrapper'),
    ClosePopUp:document.querySelector('.closePopup'),
    SaveProject:document.querySelector('.saveName'),
    ProjectName:document.querySelector('.popup__input'),
    NewProject:document.querySelector('.header__New'),
    PopupContent:document.querySelector('.popupContent'),
    View:document.querySelector('.View'),
    HTMLEditor:document.querySelector('#htmlEditor'),
    CSSEditor:document.querySelector('#cssEditor'),
    JSEditor:document.querySelector('#jsEditor'),
    ResetScrn:document.querySelector('.forgotPass'),
    ResetPass:document.querySelector('.submitFormReset'),
    Banner:document.querySelector('.successBanner--description')


  };
  return locators;
 } 
locatorUpdate();
locators.SpinnerWrapper.innerHTML=templates['spinner'];

  return {
   
    locatorUpdate:locatorUpdate  
  };
})();

locators=uiController.locatorUpdate();
 displayMessage={
  
 errorDisplay:function(message,colorBacground="#e60000") 
            { 
            locators.ErrorWrapper.style.display='flex';
            locators.ErrorWrapper.style.backgroundColor=colorBacground;
            locators.ErrorMessage.textContent=message;

              setTimeout(()=>{
             locators.ErrorWrapper.style.display='none';
             },1550) 

            } ,
  spinnerDisplay:function()
                {
                 locators.container.style.display='none';
                 locators.Popup.style.display='none';
                  locators.SpinnerWrapper.style.display='grid'
                  
                },
   spinnerHide:function()
                {
                  locators.container.style.display='block';
                  locators.SpinnerWrapper.style.display='none'
                  
                },

    popupShow:function()
    {
      locators.Popup.style.display='grid';
      locators.ClosePopUp.addEventListener('click',()=>{
        locators.Popup.style.display='none';
      })
    } ,           
   messageRespnse:function(message)
                  {
                    switch(message)
                      {
                       case 'EMAIL_EXISTS':return 'User already registered';
                       case 'OPERATION_NOT_ALLOWED':return 'Password sign in disabled';
                      case 'TOO_MANY_ATTEMPTS_TRY_LATER':return 'Attemp limit exceeded.Please try later';
                      case 'EMAIL_NOT_FOUND':return 'Invalid Credtenials';
                      case 'INVALID_PASSWORD':return 'Invalid Credentials';
                      case 'USER_DISABLED':return 'Account Locked.Please try later';
                      default:return 'An unknown error occured';

                      }
                  }                         

          

  } 
let eventController = (function() {//uiController,templates,router,editor
 

window.onload=function(){
   
  
    if(router.routes[window.location.pathname]!==undefined)
    {

      uiController.locatorUpdate().container.innerHTML=router.routes[window.location.pathname].template;
      
      router.routes[window.location.pathname]['path']();//uiController,templates,editor,displayMessage
    }
    else
    {
         
        window.history.pushState({},null,'/');
        window.onload();
       
    }
  }
window.addEventListener('popstate',()=>{
    window.removeEventListener('keypress',displayMessage.keyHandler) ;
   
  window.onload();
})


 

})();//uiController,templates,router,editor





































