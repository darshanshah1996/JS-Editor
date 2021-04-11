async function EditorScreen(user)//uiController,templates,editor,user
{
  let timer;
  let editorRef;
  let token=getToken();
  let locators=uiController.locatorUpdate();


  let eventController=(function(){//uiController,templates,editor
     
    function editorStart(userId)
    {

    let locators=uiController.locatorUpdate();
    let edit;
    editorRef = editor({id:userId,token:token});
    editorRef.update();
    observeEditorRef=observeEditor(editorRef.resize)
    //console.log(observeEditorRef);
    observeEditorRef.ObsHTML().observe(locators.HTMLEditor);
    observeEditorRef.ObsCSS().observe(locators.CSSEditor);  
    observeEditorRef.ObsJS().observe(locators.JSEditor);   


  locators.hamberger.addEventListener("click", () => {
  locators.hamberger.classList.toggle("change");
   locators.headerOptions.classList.toggle("gridrow");
  });



  locators.LogOut.addEventListener("click",async ()=>{
  
     await editorRef.autoUpdate();
     localStorage.removeItem('editorJSUser');
     observeEditorRef.ObsHTML().unobserve(locators.HTMLEditor);
     observeEditorRef.ObsCSS().unobserve(locators.CSSEditor);
     observeEditorRef.ObsJS().unobserve(locators.JSEditor);
     clearTimer();
    window.history.pushState({},null,'/');
    locators.container.innerHTML=router.routes[window.location.pathname].template;

    setTimeout(()=>{router.routes[window.location.pathname]['path']();},200);//uiController,templates,editor
  })
  

 locators.NewProject.addEventListener('click',async ()=>{
   await editorRef.autoUpdate();
    locators.projectName.textContent='Give Me Some Name!';
   editorRef.resetEditor();
    locators.hamberger.classList.toggle("change");
   locators.headerOptions.classList.toggle("gridrow");
  })



locators.Load.addEventListener('click',async ()=>{
displayMessage.spinnerDisplay();
try
{
  let url='Your firebase project url/Users/'+userId+'/projects.json?auth='+token;
  let projectDetails =await $.get(url).done((data)=>{
    //  console.log(data);
      return data;

    })
   locators.PopupContent.innerHTML='';
    locators.PopupContent.insertAdjacentHTML('afterbegin',templates['projectData']);
   /*  */
   if(projectDetails)
   {
     editorRef.loadProject(projectDetails);
   }
   else
   {
     editorRef.loadProjectWarning();
   }

}
catch(error)
{
 // console.log(error);
  displayMessage.spinnerHide();
  displayMessage.errorDisplay('An unkown error occured');
}
  })



  locators.Save.addEventListener('click', ()=>{

   
     
   
    locators=uiController.locatorUpdate();

     if(locators.projectName.textContent==='Give Me Some Name!')
     {
      locators.PopupContent.innerHTML=templates['projectName'];
       displayMessage.popupShow();
       locators=uiController.locatorUpdate();
        locators.SaveProject.addEventListener('click',()=>{
     // console.log("Pname="+locators.ProjectName.value);
      if(locators.ProjectName.value.toString()==='')
      {
        alert('Project Name required');
      }
      else
      {
        locators.Popup.style.display='none';
          locators.projectName.textContent=locators.ProjectName.value;
          editorRef.SaveProject();
      }
     
    })
     }
      else
      {
          
          locators.Popup.style.display='none';
         // locators.projectName.textContent=locators.ProjectName.value;
          editorRef.SaveProject();
      }
    
  
  
  })




  locators.projectName.addEventListener('click',()=>{
     locators.PopupContent.innerHTML=templates['projectName'];
    displayMessage.popupShow();
    locators=uiController.locatorUpdate();
    locators.SaveProject.addEventListener('click',()=>{
     // console.log("Pname="+locators.ProjectName.value);
      if(locators.ProjectName.value.toString()==='')
      {
        alert('Project Name required');
      }
      else
      {
          
          locators.Popup.style.display='none';
          locators.projectName.textContent=locators.ProjectName.value;
      }
    })
  })
    
   
    }
    return{
    	editorStart
    
    } 
     })
	();//uiController,templates,editor



	
	 displayMessage.spinnerDisplay();
 
   try
   {
  
    
   
    userId=await $.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=Your firebase project api key',
   {idToken: getToken()}).done((data)=>{
     //console.log(data.users[0]['localId']); 
    

     eventController.editorStart(data.users[0]['localId']);

   	
   })
   }
   catch(error)
   {
   	console.log(error);
    clearTimer();
   	locators.container.innerHTML=templates['root'],
      window.history.pushState({},null,'/');
      uiController.locatorUpdate();
      router.routes[window.location.pathname]['path']()//uiController,templates,editor;
       displayMessage.spinnerHide();

   }
   

   function getToken()
   {
     let token;
      if(user===undefined )
    {
     // console.log('Accessing cache');
      //console.log(JSON.parse(localStorage.getItem('editorJSUser')));
      token=JSON.parse(localStorage.getItem('editorJSUser'));
       if(token)
       {
         clearTimer();
        
         setTimer(3480000-(new Date().getTime()-(token.refreshTime*1000)),token);
          return token.token;
      
       }   
     
     
    }
    else
    {
       localStorage.setItem('editorJSUser',JSON.stringify(user));
    
       setTimer(new Date().getTime()+3480000,user);
      return user.token;
    }
   }
  
   function setTimer(duration,tokenDetail)
  {
    timer= setTimeout(async ()=>{
    // console.log('Timer expires');
     try
     {
      displayMessage.spinnerDisplay();
      await $.post('https://securetoken.googleapis.com/v1/token?key=Your firebase api key',{grant_type:'refresh_token',refresh_token:tokenDetail.refreshToken})
     .done((data)=>{
      
      localStorage.setItem('editorJSUser',JSON.stringify({token:data.id_token,refreshToken:data.refresh_token,refreshTime:parseInt(new Date().getTime()/1000)}));
      token=data.id_token;
       editorRef.updateToken(data.id_token);
       setTimer(3480000,{refreshToken:data.refresh_token});
       displayMessage.spinnerHide();
      
     })
     }
     catch(error)
     {
       console.log(error);
        localStorage.removeItem('editorJSUser');
          locators.container.innerHTML=templates['root'],
        window.history.pushState({},null,'/');
      uiController.locatorUpdate();
      router.routes[window.location.pathname]['path']();//uiController,templates,editor
       displayMessage.spinnerHide();

     }
     },duration); 
   }

   function clearTimer()
   {
     clearTimeout(timer);
     
   }
 

}


 


function observeEditor(resize)
{
  return{
  ObsHTML:function()
          {
           return new ResizeObserver(()=>{
            resize.resizeHTML();
             })
          }, 
  ObsCSS:function()
          {
           return new ResizeObserver(()=>{
            resize.resizeCSS();
             })
          },  
  ObsJS:function()
          {
          return  new ResizeObserver(()=>{
            resize.resizeJS();
             })
          }                
  }
}