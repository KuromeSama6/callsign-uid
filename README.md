# callsign-uid
A NodeJS package that generates easily memorizable unqiue ids.

---
## Usage
To create a random CUID:
```js
const Cuid = require("callsign-uid");
var myCuid = new Cuid().text;
```

To convert from Denary to CUID:
```js
const Cuid = require("callsign-uid");
const myNum = 415898986;
var myCuid = Cuid.FromDenary(myNum);
console.log(myCuid.text); //ALJET959L (lower case)
```

---
## How it works
CUID generates a uid has the format of `[Pronounceable 5-letter word][3 digits][1 single letter]`. Combined, this algorithm yields around 1,142,400,000 (1 billion) unique ids. Multiple CUIDs can be combined to yield more unique ids.

We will focus on the generation of the pronounceable 5-letter word. The 3 digits and 1 letter are simple randomly chosen from a character set. In the following explanation, the letter `V` will be used to represent a **Vowel**, and the letter `C` will represent a **Consonant**. The letter `Y` does not count as a vowel, nor a consonant. It is only used for special purposes..

Suppose a 5-letter phrase, `12345`, where each number represents the corresponding character in a pronounceable 5-letter word, the rules are:

- The arrangement of `12` must be either `VC` or `CV`.
- The arrangement of `345` must be exactly `CVC`.
- If `2` is a consonant, then `3` cannot be the same as `2`. If `3` is the sames as `2` when randomly generated, `3` will use the character `Y`.

This is guaranteed to produce a pronounceable word. For example:

```
AVBOX
DAHOT
TURET
```

A full CUID could look like:
```
AVBOX681D
DAHOT039A
TURET223Q
QULEM001D
```
Note that `0`s is padded to the front of the three-digit number.

---

## Conversion From Denary
Sometimes there may be the need to convert a number into a CUID. Heres how it works:

Counting in CUID works the same way as denary numbers. You count up from the rightmost number, and when that number reaches the limit, your increment the number to the left of it by 1. With CUID, it is the same. You start from the rightmost. Note that there are no capitalization. Assume all characters are upper or lower case.

Some rules regarding counting:
- For the three digits, `0` is the lowest data level, `9` is the highest data level.
- For any vowel, `A` is the lowest data level, `U` is the highest.
- For any consonants, `B` is the lowest data level, `Z` is the highest.

According to these rules, the denary number `0` would translate to `ABCAB000A` in CUID. The denary number `1` would translate to `ABCAB000B`.

---
## Flaws
It is important to know that an algorithm that generates a pronounceable word is prone to generating innapropriate or vulgar words. While there is an filter for vulgar words, it is not fool-proof.