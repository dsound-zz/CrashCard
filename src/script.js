document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM is loaded");


    let allFlashcards = [];
    let cardToggle = false

        const form = document.getElementById('form')
        const cardContainer = document.getElementById('card-container')



    // fetch all cards

    const fetchCards = () => {
        fetch('http://localhost:9000/api/v1/flashcards')
            .then(res => res.json())
            .then(flashcards => {
                allFlashcards = flashcards
                getFlashcards()
            });
    }

    
    // flip action 

    const getFlashcards = () => {
        return allFlashcards.map(c => {
            return cardContainer.innerHTML += `
            <div class="scene scene--card">
             <div class="card">
                <div class="card__face card__face--front">${c.body_front}</div>
                <div class="card__face card__face--back">${c.body_back}</div>
             </div>
            </div>
            <br />   
            `
        })
    };

    // listen for card click

    const cards = document.querySelectorAll('.card');
        cards.forEach(c => c.addEventListener("click",  () => c.classList.toggle('is-flipped')))
           
        
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