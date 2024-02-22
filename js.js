var level = 0; // 1 - easy, 2 - medium, 3 - hard
var playername;
var playercards;
var numoponents;
var massage;
var turn; // 0 - player0, 1 - player1....
var beg;
var hard;
var med;
var chosenCard = [];
var player0cards = [];
var player1cards = [];
var player2cards = [];
var player3cards = [];
var sumplayer0 = 0;
var sumplayer1 = 0;
var sumplayer2 = 0;
var sumplayer3 = 0;
var arr;
var floorcards = [];
function verify(){
    playername = document.getElementById('username').value;
    numoponents = document.getElementById('numoponents').value;
    beg = document.getElementById('beginner');
    med = document.getElementById('medium');
    hard = document.getElementById('hard');
    massage = document.getElementById('mainmsg');
    if(playername.length <= 0){
        massage.innerHTML = "ERROR: Invalid Player Name";
        massage.style.color = "red";
        massage.style.fontWeight = "600";
        
    }
    if(beg.checked){
        level = 1;
    }else if(med.checked){
        level = 2;
    }else if(hard.checked){
        level = 3;
    }
    if(level == 0){
        massage.innerHTML = "ERROR: Please Choose Level";
        massage.style.color = "red";
        massage.style.fontWeight = "600";
        
    }
    start();
}
function start(){
    document.getElementById('fm').style.display = "none";
    document.getElementById('maincont').style.display = "none";
    document.getElementById('gamecont').style.display = "block"
    for(i = 0; i <= numoponents; i++){
        var pc = document.getElementById('pcards'+i);
        console.log('pcards'+i);
        while (pc.firstChild) {
            pc.removeChild(pc.firstChild);
        }
    }
    fc = document.getElementById('floor');
    while (fc.firstChild) {
        fc.removeChild(fc.firstChild);
    }
    for(i = 1; i <= numoponents; i++){
        document.getElementById('player'+i).style.display = "inline-block";
    }
    turn = 0;
    arr = [
        "1Y","1T","1L","1A", "2Y","2T","2L","2A",
        "3Y","3T","3L","3A", "4Y","4T","4L","4A",
        "5Y","5T","5L","5A", "6Y","6T","6L","6A",
        "7Y","7T","7L","7A", "8Y","8T","8L","8A",
        "9Y","9T","9L","9A", "10Y","10T","10L","10A",
        "11Y","11T","11L","11A", "12Y","12T","12L","12A",
        "13Y","13T","13L","13A"];
    var x = Math.floor(Math.random()*arr.length);
    var floorcard = document.getElementById('floor').appendChild(document.createElement('span'));
    floorcard.setAttribute("class", "card");
    floorcard.setAttribute("id", arr[x]);
    floorcard.setAttribute("onclick", "switchcard(this)");
    floorcard.innerHTML = arr[x];
    floorcards.push(arr[x]);
    arr.splice(x,1);
    var pcards = document.getElementById('pcards0');
    for(i = 0; i < 4; i++){
        x = Math.floor(Math.random()*arr.length);
        cardi = pcards.appendChild(document.createElement("span"));
        cardi.setAttribute("class", "card");
        cardi.setAttribute("id", arr[x]);
        cardi.setAttribute("onclick", "pickCard(this)");
        cardi.innerHTML = arr[x];
        player0cards.push(arr[x]);
        arr.splice(x,1);
    }
    for(i = 0; i < numoponents; i++){
        for(j = 0; j < 4; j++){
            pcards = document.getElementById('pcards'+(i+1));
            x = Math.floor(Math.random()*arr.length);
            cardi = pcards.appendChild(document.createElement("span"));
            cardi.setAttribute("class", i==1?'card3':'card2');
            cardi.setAttribute("id", arr[x]);
            cardi.innerHTML = arr[x];
            if(i == 0){
                player1cards.push(arr[x]);
            }else if(i == 1){
                player2cards.push(arr[x]);
            }else if(i == 2){
                player3cards.push(arr[x]);
            }
            arr.splice(x,1);
        }
    }
    sumplayer0 = 0
    for(i = 0; i < player0cards.length; i++){
        sumplayer0 += Number((cardNum(player0cards[i])));
    }
    document.getElementById('summsg').innerHTML = sumplayer0;
    sumplayer1 = 0
    for(i = 0; i < player1cards.length; i++){
        sumplayer1 += Number((cardNum(player1cards[i])));
    }
    sumplayer2 = 0
    for(i = 0; i < player2cards.length; i++){
        sumplayer2 += Number((cardNum(player2cards[i])));
    }
    sumplayer3 = 0
    for(i = 0; i < player3cards.length; i++){
        sumplayer3 += Number((cardNum(player3cards[i])));
    }
    console.log("player1:" + sumplayer1);
    console.log("player2:" + sumplayer2);
    console.log("player3:" + sumplayer3);
    console.log('floor cards:' + floorcards);
}

function updateSum(){
    if(turn == 0){
        sumplayer0 = 0
        for(i = 0; i < player0cards.length; i++){
            sumplayer0 += Number((cardNum(player0cards[i])));
        }
        document.getElementById('summsg').innerHTML = sumplayer0;
    }else if(turn == 1){
        sumplayer1 = 0
        for(i = 0; i < player1cards.length; i++){
            sumplayer1 += Number((cardNum(player1cards[i])));
        }
    }else if(turn == 2){
        sumplayer2 = 0
        for(i = 0; i < player2cards.length; i++){
            sumplayer2 += Number((cardNum(player2cards[i])));
        }
    }else if(turn == 3){
        sumplayer3 = 0
        for(i = 0; i < player3cards.length; i++){
            sumplayer3 += Number((cardNum(player3cards[i])));
        }
    }
}

function pickCard(card){
    if(chosenCard.length > 0){
        for(i = 0; i < chosenCard.length; i++){
            if(chosenCard[i] === card){
                chosenCard[i].style.bottom = "0px";
                chosenCard.splice(i,1);
                return;
            }
        }
        for(i = 0; i < chosenCard.length; i++){
            if(equalcards(chosenCard[i].id) == equalcards(card.id)){
                card.style.bottom = "20px";
                chosenCard.push(card);
                return;
            }
        }
    }else{
        card.style.bottom = "20px";
        chosenCard.push(card);
    }
}
function cardNum(cardid){
    var num = cardid.match(/\d/g);
    num = num.join("");
    if(num > 10){
        return 10;
    }
    return num
}
function packetCard(){
    if(arr.length <= 0 || chosenCard.length <= 0){
        return;
    }
    if(turn == 0){
        fc = document.getElementById('floor');
        pc = document.getElementById('pcards0');
        while (fc.firstChild) {
            fc.removeChild(fc.firstChild);
        }
        floorcards = [];
        for(i = 0; i < chosenCard.length; i++){
            var nfc = fc.appendChild(document.createElement('span'));
            nfc.setAttribute('class', 'card');
            nfc.setAttribute('id', chosenCard[i].id);
            nfc.setAttribute('onclick', 'switchcard(this)')
            nfc.innerHTML = chosenCard[i].id;
            floorcards.push(chosenCard[i].id);
        }
        for(i = 0; i < player0cards.length; i++){
            for(j = 0; j < floorcards.length; j++)
            if(player0cards[i] == floorcards[j]){
                player0cards.splice(i,1);
                i -= 1;
            }
        }
        chosenCard = []
        while (pc.firstChild) {
            pc.removeChild(pc.firstChild);
        }
        for(i = 0; i < player0cards.length; i++){
            var npc = pc.appendChild(document.createElement('span'));
            npc.setAttribute('class', 'card');
            npc.setAttribute('id', player0cards[i]);
            npc.setAttribute('onclick', 'pickCard(this)');
            npc.innerHTML = player0cards[i];
        }
        var x = Math.floor(Math.random()*arr.length);
        var pcards = document.getElementById('pcards0');
        cardi = pcards.appendChild(document.createElement("span"));
        cardi.setAttribute("class", "card");
        cardi.setAttribute("id", arr[x]);
        cardi.setAttribute("onclick", "pickCard(this)");
        cardi.innerHTML = arr[x];
        player0cards.push(arr[x])
        updateSum();
        arr.splice(x,1);
        turn += 1;
        Oponentplay();
    }
}
function switchcard(card){
    if(chosenCard.length <= 0){
        return;
    }
    if(turn == 0){
        for(i = 0; i < chosenCard.length; i++){
            for(j = 0; j < player0cards.length; j++){
                if(chosenCard[i].id == player0cards[j]){
                    player0cards.splice(j,1);
                    chosenCard[i].remove();
                    break;
                }
            }
        }
        player0cards.push(card.id);
        newdeckcard = document.getElementById('pcards0').appendChild(document.createElement('span'));
        newdeckcard.setAttribute('class', 'card');
        newdeckcard.setAttribute('id', card.id);
        newdeckcard.setAttribute('onclick', 'pickCard(this)');
        newdeckcard.innerHTML = card.id;
        var floors = document.getElementById('floor');
        while (floors.firstChild) {
            floors.removeChild(floors.firstChild);
        }
        floorcards = []
        for(i = 0; i < chosenCard.length; i++){
            newfloorcard = document.getElementById('floor').appendChild(document.createElement('span'));
            newfloorcard.setAttribute('class', 'card');
            newfloorcard.setAttribute('id', chosenCard[i].id);
            newfloorcard.setAttribute('onclick', 'switchcard(this)');
            newfloorcard.innerHTML = chosenCard[i].id;
            floorcards.push(chosenCard[i].id);
        }
        chosenCard = [];
        updateSum();
        console.log('player cards array:' + player0cards);
        console.log('floor cards:' + floorcards);
        turn += 1;
        Oponentplay();
    }
}
function equalcards(cardid){
    var num = cardid.match(/\d/g);
    num = num.join("");
    return num
}
function max(array){ //find maximum in array
    var temp = 0;
    for(i = 0; i < array.length; i++){
        if(temp < array[i]){
            temp = array[i];
        }
    }
    return temp;
}
function min(array){ //find minimum in array
    var temp = array[0];
    for(i = 0; i < array.length; i++){
        if(temp > array[i]){
            temp = array[i];
        }
    }
    return temp;
}
function sum(array){ //sum the array
    var sum = 0;
    for(i = 0; i < array.length; i++){
        sum += Number(array[i]);
    }
    return sum;
}
function findMaxInCards(cardarray){
    res = []
    for(i = 0; i < cardarray.length; i++){
        res.push(Number(equalcards(cardarray[i])));
    }
    return max(res);
}
function findMinInCards(cardarray){
    res = []
    for(i = 0; i < cardarray.length; i++){
        res.push(Number(cardNum(cardarray[i])));
    }
    return min(res);
}
async function sleep(seconds){
    return new Promise((resolve)=>setTimeout(resolve, seconds*1000));
}
async function Oponentplay(){
    if(turn == 1){
        await sleep(Math.floor(Math.random()*2 + 1));
        console.log('player1:' + player1cards);
        console.log('floor: ' + floorcards);
        var flag1 = 1; // 1 - keep going 0 - go for combo
        var flag2 = 0; // 1 - i have combo
        var flag3 = 0; // 1 - floor have lower card than my max
        var combo = [];
        for(i = 0; i < player1cards.length; i++){
            for(j = 0; j < player1cards.length; j++){
                if(i == j){
                    continue;
                }
                if(equalcards(player1cards[i]) === equalcards(player1cards[j])){
                    flag2 = 1;
                    combo.push(player1cards[i]);
                    console.log(combo);
                    break;
                }
            }
        }
        if(flag2 == 1){ //check and handle combo:
            var comboid = []; //save the combo id cards for future casting
            for(i = 0; i < combo.length; i++){
                comboid.push(combo[i]);
                combo[i] = cardNum(combo[i]);
            }
            console.log('comboid'+comboid);
            combo.sort();
            for(i = 0; i < combo.length; i++){ //max combo stays
                if(combo[i] != combo[combo.length -1]){
                    combo.splice(i,1)
                    i -= 1;
                }
            }
            for(i = 0; i < comboid.length; i++){ //6S 5A 6L// 6 6
                for(j = 0; j < combo.length; j++){
                    if(combo[j] != cardNum(comboid[i])){
                        comboid.splice(i,1);
                        i -= 1;
                        break;
                    }
                }
            }
            console.log('comboid'+comboid);
            for(i = 0; i < combo.length; i++){
                cardNum(String(combo[i]))//giving them the real value - 11/12.. -> 10
            }
            floornums = [];
            for(i = 0; i < floorcards.length; i++){
                floornums.push(cardNum(floorcards[i]));
            }
            console.log('floornums:' + floornums);
            console.log(combo);
            if(sum(combo) < min(floornums)){
                if(sum(combo) > 4){ //better for hard mode
                    flag1 = 0;
                    floordeck = document.getElementById('floor');
                    playerdeck = document.getElementById('pcards1');
                    while (floordeck.firstChild) {
                        floordeck.removeChild(floordeck.firstChild);
                    }
                    combo = comboid;// casting
                    for(i = 0; i < combo.length; i++){
                        var fc = floordeck.appendChild(document.createElement('span'));
                        fc.setAttribute('class', 'card');
                        fc.setAttribute('id', combo[i]);
                        fc.setAttribute('onclick', 'switchcard(this)');
                        fc.innerHTML = combo[i];
                    }
                    floorcards = [];
                    for(i = 0; i < combo.length; i++){
                        floorcards.push(combo[i]);
                    }
                    while (playerdeck.firstChild) {
                        playerdeck.removeChild(playerdeck.firstChild);
                    }
                    for(i = 0; i < player1cards.length; i++){
                        for(j = 0; j < floorcards.length; j++){
                            if(player1cards[i] == floorcards[j]){
                                i -= 1;
                                player1cards.splice(i,1);
                            }
                        }
                    }
                    for(i = 0; i < player1cards.length; i++){
                        var nc = playerdeck.appendChild(document.createElement('span'));
                        nc.setAttribute('class', 'card2')
                        nc.setAttribute('id', player1cards[i])
                        nc.innerHTML = player1cards[i];
                    }
                    var x = Math.floor(Math.random()*arr.length);
                    nc = playerdeck.appendChild(document.createElement("span"));
                    nc.setAttribute("class", "card2");
                    nc.setAttribute("id", arr[x]);
                    nc.innerHTML = arr[x];
                    player1cards.push(arr[x])
                    arr.splice(x,1);  
                    updateSum();
                    turn += 1
                    if(numoponents < turn){
                        turn = 0;
                    }
                    console.log(turn);
                }
            }else if(sum(combo) > min(floornums)){
                flag1 = 0;
                // need to check if there is an queal on floor
                //check the best card to pick
                var minfloor = 25;
                for(i = 0; i < floorcards.length; i++){
                    if(minfloor > Number(cardNum(floorcards[i]))){
                        minfloor = Number(cardNum(floorcards[i]));
                    }
                }
                console.log("minfloor: " + minfloor); // best card to pick
                playerdeck = document.getElementById('pcards1');
                floordeck = document.getElementById('floor');
                while (floordeck.firstChild) {
                    floordeck.removeChild(floordeck.firstChild);
                }
                combo = comboid;// casting
                for(i = 0; i < combo.length; i++){
                    var fc = floordeck.appendChild(document.createElement('span'));
                    fc.setAttribute('class', 'card');
                    fc.setAttribute('id', combo[i]);
                    fc.setAttribute('onclick', 'switchcard(this)');
                    fc.innerHTML = combo[i];
                }
                for(i = 0; i < floorcards.length; i++){
                    if(minfloor == cardNum(floorcards[i])){
                        minfloor = floorcards[i];
                    }
                }
                floorcards = [];
                for(i = 0; i < combo.length; i++){
                    floorcards.push(combo[i]);
                }
                for(i = 0; i < player1cards.length; i++){
                    for(j = 0; j < floorcards.length; j++){
                        if(player1cards[i] == floorcards[j]){
                            player1cards.splice(i,1);
                        }
                    }
                }
                player1cards.push(minfloor);
                //update dom of oponent
                while (playerdeck.firstChild) {
                    playerdeck.removeChild(playerdeck.firstChild);
                }
                for(i = 0; i < player1cards.length; i++){
                var nc = playerdeck.appendChild(document.createElement('span'));
                nc.setAttribute('class', 'card2')
                nc.setAttribute('id', player1cards[i])
                nc.innerHTML = player1cards[i];
                }
                console.log(floorcards);
                console.log(player1cards);
                updateSum();
                turn += 1
                if(numoponents < turn){
                    turn = 0;
                }
                console.log(turn);
            }
        }
        if(flag1 == 1){
            var maxhand = findMaxInCards(player1cards);
            for(i = 0; i < floorcards.length; i++){
                if(maxhand > cardNum(floorcards[i])){
                    flag3 = 1;
                }
            }
            console.log(flag3);
            console.log('maxhandb ' + maxhand);
            if(flag3 == 1){ //switch with the floor
                minhand = findMinInCards(floorcards);
                var minhandId = 0;
                var maxhandId = 0;
                for(i = 0 ; i < floorcards.length; i++){
                    if(minhand == cardNum(floorcards[i])){
                        minhandId = floorcards[i];
                        floorcards.splice(i,1);
                        break;
                    }
                }
                for(i = 0; i < player1cards.length; i++){
                    if(maxhand == equalcards(player1cards[i])){
                        maxhandId = player1cards[i];
                        player1cards.splice(i,1);
                        break;
                    }
                }
                console.log('aaaaaa' + minhandId);
                console.log(maxhandId);
                playerdeck = document.getElementById('pcards1');
                floordeck = document.getElementById('floor');
                while (floordeck.firstChild) {
                    floordeck.removeChild(floordeck.firstChild);
                }
                fc = floordeck.appendChild(document.createElement('span'));
                fc.setAttribute('class', 'card');
                fc.setAttribute('id', maxhandId);
                fc.setAttribute('onclick', 'switchcard(this)');
                fc.innerHTML = maxhandId;

                while (playerdeck.firstChild) {
                    playerdeck.removeChild(playerdeck.firstChild);
                }
                player1cards.push(minhandId);
                for(i = 0; i < player1cards.length; i++){
                    nc = playerdeck.appendChild(document.createElement('span'));
                    nc.setAttribute('class','card2');
                    nc.setAttribute('id', player1cards[i]);
                    nc.innerHTML = player1cards[i];
                }
                console.log(floorcards);
                console.log(player1cards);
                updateSum();
                turn += 1
                if(numoponents < turn){
                    turn = 0;
                }
                console.log(turn);
            }else{  // take card from deck
                var maxhand = findMaxInCards(player1cards);
                if(sumplayer1 <= 7){
                    oponentyaniv();
                    return;
                }
                fc = document.getElementById('floor');
                pc = document.getElementById('pcards1');
                while (fc.firstChild) {
                    fc.removeChild(fc.firstChild);
                }
                floorcards = [];
                for(i = 0; i < player1cards.length; i++){
                    if(maxhand == equalcards(player1cards[i])){
                        maxhandId = player1cards[i];
                        player1cards.splice(i,1);
                        break;
                    }
                }
                var nfc = fc.appendChild(document.createElement('span'));
                nfc.setAttribute('class', 'card');
                nfc.setAttribute('id', maxhandId);
                nfc.setAttribute('onclick', 'switchcard(this)')
                nfc.innerHTML = maxhandId;
                floorcards.push(maxhandId);

                for(i = 0; i < player1cards.length; i++){
                    if(player1cards[i] == maxhandId){
                        player1cards.splice(i,1);
                        break;
                    }
                }
                while (pc.firstChild) {
                    pc.removeChild(pc.firstChild);
                }
                for(i = 0; i < player1cards.length; i++){
                    var npc = pc.appendChild(document.createElement('span'));
                    npc.setAttribute('class', 'card2');
                    npc.setAttribute('id', player1cards[i]);
                    npc.setAttribute('onclick', 'pickCard(this)');
                    npc.innerHTML = player1cards[i];
                }
                var x = Math.floor(Math.random()*arr.length);
                var pcards = document.getElementById('pcards1');
                nc = pcards.appendChild(document.createElement("span"));
                nc.setAttribute("class", "card2");
                nc.setAttribute("id", arr[x]);
                nc.innerHTML = arr[x];
                player1cards.push(arr[x])
                arr.splice(x,1);  
                updateSum();
                turn += 1
                if(numoponents < turn){
                    turn = 0;
                }
                console.log(turn);
            }
            
        }
    }
    if(turn == 2){
        await sleep(Math.floor(Math.random()*2 + 1));
        console.log('player1:' + player1cards);
        console.log('floor: ' + floorcards);
        var flag1 = 1; // 1 - keep going 0 - go for combo
        var flag2 = 0; // 1 - i have combo
        var flag3 = 0; // 1 - floor have lower card than my max
        var combo = [];
        for(i = 0; i < player2cards.length; i++){
            for(j = 0; j < player2cards.length; j++){
                if(i == j){
                    continue;
                }
                if(equalcards(player2cards[i]) === equalcards(player2cards[j])){
                    flag2 = 1;
                    combo.push(player2cards[i]);
                    console.log(combo);
                    break;
                }
            }
        }
        if(flag2 == 1){ //check and handle combo:
            var comboid = []; //save the combo id cards for future casting
            for(i = 0; i < combo.length; i++){
                comboid.push(combo[i]);
                combo[i] = cardNum(combo[i]);
            }
            console.log('comboid'+comboid);
            combo.sort();
            for(i = 0; i < combo.length; i++){ //max combo stays
                if(combo[i] != combo[combo.length -1]){
                    combo.splice(i,1)
                    i -= 1;
                }
            }
            for(i = 0; i < comboid.length; i++){ //6S 5A 6L// 6 6
                for(j = 0; j < combo.length; j++){
                    if(combo[j] != cardNum(comboid[i])){
                        comboid.splice(i,1);
                        i -= 1;
                        break;
                    }
                }
            }
            console.log('comboid'+comboid);
            for(i = 0; i < combo.length; i++){
                cardNum(String(combo[i]))//giving them the real value - 11/12.. -> 10
            }
            floornums = [];
            for(i = 0; i < floorcards.length; i++){
                floornums.push(cardNum(floorcards[i]));
            }
            console.log('floornums:' + floornums);
            console.log(combo);
            if(sum(combo) < min(floornums)){
                if(sum(combo) > 4){ //better for hard mode
                    flag1 = 0;
                    floordeck = document.getElementById('floor');
                    playerdeck = document.getElementById('pcards2');
                    while (floordeck.firstChild) {
                        floordeck.removeChild(floordeck.firstChild);
                    }
                    combo = comboid;// casting
                    for(i = 0; i < combo.length; i++){
                        var fc = floordeck.appendChild(document.createElement('span'));
                        fc.setAttribute('class', 'card');
                        fc.setAttribute('id', combo[i]);
                        fc.setAttribute('onclick', 'switchcard(this)');
                        fc.innerHTML = combo[i];
                    }
                    floorcards = [];
                    for(i = 0; i < combo.length; i++){
                        floorcards.push(combo[i]);
                    }
                    while (playerdeck.firstChild) {
                        playerdeck.removeChild(playerdeck.firstChild);
                    }
                    for(i = 0; i < player2cards.length; i++){
                        for(j = 0; j < floorcards.length; j++){
                            if(player2cards[i] == floorcards[j]){
                                i -= 1;
                                player2cards.splice(i,1);
                            }
                        }
                    }
                    for(i = 0; i < player2cards.length; i++){
                        var nc = playerdeck.appendChild(document.createElement('span'));
                        nc.setAttribute('class', 'card3')
                        nc.setAttribute('id', player2cards[i])
                        nc.innerHTML = player2cards[i];
                    }
                    var x = Math.floor(Math.random()*arr.length);
                    nc = playerdeck.appendChild(document.createElement("span"));
                    nc.setAttribute("class", "card3");
                    nc.setAttribute("id", arr[x]);
                    nc.innerHTML = arr[x];
                    player2cards.push(arr[x])
                    arr.splice(x,1);  
                    updateSum();
                    turn += 1
                    if(numoponents < turn){
                        turn = 0;
                    }
                    console.log(turn);
                }
            }else if(sum(combo) > min(floornums)){
                flag1 = 0;
                // need to check if there is an queal on floor
                //check the best card to pick
                var minfloor = 25;
                for(i = 0; i < floorcards.length; i++){
                    if(minfloor > Number(cardNum(floorcards[i]))){
                        minfloor = Number(cardNum(floorcards[i]));
                    }
                }
                console.log("minfloor: " + minfloor); // best card to pick
                playerdeck = document.getElementById('pcards2');
                floordeck = document.getElementById('floor');
                while (floordeck.firstChild) {
                    floordeck.removeChild(floordeck.firstChild);
                }
                combo = comboid;// casting
                for(i = 0; i < combo.length; i++){
                    var fc = floordeck.appendChild(document.createElement('span'));
                    fc.setAttribute('class', 'card');
                    fc.setAttribute('id', combo[i]);
                    fc.setAttribute('onclick', 'switchcard(this)');
                    fc.innerHTML = combo[i];
                }
                for(i = 0; i < floorcards.length; i++){
                    if(minfloor == cardNum(floorcards[i])){
                        minfloor = floorcards[i];
                    }
                }
                floorcards = [];
                for(i = 0; i < combo.length; i++){
                    floorcards.push(combo[i]);
                }
                for(i = 0; i < player2cards.length; i++){
                    for(j = 0; j < floorcards.length; j++){
                        if(player2cards[i] == floorcards[j]){
                            player2cards.splice(i,1);
                        }
                    }
                }
                player2cards.push(minfloor);
                //update dom of oponent
                while (playerdeck.firstChild) {
                    playerdeck.removeChild(playerdeck.firstChild);
                }
                for(i = 0; i < player2cards.length; i++){
                var nc = playerdeck.appendChild(document.createElement('span'));
                nc.setAttribute('class', 'card3')
                nc.setAttribute('id', player2cards[i])
                nc.innerHTML = player2cards[i];
                }
                console.log(floorcards);
                console.log(player2cards);
                updateSum();
                turn += 1
                if(numoponents < turn){
                    turn = 0;
                }
                console.log(turn);
            }
        }
        if(flag1 == 1){
            var maxhand = findMaxInCards(player2cards);
            for(i = 0; i < floorcards.length; i++){
                if(maxhand > cardNum(floorcards[i])){
                    flag3 = 1;
                }
            }
            console.log(flag3);
            console.log('maxhandb ' + maxhand);
            if(flag3 == 1){ //switch with the floor
                minhand = findMinInCards(floorcards);
                var minhandId = 0;
                var maxhandId = 0;
                for(i = 0 ; i < floorcards.length; i++){
                    if(minhand == cardNum(floorcards[i])){
                        minhandId = floorcards[i];
                        floorcards.splice(i,1);
                        break;
                    }
                }
                for(i = 0; i < player2cards.length; i++){
                    if(maxhand == equalcards(player2cards[i])){
                        maxhandId = player2cards[i];
                        player2cards.splice(i,1);
                        break;
                    }
                }
                console.log('aaaaaa' + minhandId);
                console.log(maxhandId);
                playerdeck = document.getElementById('pcards2');
                floordeck = document.getElementById('floor');
                while (floordeck.firstChild) {
                    floordeck.removeChild(floordeck.firstChild);
                }
                fc = floordeck.appendChild(document.createElement('span'));
                fc.setAttribute('class', 'card');
                fc.setAttribute('id', maxhandId);
                fc.setAttribute('onclick', 'switchcard(this)');
                fc.innerHTML = maxhandId;

                while (playerdeck.firstChild) {
                    playerdeck.removeChild(playerdeck.firstChild);
                }
                player2cards.push(minhandId);
                for(i = 0; i < player2cards.length; i++){
                    nc = playerdeck.appendChild(document.createElement('span'));
                    nc.setAttribute('class','card3');
                    nc.setAttribute('id', player2cards[i]);
                    nc.innerHTML = player2cards[i];
                }
                console.log(floorcards);
                console.log(player2cards);
                updateSum();
                turn += 1
                if(numoponents < turn){
                    turn = 0;
                }
                console.log(turn);
            }else{  // take card from deck
                var maxhand = findMaxInCards(player2cards);
                if(sumplayer2 <= 7){
                    oponentyaniv();
                    return;
                }
                fc = document.getElementById('floor');
                pc = document.getElementById('pcards2');
                while (fc.firstChild) {
                    fc.removeChild(fc.firstChild);
                }
                floorcards = [];
                for(i = 0; i < player2cards.length; i++){
                    if(maxhand == equalcards(player2cards[i])){
                        maxhandId = player2cards[i];
                        player2cards.splice(i,1);
                        break;
                    }
                }
                var nfc = fc.appendChild(document.createElement('span'));
                nfc.setAttribute('class', 'card');
                nfc.setAttribute('id', maxhandId);
                nfc.setAttribute('onclick', 'switchcard(this)')
                nfc.innerHTML = maxhandId;
                floorcards.push(maxhandId);

                for(i = 0; i < player2cards.length; i++){
                    if(player2cards[i] == maxhandId){
                        player2cards.splice(i,1);
                        break;
                    }
                }
                while (pc.firstChild) {
                    pc.removeChild(pc.firstChild);
                }
                for(i = 0; i < player2cards.length; i++){
                    var npc = pc.appendChild(document.createElement('span'));
                    npc.setAttribute('class', 'card3');
                    npc.setAttribute('id', player2cards[i]);
                    npc.setAttribute('onclick', 'pickCard(this)');
                    npc.innerHTML = player2cards[i];
                }
                var x = Math.floor(Math.random()*arr.length);
                var pcards = document.getElementById('pcards2');
                nc = pcards.appendChild(document.createElement("span"));
                nc.setAttribute("class", "card3");
                nc.setAttribute("id", arr[x]);
                nc.innerHTML = arr[x];
                player2cards.push(arr[x])
                arr.splice(x,1);  
                updateSum();
                turn += 1
                if(numoponents < turn){
                    turn = 0;
                }
                console.log(turn);
            }
        }
    }if(turn == 3){
        await sleep(Math.floor(Math.random()*2 + 1));
        console.log('player1:' + player1cards);
        console.log('floor: ' + floorcards);
        var flag1 = 1; // 1 - keep going 0 - go for combo
        var flag2 = 0; // 1 - i have combo
        var flag3 = 0; // 1 - floor have lower card than my max
        var combo = [];
        for(i = 0; i < player3cards.length; i++){
            for(j = 0; j < player3cards.length; j++){
                if(i == j){
                    continue;
                }
                if(equalcards(player3cards[i]) === equalcards(player3cards[j])){
                    flag2 = 1;
                    combo.push(player3cards[i]);
                    console.log(combo);
                    break;
                }
            }
        }
        if(flag2 == 1){ //check and handle combo:
            var comboid = []; //save the combo id cards for future casting
            for(i = 0; i < combo.length; i++){
                comboid.push(combo[i]);
                combo[i] = cardNum(combo[i]);
            }
            console.log('comboid'+comboid);
            combo.sort();
            for(i = 0; i < combo.length; i++){ //max combo stays
                if(combo[i] != combo[combo.length -1]){
                    combo.splice(i,1)
                    i -= 1;
                }
            }
            for(i = 0; i < comboid.length; i++){ //6S 5A 6L// 6 6
                for(j = 0; j < combo.length; j++){
                    if(combo[j] != cardNum(comboid[i])){
                        comboid.splice(i,1);
                        i -= 1;
                        break;
                    }
                }
            }
            console.log('comboid'+comboid);
            for(i = 0; i < combo.length; i++){
                cardNum(String(combo[i]))//giving them the real value - 11/12.. -> 10
            }
            floornums = [];
            for(i = 0; i < floorcards.length; i++){
                floornums.push(cardNum(floorcards[i]));
            }
            console.log('floornums:' + floornums);
            console.log(combo);
            if(sum(combo) < min(floornums)){
                if(sum(combo) > 4){ //better for hard mode
                    flag1 = 0;
                    floordeck = document.getElementById('floor');
                    playerdeck = document.getElementById('pcards3');
                    while (floordeck.firstChild) {
                        floordeck.removeChild(floordeck.firstChild);
                    }
                    combo = comboid;// casting
                    for(i = 0; i < combo.length; i++){
                        var fc = floordeck.appendChild(document.createElement('span'));
                        fc.setAttribute('class', 'card');
                        fc.setAttribute('id', combo[i]);
                        fc.setAttribute('onclick', 'switchcard(this)');
                        fc.innerHTML = combo[i];
                    }
                    floorcards = [];
                    for(i = 0; i < combo.length; i++){
                        floorcards.push(combo[i]);
                    }
                    while (playerdeck.firstChild) {
                        playerdeck.removeChild(playerdeck.firstChild);
                    }
                    for(i = 0; i < player3cards.length; i++){
                        for(j = 0; j < floorcards.length; j++){
                            if(player3cards[i] == floorcards[j]){
                                i -= 1;
                                player3cards.splice(i,1);
                            }
                        }
                    }
                    for(i = 0; i < player3cards.length; i++){
                        var nc = playerdeck.appendChild(document.createElement('span'));
                        nc.setAttribute('class', 'card2')
                        nc.setAttribute('id', player3cards[i])
                        nc.innerHTML = player3cards[i];
                    }
                    var x = Math.floor(Math.random()*arr.length);
                    nc = playerdeck.appendChild(document.createElement("span"));
                    nc.setAttribute("class", "card2");
                    nc.setAttribute("id", arr[x]);
                    nc.innerHTML = arr[x];
                    player3cards.push(arr[x])
                    arr.splice(x,1);  
                    updateSum();
                    turn += 1;
                    if(numoponents < turn){
                        turn = 0;
                    }
                    console.log(turn);
                }
            }else if(sum(combo) > min(floornums)){
                flag1 = 0;
                // need to check if there is an queal on floor
                //check the best card to pick
                var minfloor = 25;
                for(i = 0; i < floorcards.length; i++){
                    if(minfloor > Number(cardNum(floorcards[i]))){
                        minfloor = Number(cardNum(floorcards[i]));
                    }
                }
                console.log("minfloor: " + minfloor); // best card to pick
                playerdeck = document.getElementById('pcards3');
                floordeck = document.getElementById('floor');
                while (floordeck.firstChild) {
                    floordeck.removeChild(floordeck.firstChild);
                }
                combo = comboid;// casting
                for(i = 0; i < combo.length; i++){
                    var fc = floordeck.appendChild(document.createElement('span'));
                    fc.setAttribute('class', 'card');
                    fc.setAttribute('id', combo[i]);
                    fc.setAttribute('onclick', 'switchcard(this)');
                    fc.innerHTML = combo[i];
                }
                for(i = 0; i < floorcards.length; i++){
                    if(minfloor == cardNum(floorcards[i])){
                        minfloor = floorcards[i];
                    }
                }
                floorcards = [];
                for(i = 0; i < combo.length; i++){
                    floorcards.push(combo[i]);
                }
                for(i = 0; i < player3cards.length; i++){
                    for(j = 0; j < floorcards.length; j++){
                        if(player3cards[i] == floorcards[j]){
                            player3cards.splice(i,1);
                        }
                    }
                }
                player3cards.push(minfloor);
                //update dom of oponent
                while (playerdeck.firstChild) {
                    playerdeck.removeChild(playerdeck.firstChild);
                }
                for(i = 0; i < player3cards.length; i++){
                var nc = playerdeck.appendChild(document.createElement('span'));
                nc.setAttribute('class', 'card2')
                nc.setAttribute('id', player3cards[i])
                nc.innerHTML = player3cards[i];
                }
                console.log(floorcards);
                console.log(player3cards);
                updateSum();
                turn += 1;
                if(numoponents < turn){
                    turn = 0;
                }
                console.log(turn);
            }
        }
        if(flag1 == 1){
            var maxhand = findMaxInCards(player3cards);
            for(i = 0; i < floorcards.length; i++){
                if(maxhand > cardNum(floorcards[i])){
                    flag3 = 1;
                }
            }
            console.log(flag3);
            console.log('maxhandb ' + maxhand);
            if(flag3 == 1){ //switch with the floor
                minhand = findMinInCards(floorcards);
                var minhandId = 0;
                var maxhandId = 0;
                for(i = 0 ; i < floorcards.length; i++){
                    if(minhand == cardNum(floorcards[i])){
                        minhandId = floorcards[i];
                        floorcards.splice(i,1);
                        break;
                    }
                }
                for(i = 0; i < player3cards.length; i++){
                    if(maxhand == equalcards(player3cards[i])){
                        maxhandId = player3cards[i];
                        player3cards.splice(i,1);
                        break;
                    }
                }
                console.log('aaaaaa' + minhandId);
                console.log(maxhandId);
                playerdeck = document.getElementById('pcards3');
                floordeck = document.getElementById('floor');
                while (floordeck.firstChild) {
                    floordeck.removeChild(floordeck.firstChild);
                }
                fc = floordeck.appendChild(document.createElement('span'));
                fc.setAttribute('class', 'card');
                fc.setAttribute('id', maxhandId);
                fc.setAttribute('onclick', 'switchcard(this)');
                fc.innerHTML = maxhandId;

                while (playerdeck.firstChild) {
                    playerdeck.removeChild(playerdeck.firstChild);
                }
                player3cards.push(minhandId);
                for(i = 0; i < player3cards.length; i++){
                    nc = playerdeck.appendChild(document.createElement('span'));
                    nc.setAttribute('class','card2');
                    nc.setAttribute('id', player3cards[i]);
                    nc.innerHTML = player3cards[i];
                }
                console.log(floorcards);
                console.log(player3cards);
                updateSum();
                turn += 1;
                if(numoponents < turn){
                    turn = 0;
                }
                console.log(turn);
            }else{  // take card from deck
                var maxhand = findMaxInCards(player3cards);
                if(sumplayer3 <= 7){
                    oponentyaniv();
                    return;
                }
                fc = document.getElementById('floor');
                pc = document.getElementById('pcards3');
                while (fc.firstChild) {
                    fc.removeChild(fc.firstChild);
                }
                floorcards = [];
                for(i = 0; i < player3cards.length; i++){
                    if(maxhand == equalcards(player3cards[i])){
                        maxhandId = player3cards[i];
                        player3cards.splice(i,1);
                        break;
                    }
                }
                var nfc = fc.appendChild(document.createElement('span'));
                nfc.setAttribute('class', 'card');
                nfc.setAttribute('id', maxhandId);
                nfc.setAttribute('onclick', 'switchcard(this)')
                nfc.innerHTML = maxhandId;
                floorcards.push(maxhandId);

                for(i = 0; i < player3cards.length; i++){
                    if(player3cards[i] == maxhandId){
                        player3cards.splice(i,1);
                        break;
                    }
                }
                while (pc.firstChild) {
                    pc.removeChild(pc.firstChild);
                }
                for(i = 0; i < player3cards.length; i++){
                    var npc = pc.appendChild(document.createElement('span'));
                    npc.setAttribute('class', 'card2');
                    npc.setAttribute('id', player3cards[i]);
                    npc.setAttribute('onclick', 'pickCard(this)');
                    npc.innerHTML = player3cards[i];
                }
                var x = Math.floor(Math.random()*arr.length);
                var pcards = document.getElementById('pcards3');
                nc = pcards.appendChild(document.createElement("span"));
                nc.setAttribute("class", "card2");
                nc.setAttribute("id", arr[x]);
                nc.innerHTML = arr[x];
                player3cards.push(arr[x])
                arr.splice(x,1);  
                updateSum();
                turn += 1;
                if(numoponents < turn){
                    turn = 0;
                }

                console.log(turn);
            }
            
        }
    }
}
function oponentyaniv(){
    if(turn == 1){
        console.log('oponent 1 win');
        finish(1);
    }else if(turn == 2){
        console.log('oponent 2 win');
        finish(2);
    }else if(turn == 3){
        console.log('oponent 3 win');
        finish(3);
    }
}
function yaniv(){
    if(turn == 0){
        if(sumplayer0 <= 7){
            console.log('I win');
            finish(0);
        }
    }
}
function finish(startnext){
    var finishmsg = document.getElementById('fm');
    finishmsg.style.display = "block";
    turn = startnext;
    chosenCard = [];
    player0cards = [];
    player1cards = [];
    player2cards = [];
    player3cards = [];
    sumplayer0 = 0;
    sumplayer1 = 0;
    sumplayer2 = 0;
    sumplayer3 = 0;
    arr = [];
    floorcards = [];
}
