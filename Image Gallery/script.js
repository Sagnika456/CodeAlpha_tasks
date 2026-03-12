const items = document.querySelectorAll(".gallery-item");
const buttons = document.querySelectorAll(".filter-buttons button");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let visibleItems = [...items];
let currentIndex = 0;

/* FILTER */
buttons.forEach(button=>{
    button.addEventListener("click", ()=>{
        document.querySelector(".active").classList.remove("active");
        button.classList.add("active");

        const filter = button.dataset.filter;
        visibleItems = [];

        items.forEach(item=>{
            if(filter==="all" || item.classList.contains(filter)){
                item.style.display="block";
                visibleItems.push(item);
            }else{
                item.style.display="none";
            }
        });
    });
});

/* OPEN LIGHTBOX */
items.forEach(item=>{
    item.addEventListener("click", ()=>{
        currentIndex = visibleItems.indexOf(item);
        showImage();
        lightbox.style.display="flex";
    });
});

function showImage(){
    lightboxImg.src = visibleItems[currentIndex].querySelector("img").src;
}

nextBtn.onclick = ()=>{
    currentIndex = (currentIndex+1)%visibleItems.length;
    showImage();
}

prevBtn.onclick = ()=>{
    currentIndex = (currentIndex-1+visibleItems.length)%visibleItems.length;
    showImage();
}

closeBtn.onclick = ()=> lightbox.style.display="none";

document.addEventListener("keydown", e=>{
    if(lightbox.style.display==="flex"){
        if(e.key==="ArrowRight") nextBtn.click();
        if(e.key==="ArrowLeft") prevBtn.click();
        if(e.key==="Escape") lightbox.style.display="none";
    }
});
