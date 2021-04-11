function LoginScreen()//uiController,templates,editor
{
 var error=[];
let eventController=(function(){//uiController,templates,editor
      let locators=uiController.locatorUpdate();
   locators.SignUp.addEventListener('click',()=>{
           window.removeEventListener('keypress',displayMessage.keyHandler) ;  
          window.history.pushState({},null,'register');
          locators.container.innerHTML=router.routes[window.location.pathname].template;
         



           window.onload();
        })
    locators.Login.addEventListener('click',async ()=>{
      locators.LoginEmail.style.border="transparent";
          locators.LoginPassword.style.border="transparent";
       error=[]; 
    	 loginUser();

      

    })    

     locators.ResetScrn.addEventListener('click',()=>{
        window.removeEventListener('keypress',displayMessage.keyHandler)   
       window.history.pushState({},null,'/reset');
       locators.container.innerHTML=templates['reset'];
       uiController.locatorUpdate();
       router.routes[window.location.pathname]['path']();

     })
     displayMessage.keyHandler=keyHandler;
     window.addEventListener('keypress',displayMessage.keyHandler);
     
     async function loginUser()
     {
       if(locators.SuccessBanner!==null)
          {
             locators.LoginEmail.style.border="transparent";
          locators.LoginPassword.style.border="transparent";
       error=[]; 
            locators.SuccessBanner.style.display='none';

          }

       if(locators.LoginEmail.value==='' || locators.LoginEmail.value.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/img)===-1) 
       {
        
         locators.LoginEmail.style.border="0.5px solid red";
         error.push('Valid email ');
       }  
        if(locators.LoginPassword.value==='')
       {
        locators.LoginPassword.style.border="0.5px solid red";
         
          error.push('Password ')
       }
       if(error.length>0)
       {
         let errorMessage="";
         error.forEach((message,index)=>{
           if(index>0)
           {
             errorMessage+=' and '+message;
           }
           else
           {
              errorMessage+=message;
           }
         })
         errorMessage+=" required";
         displayMessage.errorDisplay(errorMessage);
       }
       else
       {
         
       
       displayMessage.spinnerDisplay();
        try
        {
      let data= await $.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=Your firebase api key',
       {email:locators.LoginEmail.value,password:locators.LoginPassword.value,returnSecureToken:true}).done((data)=>{
        
        return data;
       })
       window.removeEventListener('keypress',displayMessage.keyHandler)   
       locators.container.innerHTML=templates['editor'];
         window.history.pushState({},null,'/edit');
         uiController.locatorUpdate();

         router.routes[window.location.pathname]['path']({token:data.idToken,refreshToken:data.refreshToken,refreshTime:parseInt(new Date().getTime()/1000)}); //uiController,templates,editor,
          
      }
      catch(error)
      { 
      console.log(error);
         try
         { 
          console.log(displayMessage.messageRespnse(error.responseJSON.error.errors[0].message));
         displayMessage.errorDisplay(displayMessage.messageRespnse(error.responseJSON.error.errors[0].message))
         }
       catch(error)
       {
         displayMessage.errorDisplay('An unknown error occured');
       }
      } 
      displayMessage.spinnerHide();
     }
    } 
  function keyHandler(e)
  {
   
      if(e.keyCode===13 || e.which===13)
      {
        
        loginUser();
      }
  }
     })
	();//uiController,templates,editor
}