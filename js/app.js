
// Define Global Variables
const navContainer = document.querySelector(".navbar__menu");
const secName = document.getElementsByTagName("h2");
const secNameArray = Array.from(secName);
const aLinks = document.querySelectorAll(".menu__link");
const aLinksArray = Array.from(aLinks);




/* building the Navigation >> I preferred to write it like that instead of the [innerHTML] 
to have full control of each element inside that section and to be able to add them inside an Array, Looping,.....etc */

// Making the add New Section Button in the Nav bar
const addButton = document.createElement("button");
navContainer.prepend(addButton);
addButton.classList.add("icon-plus-square", "addSection");

/* the next part it's simply the nav bar itself 
[ul] 
 vv
[li] 
 vv
[a]
*/

const newUl = document.createElement("ul");
navContainer.prepend(newUl);
newUl.classList.add("navbar__list")


const newLi = document.createElement("li");
newUl.prepend(newLi);
newLi.classList.add("myLi")

// console.log('aLinksArray: ', aLinksArray);

/* before we go deep calculate the time right now  */
const startingTime = performance.now();


// make the section HyperLink (a) inner text the same as the Section name of (h2) 
let idCount = 1;
for (let i = 0; i < secNameArray.length; i++) {
  //get the h2 inner text
  const sctionName = secNameArray[i].innerText;
  // make a new Hyperlink
  const newLink = document.createElement("a");
  // put it inside the [li]
  newLi.prepend(newLink);
  // the h2 inner text == the hyperlink [a] inner text
  newLink.innerText = sctionName;


  newLink.classList.add("menu__link")
  // prepare that hyperlink [a] to the active state/link and other features by adding some attributes
  newLink.setAttribute("data-nav", "section" + idCount)
  newLink.setAttribute("href", "#section" + idCount)
  aLinksArray.push(newLink);

  idCount++
}


// get the whole sections of the page
const sctionNumber = document.querySelectorAll("section");
// convert that listNode to an Array to unlock all features of The Array
const sectionArray = Array.from(sctionNumber);
/*Here is the problem, sections that on Array are [Fixed] to just 3 Sections (the starter number of Sections) 
and When I add a new section that new section doesn't appear in the sectionArray 
which means it doesn't responsive to the active link or active state
✔✔ Solved ✔✔ */

// console.log('sctionNumber: ', sctionNumber);




/*
making an add new section Function
*/

let x = sctionNumber.length;

const sectionFunction = (params) => {
  const divContainer = document.querySelector(".mainContainer");

  // which obviously true but I wrote it to be able to make [x++] at the end of code 
  if (x > 0) {

    /* I preferred to create the section element like that to be able to have control on that section which means to add it 
    in an array and make it changeable & increasable with the add new section buttons */
    // and that was the solution of the problem that I mentioned above
    // making a new section and giving it some attributes
    let newSection = document.createElement("section");
    newSection.setAttribute("id", "section" + (x + 1));
    newSection.setAttribute("data-nav", "Section" + (x + 1));
    newSection.setAttribute("class", "your-active-class");


    const sectionContent = `
      <!-- <div class="cercle1"></div>
      <div class="cercle2"></div> -->
      <div class="landing__container">
        <h2>Section ${x + 1}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

        <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
      </div>
    </section>

    `

    // with that new section make a new hyperlink and add it to the Navigation bar 
    const newLink = document.createElement("a");
    newLi.prepend(newLink);
    // x+1 >> means to get the current number of sections and add [1] to it by creating new section  
    newLink.innerText = `Section ${x + 1}`;
    newLink.classList.add("menu__link")
    newLink.setAttribute("data-nav", "section" + (x + 1))
    newLink.setAttribute("href", "#section" + (x + 1))
    /*by pushing the new hyperlink and the new section  the array now with looping won't give us a fixed number 
    and that is the key that will make us control the whole page the way we want ^^ */
    aLinksArray.push(newLink);
    sectionArray.push(newSection);
    x++;

    const putSection = divContainer.append(newSection);
    const wholeSection = newSection.innerHTML += sectionContent;


  }
}

// console.log(sectionArray);

/*
addEventListener to both add new section buttons   
*/
addButton.addEventListener("click", sectionFunction);

const lastButton = document.getElementById("lastButton");

lastButton.addEventListener("click", sectionFunction);



// define the scrollTop button
const scrollTop = document.getElementById("scrollToUp");

//while I'm doing scroll do that  
window.onscroll = function () {

  sectionArray.forEach(function (section) {
    /* the active class state & active link features, actually, that part was a challenge for me but I succeed to think and write it 100% by myself */
    for (let y = 0; y < sectionArray.length; y++) {

      for (let j = 0; j < aLinksArray.length; j++) {
        const dataNav = aLinksArray[j].getAttribute("data-nav");

        if (section.id === dataNav) {
          if (section.getBoundingClientRect().top >= -400 && section.getBoundingClientRect().top <= 150) {

            section.classList.add("your-active-class");
            aLinksArray[j].classList.add("active-link");

          } else {
            section.classList.remove("your-active-class");
            aLinksArray[j].classList.remove("active-link");
          }
        }

        /* the scrollTop button appear and disappear based on the scrollY number*/
        if (window.scrollY > 800) {
          scrollTop.style.display = "block";

        } else if (window.scrollY < 800) {
          scrollTop.style.display = "none";
        }
      }
    }
  });
}



/* when I click the scrollTop button scroll to the Top*/
scrollTop.addEventListener("click",
  (eo) => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });



/* 
Smooth Scrolling using javascript instead of CSS
 */

/* when I click the [li] Element which contains HyperLinks First Remove/ Prevent Defaults  
and then see which section I clicked [.target] then get the data nav of that section using [getAttribute] then go to it with Smooth Scrolling
and that's it! ^^
*/
newLi.addEventListener("click", (eo) => {
  eo.preventDefault();
  const dataNav = eo.target.getAttribute("data-nav");
  // console.log('dataNav: ', dataNav);
  if (dataNav) {
    document.getElementById(dataNav)
      .scrollIntoView({ behavior: "smooth" });
  }
});




/* To calculate the time to implement the whole code*/
//just remove the [//] to active it & print the time in the console log 
const endingTime = performance.now();
// console.log('This code took ' + (endingTime - startingTime).toFixed(2) + ' milliseconds.');










