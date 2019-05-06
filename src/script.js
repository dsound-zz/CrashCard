document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM is loaded");
    
    
    
    // set variables and DOM elements 
    
    let allFlashcards = [];
    const form = document.getElementById('form');
    const card = document.querySelector('#card-container');
    const modal = document.querySelector('#my-modal');
    const modalBtn = document.querySelector('#modal-btn');
    const closeBtn = document.querySelector('.close');
    

    // fetch all cards

    const fetchCards = () => {
        fetch('http://localhost:9000/api/v1/flashcards')
        .then(res => res.json())
        .then(flashcards => {
                allFlashcards = flashcards
                return flashcards.map(c => {
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
        });
    }
             
                
                
                
           
                

    // listen for card click and flip

    card.addEventListener('click', e => { 
        if (e.target.dataset.id) { 
        return e.target.parentNode.classList.toggle('flipped') 
        } else if (Array.from(e.target.classList).includes('back')) 
        { return e.target.parentNode.classList.toggle('flipped') } });

    // ****** MODAL SETUP ********

    // Modal Events

    modalBtn.addEventListener('click', () => openModal(x=0));
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', outsideClick);

    // Open
    function openModal(x, cardFront, cardBack, foundCard) {
        console.log(x)
        modal.style.display = 'block';
        if (x === 0) {
            createCard() 
        } else {
            editCard(cardFront, cardBack, foundCard)
        }
    };

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

    // create new card
    const createCard = () => { 
        console.log("in create")
        let submitBtn = document.getElementById('submit')
        submitBtn.innerText = "Create"
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
                })
                .then(res => res.json())
                .then(newCard => {
                    allFlashcards.push(newCard)
                    console.log('after create card: ', allFlashcards)
                    fetchCards()
                    closeModal()
                })
         });
    };



    // delete cards

    card.addEventListener('click', e => {
        const clickedCard = e.target.parentElement
        const foundCard = allFlashcards.find(fcard => {
            return fcard.id == clickedCard.dataset.card
        })
        console.log(foundCard)
        if (e.target.id == "delete-card") {
            console.log(card.parentElement)
            card.lastElementChild.remove(clickedCard)
            confirm("Do you want to delete this card?")
            fetch(`http://localhost:9000/api/v1/flashcards/${foundCard.id}`, {
                method: "DELETE"
            })
                originalCardIndex = allFlashcards.indexOf(foundCard)
                allFlashcards.splice(originalCardIndex, 1)
                console.log("in Delete:", allFlashcards)
                
        };
    });

    
    // edit cards 
    card.addEventListener('click', e => {
        const clickedCard = e.target.parentElement
        const foundCard = allFlashcards.find(fcard => {
            return fcard.id == clickedCard.dataset.card
        })
        
        if (e.target.id == "edit-card" && foundCard) {
            console.log("I WAS CLICKED BUT DIDN'T MAKE IT")
            const cardFront = card.querySelector('.front').innerText
            const cardBack = card.querySelector('.back').innerText 
            openModal(x=1, cardFront, cardBack, foundCard)
            // editCard(cardFront, cardBack, foundCard)
        }
     });
        
    const editCard = (cardFront, cardBack, foundCard) => {
        console.log("in editcard")
       
            document.getElementById('card-front').value = cardFront
            document.getElementById('card-back').value = cardBack
            let submitBtn = document.getElementById('submit')
            submitBtn.innerText = "Edit"
            form.addEventListener('submit', e => { 
             e.preventDefault()
            const editedCardFront = document.getElementById('card-front').value
            const editedCardBack = document.getElementById('card-back').value
            fetch(`http://localhost:9000/api/v1/flashcards/${foundCard.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    body_front: editedCardFront,
                    body_back: editedCardBack
                })
            })
            .then(res => res.json())
            .then(editedCard => {
                originalCardIndex = allFlashcards.indexOf(foundCard)
                allFlashcards.splice(originalCardIndex, 1, editedCard)
                console.log("in Edit:", allFlashcards)
            });
        });
    };
    
   fetchCards() 


}); // end DOMContentLoaded

