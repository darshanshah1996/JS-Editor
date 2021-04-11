function RegisterScreen()//uiController,templates,editor,displayMessage
{
  let error=[];
let registerScreen=	( function(){//uiController,templates,displayMessage
	
    let locators=uiController.locatorUpdate();
 displayMessage.keyHandler=keyHandler;
    window.addEventListener('keypress', displayMessage.keyHandler);

	uiController.locatorUpdate().Register.addEventListener('click',async ()=>{
   locators.SignUpName.style.border='transparent';
   locators.SignUpEmail.style.border='transparent';
   locators.SignUpPassword.style.border='transparent'; 

	error=[];
    registerUser();
  })	
		async function registerUser()
  {
    if(locators.SignUpName.value==='')
  {
    locators.SignUpName.style.border="0.5px solid red";
    error.push('Name is required');
    //displayMessage.errorDisplay('Name is required');
  }
   if(locators.SignUpEmail.value==='' || locators.SignUpEmail.value.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/img)===-1)
  {
     locators.SignUpEmail.style.border="0.5px solid red";
       error.push('Valid email is required');
    //displayMessage.errorDisplay('Valid email is required');
  }
    if(locators.SignUpPassword.value==='')
    {
      locators.SignUpPassword.style.border="0.5px solid red";
      error.push('Password is required');
     // displayMessage.errorDisplay('Password is required');

      
    } 
   else if(locators.SignUpPassword.value.length>10 || locators.SignUpPassword.value.length<5)
    {

      displayMessage.errorDisplay('Password length should be 5 to 10 chars');

    }
   else
   {

        
     displayMessage.spinnerDisplay();
    try
    {
      let data= await $.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=Your firebase api key',
    {email:locators.SignUpEmail.value,password:locators.SignUpPassword.value,returnSecureToken:true}).done((data)=>{
    
        return data;
   })
   let modifiedURL='https://jseditor-34d4a.firebaseio.com/Users/'+data.localId+'.json'+'?auth='+data.idToken
    data=  await  $.ajax({url:modifiedURL,
    type:'PUT',
    data:JSON.stringify({name:locators.SignUpName.value}),
    dataType:'JSON'});
        window.removeEventListener('keypress', displayMessage.keyHandler) ;  
      locators.container.innerHTML=templates['root'],
      window.history.pushState({},null,'/');
      uiController.locatorUpdate().SuccessBanner.style.display='block';
      router.routes[window.location.pathname]['path'](uiController,templates,editor);
    } 
    catch(error)
    {
      console.log(error);

     try
     { 
      displayMessage
     .errorDisplay(displayMessage.messageRespnse(error.responseJSON.error.errors[0].message))
       }
       catch(error)
       {
         displayMessage
     .errorDisplay('An unknown error occured');
       }
    }
  

   

    displayMessage.spinnerHide();
  }
  if(error.length>1)
  {
    displayMessage.errorDisplay('Please fill required details');
  }
  if(error.length===1)
  {
     displayMessage.errorDisplay(error[0]);
  }

  }

  function keyHandler(e)
  {
   
      if(e.keyCode===13 || e.which===13)
      {
        e.preventDefault();
       registerUser();
      }
  }
	})();
}
//uiController,templates,displayMessage