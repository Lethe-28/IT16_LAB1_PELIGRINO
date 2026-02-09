// Function to handle the buttons
function cipherAction(type) {
    // 1. Get values from the input fields
    const name = document.getElementById('nameInput').value;
    const year = document.getElementById('yearInput').value;
    const course = document.getElementById('courseInput').value;
    const n = parseInt(document.getElementById('shiftN').value);

    // 2. Simple validation check 
    if (!name || !year || !course) {
        alert("Please fill in all your details first!");
        return;
    }

    // 3. Combine the identity string [cite: 9, 28]
    const fullIdentity = name + " | " + year + " | " + course;
    document.getElementById('combinedText').innerText = fullIdentity;

    // 4. Run the shift math
    let output = "";
    const isEncrypt = (type === 'encrypt');
    
    output = caesarLogic(fullIdentity, n, isEncrypt);
    document.getElementById('resultText').innerText = output;
}

// The math logic for Caesar Cipher
function caesarLogic(str, shift, encrypt) {
    let result = "";
    
    // Reverse shift if we are decrypting [cite: 26, 82]
    let move = encrypt ? shift : -shift;

    for (let i = 0; i < str.length; i++) {
        let char = str[i];

        // Check if it's a letter (ignore numbers/symbols) [cite: 14, 29]
        if (char.match(/[a-z]/i)) {
            let code = str.charCodeAt(i);
            let base = (code >= 65 && code <= 90) ? 65 : 97; // Handle Upper vs Lower
            
            // Apply formula: (X + N) % 26 [cite: 24, 82]
            let shiftedCode = ((code - base + move) % 26);
            
            // Fix for JS negative modulo 
            if (shiftedCode < 0) shiftedCode += 26;
            
            char = String.fromCharCode(shiftedCode + base);
        }
        result += char;
    }
    return result;
}

// Reset button logic
function clearAll() {
    document.getElementById('nameInput').value = "";
    document.getElementById('yearInput').value = "";
    document.getElementById('courseInput').value = "";
    document.getElementById('shiftN').value = 3;
    document.getElementById('combinedText').innerText = "---";
    document.getElementById('resultText').innerText = "---";
}