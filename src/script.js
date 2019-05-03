document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM is loaded");


    let allFlashcards = [];
    let cardToggle = false

    const card = document.querySelector('#card')
    const form = document.getElementById('form')




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
            return card.innerHTML += `
            <section class="container">
            <div id="card">
            <div data-id=${c.id}>
            <figure class="front">${c.body_front}</figure>
            <figure class="back">${c.body_back}</figure>
            </div>
            </div>
            </section><br />   
            `
        })
    };

    // listen for card click

    const cards = document.querySelectorAll('.card');
    cards.forEach(c => c.addEventListener("click",  () => c.classList.toggle('flipped')))
           
        
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