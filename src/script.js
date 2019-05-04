document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM is loaded");
    

   


    let allFlashcards = [];
    // const form = document.getElementById('form')
    const card = document.querySelector('#card-container')




    // fetch all cards

    const fetchCards = () => {
        fetch('http://localhost:9000/api/v1/flashcards')
            .then(res => res.json())
            .then(flashcards => {
                console.log(flashcards);
                allFlashcards = flashcards
                getFlashcards()
            });
    }


    // flip action

    const getFlashcards = () => {
        return allFlashcards.map(c => {
            return card.innerHTML += `
           <div class="container">
             <div class="card">
                 <h4 class="front" data-id=${c.id}>${c.body_front}</h4>
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

 
    
    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     const cardFront = document.getElementById('card-front').value
    //     const cardBack = document.getElementById('card-back').value
    //     fetch('http://localhost:9000/api/v1/flashcards', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify({
    //             body_front: cardFront,
    //             body_back: cardBack
    //         })
    //     }).then(res => res.json())
    //         .then(newCard => {
    //             allFlashcards.push(newCard)

    //         })
    // });


    // delete cards



    fetchCards()

}); // end DOMContentLoaded