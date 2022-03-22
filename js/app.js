/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/**
 * Define Global Variables
 * 
*/
const allSections = document.querySelectorAll("section");
const ul = document.getElementById("navbar__list");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//function to check if the section in viewport or not
function inViewPort(el){
    flag = false;
    if(el.getBoundingClientRect().top >= 0 && el.getBoundingClientRect().top <= 450 )
    {
        flag = true;
    } 
    return flag;
}

// function to add and remove a specific class
function controlClasses(flag,element,cNamce) {
    switch(flag) {
        case 1:
            element.classList.add(cNamce);
            break;
        case 2:
            element.classList.remove(cNamce);
            break;    
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function navBuilder() {
    //using of document fragment when appending li to improve the performance
    const frag = document.createDocumentFragment();
        for(let i=0;i<allSections.length;i++)
    {
        const id = allSections[i].getAttribute('id');
        const li = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.textContent = allSections[i].getAttribute('data-nav');
        anchor.setAttribute('href',"#"+id);
        anchor.setAttribute('id',"#"+id);
        anchor.className = "menu__link";
        li.appendChild(anchor);
        frag.appendChild(li);
    }
    ul.appendChild(frag);
}

//invoke nav builder function
navBuilder(); 

//all linkes

const links= document.querySelectorAll("li a.menu__link");


// Add class 'active' to section when near top of viewport

function addActiveClass() {
    for(let i=0; i<allSections.length;i++) {
        if(inViewPort(allSections[i]) &&
         links[i].textContent === allSections[i].getAttribute("data-nav"))
        {
            controlClasses(1,links[i],"your-active-class");
            controlClasses(1,links[i],"your-active-link");         
            controlClasses(1,allSections[i],"your-active-class");
            controlClasses(1,allSections[i],"your-active-link");
         
        } else {
            controlClasses(2,links[i],"your-active-class");
            controlClasses(2,links[i],"your-active-link");            
            controlClasses(2,allSections[i],"your-active-class");
            controlClasses(2,allSections[i],"your-active-link");
            
        }
    }
}

//Get the button:
//i used this link https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0; 
}


/**
 * End Main Functions
 * Begin Events
 * 
*/



// Smooth Scroll
links.forEach(link=>{
    link.addEventListener('click',(evt)=>{
        evt.preventDefault();
        const id = evt.target.id;
        const section = document.querySelector(id);
        section.scrollIntoView({behavior:"smooth"})
    })
})
// Set sections as active
document.addEventListener("scroll",addActiveClass);


