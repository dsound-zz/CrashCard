document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM is loaded");


    let allFlashcards = [];
    let cardToggle = false
    const form = document.getElementById('form')
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

            })
    });

    fetchCards()

}); // end DOMContentLoaded