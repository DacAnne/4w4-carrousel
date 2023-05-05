(function(){
    //console.log('Début du carrousel');
    let carrousel = document.querySelector('.carrousel');
    let carrousel__x = document.querySelector('.carrousel__x');
    let carrousel__flecheG = document.querySelector('.carrousel__flecheG');
    let carrousel__flecheD = document.querySelector('.carrousel__flecheD');
    let carrousel__figure = document.querySelector('.carrousel__figure');
    let carrousel__form = document.querySelector('.carrousel__form');
    //console.log(carrousel__form.tagName) conteneur de radio-boutons

    let galerie = document.querySelector('.galerie');
    let galerie__img = galerie.querySelectorAll('img');

    carrousel__x.addEventListener('mousedown',function(){
        carrousel.classList.remove('carrousel--activer');
    });
    // Gestion des flèches
    carrousel__flecheD.addEventListener('mousedown',function(){
        index ++;  
        if(index > galerie__img.length - 1){
            index = 0;  
        }
        carrousel__form.children[index].checked = "checked";
        affiche_image_carrousel();    
    });
    carrousel__flecheG.addEventListener('mousedown',function(){
        index --;  
        if(index < 0){
           index = galerie__img.length - 1;
        }
        carrousel__form.children[index].checked = "checked";
        affiche_image_carrousel();
    });
    /**
     * Pour chaque image de la galerie l'ajouter dans le carrousel
     */
     let position = 0;
     index = 0;
     let ancienIndex = -1;
    
    if(position != galerie__img.length){
        for (const elem of galerie__img){
            elem.dataset.index = position;
            elem.addEventListener('mousedown', function () { carrousel.classList.add('carrousel--activer');
            index = this.dataset.index; carrousel__form.children[index].checked = true; affiche_image_carrousel();
        });
            ajouter_une_image_dans_carrousel(elem);
            ajouter_un_radio_bouton_dans_carrousel(); 
          }
    }
  
    

    /**
     * Création dynamique d'une image pour le carrousel
     * @param {*} elem une image de la galerie
     */
    function ajouter_une_image_dans_carrousel(elem){
            //console.log(elem.getAttribute('src'));
            //console.log(img.src);
            let img = document.createElement('img');
            img.classList.add('carrousel__img');
            img.src = elem.src;
            //img.src = elem.src.substr(0,elem.src.length-12) + ".jpg"
            carrousel__figure.appendChild(img);
    }

    function ajouter_un_radio_bouton_dans_carrousel(){ 
        let rad = document.createElement('input');
        rad.setAttribute('type','radio');
        rad.setAttribute('name','carrousel__rad');
        rad.classList.add('carrousel__rad');
       
        rad.dataset.index = position;
        rad.addEventListener('mousedown', function(){
            index = this.dataset.index;
            affiche_image_carrousel();
           
        });
        position = position + 1; //incrémentation de la position
        carrousel__form.append(rad);

        //console.log(rad.dataset)
        if(rad.dataset.index == 0){ 
            // mettre le premier par default lorsqu'on ouvre le carrousel pour la première fois
            carrousel__figure.children[index].style.opacity = "1";
            rad.checked = "checked"
        }  
    }
    /**
     * Affiche la nouvelle image du carrousel
     */

    function affiche_image_carrousel(){
        
        if(ancienIndex != -1){
            carrousel__figure.children[ancienIndex].style.opacity = "0"
            // carrousel__figure.children[ancienIndex].classList,remove('carrousel__img--activer'); // autre façon
        }
        redimensionner_carrousel();
        //console.log(this.dataset.index);
        carrousel__figure.children[index].style.opacity = "1";
        // carrousel__figure.children[index].classList,add('carrousel__img--activer'); // autre façon
        ancienIndex = index;
    }
    function redimensionner_carrousel(){
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const imageWidth = carrousel__figure.children[index].naturalWidth;
        const imageHeight = carrousel__figure.children[index].naturalHeight;
        let carrouselWidth = carrousel.offsetWidth;
        let carrouselHeight = carrousel.offsetHeight;

        carrouselWidth = windowWidth;
        // Pour les fenêtre inférieur à 1000px un genre de media querry dans js
        if(carrouselWidth > 1000){ 
            carrouselWidth = windowWidth - windowWidth/2;
        }
        carrouselHeight = carrouselWidth * imageHeight/imageWidth;
        carrousel.style.width = `${carrouselWidth}px`
        carrousel.style.height = `${carrouselHeight}px`

        carrousel.style.left = `${(windowWidth - carrouselWidth)/2}px`;
        carrousel.style.top = `${(windowHeight - carrouselHeight)/2}px` ;
        // console.log(
        //     `windowWidth= ${windowWidth}
        //      windowHeight= ${windowHeight}
        //      imageWidth= ${imageWidth}
        //      imageHeight= ${imageHeight}
        //      carrouselWitdth= ${carrouselWidth}
        //      carrouselHeight= ${carrouselHeight}`
        // )

        //carrousel.style.widht = 
    }
})()