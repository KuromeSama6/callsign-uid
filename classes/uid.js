const vowels = "aeiou";
const chrSet = "abcdefghijklmnopqrstuvwxz"
const consonants = "bcdfghjklmnpqrstvwxz";
const digits = "0123456789";
const uidLength = 5;

class Cuid {
    fix = "*****"; // Five readables
    idNum = NaN;
    id = "***"; // Three digits
    sector = "*"; // Last sector

    get text(){
        return `${this.fix}${this.id}${this.sector}`;
    }

    static Random(){
        const ret = new Cuid();
        console.log(generatePronounceableWord());

    }

    static FromDenary(num){
        if (num >= Math.pow(chrSet.length, 2) * Math.pow(consonants.length, 3) * vowels.length * 1000) throw new CUIDOverflowException(`CUID Overflowed ${num} >= 25000000000`);
        
        const alphabetLength = chrSet.length;
        const vowelLength = vowels.length;
        const consonantLength = consonants.length;

        // the last 4 digits - there are 10^3 * 26 possible combinations
        var ret = new Cuid();
        ret.sector = (num % alphabetLength).toChr();

        ret.idNum = Math.floor(num / alphabetLength) % 1000;
        ret.id = (ret.idNum).toString().padStart(3, "0");

        const fix = ["*", "*", "*", "*", "*"];
        fix[4] = Math.floor(num / 25000).toChr(consonants);
        fix[3] = Math.floor(num / (25000 * consonantLength)).toChr(vowels);

        // the hard part
        // we will let fix[2] take priority first, and then recalculate if fix[1] is the same as fix[2]
        var fix2 = Math.floor(num / (25000 * consonantLength * vowelLength)).toChr(consonants);
        var fix1 = Math.floor(num / (25000 * consonantLength * vowelLength * consonantLength)).toChr(consonants.concat(vowels));
        var fix0 = Math.floor(num / (25000 * consonantLength * vowelLength * consonantLength * consonants.concat(vowels).length)).toChr(vowels.includes(fix1) ? consonants : vowels);

        if (fix1 == fix2) fix2 = "y";

        fix[2] = fix2;
        fix[1] = fix1;
        fix[0] = fix0;

        ret.fix = fix.join("");

        return ret;
    }

}

class CUIDOverflowException {
    constructor(message) {
      this.message = message;
      this.name = "CUIDOverflowException";
    }
}

function generatePronounceableWord(){
    // Generate the first two characters
    const firstCharSet = Math.random() < 0.5 ? vowels : consonants;
    const secondCharSet = firstCharSet === vowels ? consonants : vowels;
    const secondChar = secondCharSet.randomSample();
    const firstTwoChars = `${firstCharSet.randomSample()}${secondChar}`;
    
    // Generate the last three characters
    let lastThreeChars = "";
    for (let i = 0; i < uidLength - 2; i++) {
        var charSet;
        switch (i){
            case 0:
                charSet = secondCharSet === consonants ? consonants.replace(secondChar, "") : consonants;
                break;
            case 1: charSet = vowels; break;
            case 2: charSet = consonants; break
        }
        lastThreeChars += charSet.randomSample();
    }
    
    return `${firstTwoChars}${lastThreeChars}`;
}

module.exports = Cuid;