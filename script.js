
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedElement = document.getElementById('typed-value');

let words = [];
let wordIndex = 0;
let startTime = Date.now();



// Quotes 
const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

document.getElementById('start').addEventListener('click', () => {
    // get a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    // Put the quote into an array of words
    words = quote.split(' ');
    // reset the word index for tracking
    wordIndex = 0;
  
    // UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.innerText = '';
  
    // Setup the textbox
    // Clear the textbox
    typedElement.value = '';
    // set focus
    typedElement.focus();
    // set the event handler
  
    // Start the timer
    startTime = new Date().getTime();
  });

  typedElement.addEventListener('input', () => {

    // get the current word
    const currentWord = words[wordIndex];

    // get the current value
    const typedValue = typedElement.value;


    if (typedValue === currentWord && wordIndex === words.length - 1){
        // end of sentence
        // Display success
        const elapsedTime = new Date().getTime() - startTime;

        const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
        
        messageElement.innerHTML = message;

    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        // end of word
        // clear the typedValueElement for the new word
        typedElement.value = '';
        // move to the next word
        wordIndex++;
        // reset the class name for all elements in quote
        for (const wordElement of quoteElement.childNodes) {
          wordElement.className = '';
        }

        // highlight the new word
        quoteElement.childNodes[wordIndex].className = 'highlight';
        
      } else if (currentWord.startsWith(typedValue)) {
        // currently correct
        // highlight the next word
        typedElement.className = '';
      } else {
        // error state
        typedElement.className = 'error';
      }
  });