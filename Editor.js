function editor (user)
{
let wins;


let locators= uiController.locatorUpdate()

let iframe=locators.iframe.contentWindow.document;


let logHtml=templates['LogHtml']

let logCss=templates['LogCSS']


function inits(iframe)
{

     

 iframe.write('<script>'+`

 if(window.console.debug!==undefined)
{

 var old=window.console;
 
}
 var console={
    log:(...text)=>{
    
        
     
      

    
      old.log(text);

      function display(entry)
      {
        
        if(typeof entry==='string' && entry.search('@error')>-1)
        {
          entry=entry.split('@')[0];
          document.querySelector('.log-disp').innerHTML='';
           htmlDisp="<p class='logEntry' style='color:red !important'>"+entry+"</p>";
           document.querySelector('.fa-exclamation-circle').style.backgroundColor='red ';
           document.querySelector('.fa-exclamation-circle').style.display='block';
        }
        else
        {
           htmlDisp='<p class="console__heading logEntry">'+entry+'</p>';
           document.querySelector('.fa-exclamation-circle').style.backgroundColor='lightblue';
            document.querySelector('.fa-exclamation-circle').style.display='block';

        }
         
         document.querySelector('.log-disp').
    insertAdjacentHTML('beforeend',htmlDisp);
      }
      function displayObject(obj)
      {
         let result='{';
    Object.keys(obj).forEach((key,index)=>{
      if(Array.isArray(obj[key])===true)
      {
        result+=key+':'+displayArray(obj[key])
      }
      else if(typeof obj[key]==='object')
      {
         result+=key+':'+displayObject(obj[key])
      }
      else
      {
        result+=key+':'+obj[key]
      }  
      if(index!=  Object.keys(obj).length-1)
      {
        result+=', '
      }
    })
    result+="}"
       return result;
      }

      function displayArray(arr)
      {
         let result="[";
    arr.forEach((entry,index)=>{

      if(Array.isArray(entry)===true)
      {
        result+=displayArray(entry)
      }
      else if(typeof entry==='object')
      {
        result+=displayObject(entry)
      }
      else
      {
             result+=entry;
      }
     if(index!=  arr.length-1)
      {
        result+=', '
      }
    })
    result+="]";
    return result;
      }
      text.forEach((entry)=>{

     if(entry!=='')
     {
    setTimeout(()=>{

      if(Array.isArray(entry)===true)
      {
        display(displayArray(entry));

      }
      else if(typeof entry==='object')
      {
        display(displayObject(entry));
      }
      else
      {
        display(entry);
    }},100);
     } 
       })
          

    
     },
     error:(text)=>
     {
      
      
        
        setTimeout(()=>{
          if(text.search(/FontA/img)===-1)
          {
            old.error(text);
            let htmlDisp="<p style='color:red'>"+text+"</p>";
          }
      
      document.querySelector('.log-disp').
    insertAdjacentHTML('beforeend',htmlDisp);
      },100);
    
       
     }
    }`
    
 
 
      

  +'</script>');
  iframe.write('<script>'+`function shows()
    {
      
     
    document.querySelector('.log-disp').
    classList.toggle('showlog');
    };
    window.onerror=function(msg,url,lineno,colno,error)
    {
      console.log(msg+' at line number '+lineno+'@error');
         
    }

   
    `+'</script>')
  


}
 

function update()
{




//console.log('In update');
locators.iframe.contentWindow.document.location.reload();

let rand=Math.round(Math.random()*10)+1.75
locators.iframe.src=rand+'.html';
locators.iframe.src='';
let iframe=locators.iframe.contentWindow.document;
if(locators.iframe.contentWindow.document.childNodes[0].childNodes)
{
  locators.iframe.contentWindow.document.childNodes[0].childNodes.forEach((node)=>{
  node.innerHTML='';
  node.outerHTML='';
})
  
}

  iframe.open();
  iframe.write(logHtml);
iframe.write('<style>'+logCss+'</style>')

  iframe.write(editor.getValue())

  iframe.write('<style>'+cssEditor.getValue()+'</style>');
 
    inits(iframe);
 iframe.write('<script>'+`document.querySelector('.log-disp').innerHTML='';
`+'</script>');
    iframe.write('<script>'+jsEditor.getValue()+'</script>');
   
 ;
    
  
 
  iframe.close();

  if(wins!==undefined )
  {  
   // console.log('In wins');
    
  nativeView();
  
      
  }

}




  var editor=ace.edit('htmlEditor');
  editor.setTheme('ace/theme/merbivore_soft');
    editor.setAutoScrollEditorIntoView(true);
  editor.session.setMode('ace/mode/html');
  net.loadScript("emmet-core-master/emmet.js",()=>{
    //https://github.com/nightwing/emmet-core/blob/master/emmet.js
    editor.setOptions({
    enableBasicAutocompletion:true,
    enableLiveAutocompletion:true ,
    enableEmmet:true,
    UseWrapMode:true,
     
  })
  
  })
    editor.setValue("");
  

 var cssEditor=ace.edit('cssEditor'); 
 cssEditor.setTheme('ace/theme/merbivore_soft');
  cssEditor.session.setMode('ace/mode/css');
   cssEditor.setOptions({
     enableBasicAutocompletion:true,
     enableLiveAutocompletion:true ,
  
  })
   cssEditor.setValue("body{background-color: white;}");

 var jsEditor=ace.edit('jsEditor'); 
 jsEditor.setTheme('ace/theme/merbivore_soft');
  jsEditor.session.setMode('ace/mode/javascript');
   jsEditor.setOptions({
     enableBasicAutocompletion:true,
    enableLiveAutocompletion:true 

   })
  jsEditor.setValue("");


  editor.getSession().on('change',update);
  editor.session.setUseWrapMode(true);
  cssEditor.getSession().on('change',update);
  cssEditor.session.setUseWrapMode(true);
  jsEditor.session.setUseWrapMode(true);
  jsEditor.getSession().on('change',()=>{

    //console.log('In updating');
    update()});
  
  async function SaveProject()
  {
    displayMessage.spinnerDisplay();
    let url='Your firebase projcet url/Users/'+user.id+'/projects/'+ locators.projectName.textContent+'.json?auth='+user.token;
  // console.log(url);
   projectData=JSON.stringify({html:editor.getValue(),css:cssEditor.getValue(),js:jsEditor.getValue(),mod:new Date().getTime()});
  // console.log(projectData);
 try
 {
    await $.ajax({type:'PUT',url:url,data:projectData,dataType:'JSON'}).done((data)=>{
     //  console.log(data);
      displayMessage.errorDisplay('Project Saved','#00804d');
   }) 
 } 
 catch(error)
 {
   console.log(error);
   displayMessage.errorDisplay('An unknown error occured');
 }
 displayMessage.spinnerHide();
 locators.hamberger.classList.toggle("change");
      locators.headerOptions.classList.toggle("gridrow"); 

  }
  
  

  

  function loadProject(projectDetails)
 {
   let ProjectWrapper=document.querySelector('.wrapProject');
   let minutes;
   let hours;
    for(project in projectDetails)
    {
        
        let timeModified=new Date(projectDetails[project].mod);
        let html=templates['htmlTemp'];
        minutes=timeModified.getMinutes();
        hours=timeModified.getHours();

        
    
      timeModified=`${timestampModified(timeModified.getDate())}/${timestampModified(timeModified.getMonth()+1)}/${timestampModified(timeModified.getFullYear())}-${timestampModified(timeModified.getHours())}:${timestampModified(timeModified.getMinutes())}`
      html=html.replace(/@Name/img,project).replace(/@time/img,timeModified).replace(/@id/img,'p@'+project);
    ProjectWrapper.insertAdjacentHTML('beforeend',html);

 
      
  }
  document.querySelectorAll('.projectItem').forEach( (projectEntry)=>{
    projectEntry.addEventListener('click',async ()=>{

     
     await autoUpdate();
     locators.Popup.style.display='none';
     let loadedProject=projectEntry.childNodes[1].textContent;
       locators.iframe.contentWindow.document.location.reload();
      locators.projectName.textContent=loadedProject;
    
     editor.setValue(projectDetails[loadedProject].html);
     cssEditor.setValue(projectDetails[loadedProject].css);
      jsEditor.setValue(projectDetails[loadedProject].js);
      locators.hamberger.classList.toggle("change");
      locators.headerOptions.classList.toggle("gridrow"); 
    })
  })
  document.querySelectorAll('.deletBtn').forEach((projectClose)=>{
   projectClose.addEventListener('click',async ()=>{
    displayMessage.spinnerDisplay();
     let statusDeleted;
      try
      {
        let url='Your firebase project url/Users/'+user.id+'/projects/'+projectClose.id.toString().split('@')[1]+'.json?auth='+user.token;
      await $.ajax({type:'DELETE',url:url}).done((data)=>{
     //   console.log("Return Datat="+data);
          statusDeleted=true;
        })
      }
      catch(error)
      {
        console.log(error);
      }
    //  console.log('Deleted Status='+statusDeleted)
       locators.Popup.style.display='none';
        if(locators.projectName.textContent===projectClose.id.toString().split('@')[1] && statusDeleted)
        { 
          locators.projectName.textContent='Give Me Some Name!';
          resetEditor();
        }
      
       displayMessage.spinnerHide(); 
        if(statusDeleted)
       {
         displayMessage.errorDisplay('Project Deleted Sucessfully','#00804d')
         locators.hamberger.classList.toggle("change");
          locators.headerOptions.classList.toggle("gridrow");
       }
       else
       {
          displayMessage.errorDisplay('An unknown error occured');
          locators.hamberger.classList.toggle("change");
          locators.headerOptions.classList.toggle("gridrow");
       }
   })
  })
  displayMessage.spinnerHide();
   displayMessage.popupShow();
 }

 function loadProjectWarning()
 {
 ;
    let ProjectWrapper=document.querySelector('.wrapProject');
    let html='<h5 class="ProjectWarning">No Project To Load</h5>';
    ProjectWrapper.insertAdjacentHTML('beforeend',html);
     displayMessage.spinnerHide()
     displayMessage.popupShow();
 }


 locators.View.addEventListener('click',()=>{
     wins=window.open();
    wins.document.write('<style> body{padding:0px; margin:1px;} .nativeFrameDiv{height:100%}  #nativeFrame{width:100%;height:100%; margin:0px;padding:0px;border:transparent}</style>')
    wins.document.write('<div class="nativeFrameDiv"><iframe id="nativeFrame"    allowFullScreen ></iframe></div>');
    wins.document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">')
  nativeView();
    
 })



async  function autoUpdate()
 {
  displayMessage.spinnerDisplay();
   if( locators.projectName.textContent !== 'Give Me Some Name!')
   {
     try{
       
      
       let url='Your firebase project url/Users/'+user.id+'/projects/'+locators.projectName.textContent+'.json?auth='+user.token;
       let projectDetail= await $.get(url).done((data)=>{
       //console.log(data);
       return data;
       })
       if(projectDetail)
       {
       let projectData=JSON.stringify({html:editor.getValue(),css:cssEditor.getValue(),js:jsEditor.getValue(),mod:new Date().getTime()});
       await $.ajax({type:'PUT',data:projectData,url:url,dataType:'JSON'}).done((data)=>{
       //console.log('Project Updated');
       //console.log(data);
        })
     }
    }
    catch(error)
    {
      console.log(error);
    }

   }
     displayMessage.spinnerHide();
 }

  function nativeView()
  {
   if(wins.document.getElementById('nativeFrame').contentWindow) 
   {
     let frame=wins.document.getElementById('nativeFrame').contentWindow.document;
    
       frame.childNodes[0].childNodes.forEach((node)=>{
  node.innerHTML='';
  node.outerHTML='';
})

frame.open();
frame.write(editor.getValue());
frame.write('<style>'+cssEditor.getValue()+'</style>');
frame.write('<script>'+jsEditor.getValue()+'</script>');
frame.close();
     



   }


  }
  function updateToken(refreshToken)
  {
    //console.log('Editor Update');
    user.token=refreshToken;
  //  console.log(user);
  }

  resize={
    resizeHTML:function(){
                editor.resize();
                 },
    resizeCSS:function()
               {
                 cssEditor.resize();
               },
    resizeJS:function()
              {
               jsEditor.resize();
              }                           
  }
  function resetEditor()
  {
     editor.setValue('');
    cssEditor.setValue("body{background-color: white;}");
     jsEditor.setValue('');
  }
  
 displayMessage.spinnerHide();
  return{
    resize,
    resetEditor,
    loadProject,
    loadProjectWarning,
    SaveProject,
    autoUpdate,
    update,
    updateToken
  }


}
function timestampModified(timeValue)
{
	if(timeValue<10)
	{
		timeValue='0'+timeValue;
	}
	return timeValue;
}