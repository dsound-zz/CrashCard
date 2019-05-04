document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM is loaded");
    
    
    
    
    
    let allFlashcards = [];
    const form = document.getElementById('form');
    const card = document.querySelector('#card-container');


    // fetch all cards

        const fetchCards = () => {
        fetch('http://localhost:9000/api/v1/flashcards')
            .then(res => res.json())
            .then(flashcards => {
                allFlashcards = flashcards
                console.log("I'm in Fetch:", allFlashcards)
              
                renderCards()
            });
        };


    // flip action

    const renderCards = () => {
        return allFlashcards.map(c => {
            return card.innerHTML += `
           <div class="container">
             <div class="card" data-card=${c.id}>
             <i class="black delete icon" id="delete-card"></i>
             <i class="black edit icon" id="edit-card"></i>
                 <h2 class="front" data-id=${c.id}>${c.body_front}</h>
                <h4 class="back">${c.body_back}</h4>
                 </div>
             </div>
           `
        })
    };

    // listen for card click

    card.addEventListener('click', e => {
        if (e.target.dataset.id) {
            return e.target.parentNode.classList.toggle('flipped')
        } else if (Array.from(e.target.classList).includes('back')) {
            return e.target.parentNode.classList.toggle('flipped')
        }
    });

    
    // create new card form

    // Get DOM Elements
    const modal = document.querySelector('#my-modal');
    const modalBtn = document.querySelector('#modal-btn');
    const closeBtn = document.querySelector('.close');

    // Events
    modalBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', outsideClick);

    // Open
    function openModal() {
        modal.style.display = 'block';
    }

    // Close
    function closeModal() {
        modal.style.display = 'none';
    }

    // Close If Outside Click
    function outsideClick(e) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    }


    // const create = document.getElementById('create-card')
    // create.addEventListener('click', (e) => {
    //     modal();
    // });

 
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const cardFront = document.getElementById('card-front').value
        const cardBack = document.getElementById('card-back').value
        fetch('http://localhost:9000/api/v1/flashcards', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                body_front: cardFront,
                body_back: cardBack
            })
        }).then(res => res.json())
            .then(newCard => {
                allFlashcards.push(newCard)
                renderCards()
                closeModal()
                
            })
    });




    // delete cards

   card.addEventListener('click', e => {
       const cardId = e.target.parentElement.dataset.card
       const foundCard = allFlashcards.find(fcard => {
           return fcard.id == cardId
       })
       console.log(foundCard)
       
       if (e.target.id == "delete-card") {
           confirm("Do you want to delete this card?")
           card.parentElement.removeChild(card)
        fetch(`http://localhost:9000/api/v1/flashcards/${foundCard.id}`, {
            method: "DELETE"
        }) 
        const originalCardIndex = allFlashcards.indexOf(foundCard)
        allFlashcards.splice(originalCardIndex, 1)
          
        console.log("I'm in delete:", allFlashcards)
           
       
    };
   });

    // edit cards 

   card.addEventListener('click', e => {
       
       const cardId = e.target.parentElement.dataset.card 
       const foundCard = allFlashcards.find(fcard => {
           return fcard.id == cardId 
       })
      
       if (e.target.id == "edit-card") {
           
            openModal(foundCard)
            form.childNodes[1].childNodes[3].value = e.target.nextElementSibling.innerText 
            form.childNodes[2].parentElement[1].value = e.target.parentElement.lastElementChild.innerText
            let submitBtn = document.getElementById('submit')
            submitBtn.innerText = "Edit"
            form.addEventListener('submit', (e) => {
               e.preventDefault();
               const cardFront = document.getElementById('card-front').value
               const cardBack = document.getElementById('card-back').value
               fetch(`http://localhost:9000/api/v1/flashcards/${foundCard.id}`, {
                   method: "PATCH",
                   headers: {
                       "Content-Type": "application/json",
                       "Accept": "application/json"
                   },
                   body: JSON.stringify({
                       body_front: cardFront,
                       body_back: cardBack
                   })
               })
               .then(res => res.json())
                   .then(updatedCard => {
                    console.log("I'm in edit:", allFlashcards)
                    debugger 
                    const originalCardIndex = allFlashcards.indexOf(foundCard)
                    
                    allFlashcards.splice(originalCardIndex, 1, updatedCard)
                    
                    closeModal()
                })
                    
            })
       }
    })

fetchCards()

                
}); // end DOMContentLoaded
       


   

    



  
