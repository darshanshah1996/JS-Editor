function ResetScreen()
{
	(function(){

	  let locators=uiController.locatorUpdate();
	  let resetEmail;

	  locators.ResetPass.addEventListener('click',async ()=>{
	  resetPassword();
	     
	  })
	    displayMessage.keyHandler=keyHandler;
     window.addEventListener('keypress',displayMessage.keyHandler);


	  async function resetPassword()
	  {
	  	resetEmail=locators.SignUpEmail.value;
	  if(resetEmail==='' || resetEmail.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/img)===-1 )
	  {
	  	displayMessage.errorDisplay('Valid email required');	 
	    }
	   else
	   {
	   	displayMessage.spinnerDisplay();
        try{
        await $.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=Your firebase api key',
	   	{requestType:'PASSWORD_RESET',email:resetEmail}).done((data)=>{
	   		//console.log(data)
	   	})
        }
        catch(error)
        {
        	
        }  
	     window.removeEventListener('keypress',displayMessage.keyHandler);   
	   	window.history.pushState({},null,'/');
	   	locators.container.innerHTML=templates['root'];
	   	locators=uiController.locatorUpdate();
	   	locators.Banner.textContent='You will receive an email for resetting password if you are already registered';
	   	locators.SuccessBanner.style.display='block';
	   	router.routes[window.location.pathname].path();
        displayMessage.spinnerHide(); 
	   } 
	  }
		
		 function keyHandler(e)
      {
      
      if(e.keyCode===13 || e.which===13)
      {
        
        resetPassword();
      }
      }
	})()
}
