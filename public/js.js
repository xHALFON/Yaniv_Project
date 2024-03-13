var level = 0; // 1 - easy, 2 - hard, 3 - comp
var playername;
var playercards;
var numoponents;
var massage;
var turn; // 0 - player0, 1 - player1....
var beg;
var hard;
var comp;
var chosenCard = [];
var player0cards = [];
var player1cards = [];
var player2cards = [];
var player3cards = [];
var sumplayer0 = 0;
var sumplayer1 = 0;
var sumplayer2 = 0;
var sumplayer3 = 0;
var scoreplayer0 = 0;
var scoreplayer1 = 0;
var scoreplayer2 = 0;
var scoreplayer3 = 0;
var arr;
var floorcards = [];
var round = 1;
var player1out = 1;
var player2out = 1;
var player3out = 1;
var allowtostart = 0;
var Intreval0;
var Intreval1;
var Intreval2;
var Intreval3;
var chosenbyid = 0;
var chosenbyseq = 0;
var oponentname = ['Eyal', 'Ron', 'Omer', 'Tuval', 'Idan', 'Shlomi', 'Yael', 'Maya', ' Noa'];
var oponentavatar = ['avatar1','avatar2','avatar3','avatar4','avatar5','avatar6','avatar7','avatar8','avatar9','avatar10','avatar11'];
var Pointtoslose;
var Scoretoyaniv;
var Tgames;
var Trounds;
var firstgamecomp = 0;
function enterGame(){
    var img = document.getElementById('fogimg');
    var board = document.getElementById('imgboard5');
    var btn = document.getElementById('enterbtn');
    img.style.top = "-200%";
    img.style.left = "-200%";
    img.style.width = "500%";
    img.style.height = "500%";
    board.style.display = "none";
    btn.style.display = "none";
    document.getElementById('lobbyaudio').play();
    setTimeout(function(){
        img.style.display = "none";
    }, 1000);
}

function verify(){
    playername = document.getElementById('username').value;
    numoponents = document.getElementById('numoponents').value;
    Pointtoslose = document.querySelector('input[name=Pointtoslose]:checked').value;
    Scoretoyaniv = document.querySelector('input[name=Scoretoyaniv]:checked').value;
    console.log("Point to lose: " + Pointtoslose);
    console.log("Yaniv at: " + Scoretoyaniv);
    beg = document.getElementById('beginner');
    comp = document.getElementById('competition');
    hard = document.getElementById('hard');
    massage = document.getElementById('mainmsg');
    if(playername.length <= 0 || playername.includes('!')|| playername.includes('@')|| playername.includes('#')|| playername.includes('$')|| playername.includes('%')|| playername.includes('^')|| playername.includes('&')|| playername.includes('*')|| playername.includes('(')|| playername.includes(')') || playername.length >= 15){
        massage.style.display = 'block';
        massage.innerHTML = "ERROR: Invalid Player Name";
        massage.style.color = "red";
        massage.style.fontWeight = "600";
        return;
    }
    if(beg.checked){
        level = 1;
    }else if(comp.checked){
        level = 3;
        Pointtoslose = 50;
        Scoretoyaniv = 12;
        numoponents = 3;
    }else if(hard.checked){
        level = 2;
    }
    if(level == 0){
        massage.style.display = 'block';
        massage.innerHTML = "ERROR: Invalid Game Mode";
        massage.style.color = "red";
        massage.style.fontWeight = "600";
        return;
    }
    allowtostart = 1;
    start();
}
function start(){
    if(allowtostart != 1){
        return;
    }
    if(round == 1){
        document.getElementById('lobbyaudio').pause();
        document.getElementById('startgameaudio').play();
        document.getElementById('gameaudio').currentTime = 0;
        document.getElementById('gameaudio').play();
        clearInterval(Intreval0);
        clearInterval(Intreval1);
        clearInterval(Intreval2);
        clearInterval(Intreval3);
        for(i = 0; i < numoponents; i++){
            switch(i){
                case 0:
                    player1out = 0;
                    continue;
                case 1:
                    player2out = 0;
                    continue;
                case 2:
                    player3out = 0;
                    continue;
            }
            document.getElementById('pcards'+i).style.display = 'block';
        }
        document.getElementById('player0name').innerHTML = playername;
        document.getElementById('maincont').style.animation = "0.5s screenup ease-in-out";
        document.getElementById('maincont').style.display = "none";
        document.getElementById('gamecont').style.display = "block";
    }
    if(level == 3 && firstgamecomp == 0){
        Trounds = 1;
        Tgames = 0;
        firstgamecomp = 1;
    }
    for(i = 0; i <= numoponents; i++){
        var x = 0;
        document.getElementById('player'+(i)).style.boxShadow = 'none';
        document.getElementById(`player${i}msg`).style.display = 'none';
        document.getElementById(`player${i}score`).style.display = 'flex';
        document.getElementById(`player${i}name`).style.display = "block";
        if(round == 1){
            x = Math.floor(Math.random()*oponentavatar.length);
            document.getElementById('player'+(i)).style.backgroundImage = "url(./Images/PlayerImages/"+oponentavatar.splice(x,1)+".png";
        }
    }
    if(round == 1){
        for(i = 1; i <= numoponents; i++){
            var x = 0;
            x = Math.floor(Math.random()*oponentname.length);
            document.getElementById(`player${i}name`).innerHTML = oponentname.splice(x,1);
        }
    }
    document.getElementById('quitgamebtn2').disabled = false;
    document.getElementById(`player0score`).innerHTML = scoreplayer0;
    document.getElementById(`player1score`).innerHTML = scoreplayer1;
    document.getElementById(`player2score`).innerHTML = scoreplayer2;
    document.getElementById(`player3score`).innerHTML = scoreplayer3;
    document.getElementById('quitgamebtn2').style.display = "block";
    document.getElementById('imgboard4').style.display = "block";
    fmsg = document.getElementById('fmsg').style.color = "black";
    document.getElementById('quitgamebtn').style.display = "none";
    fs.style.animation = "0.3s SettingsZoomout ease-in-out";
    document.getElementById('fs').style.display = "none";
    document.getElementById('yanivbtn').disabled = true;
    document.getElementById('yanivbtnimg').src = "./Images/yanivbtndis.png"
    document.getElementById('yanivbtnimg').classList.remove("zoomInOut");
    document.getElementById('yanivbtn').style.cursor = 'default';
    document.getElementById('yanivbtn').style.border = "none";

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
        document.getElementById('pcards'+i).style.display = 'block';
    }

    if(round != 1){
        if(player1out == 1){
            document.getElementById('player1').style.display = 'none';
            document.getElementById('pcards1').style.display = 'none';
            document.getElementById('player1score').style.display = 'none';
            document.getElementById(`player1name`).style.display = "none";

        }
        if(player2out == 1){
            document.getElementById('player2').style.display = 'none';
            document.getElementById('pcards2').style.display = 'none';
            document.getElementById('player2score').style.display = 'none';
            document.getElementById(`player2name`).style.display = "none";
        }
        if(player3out == 1){
            document.getElementById('player3').style.display = 'none';
            document.getElementById('pcards3').style.display = 'none';
            document.getElementById('player3score').style.display = 'none';
            document.getElementById(`player3name`).style.display = "none";
        }
    }
    arr = ["0R","0B",
        "1Y","1T","1L","1A", "2Y","2T","2L","2A",
        "3Y","3T","3L","3A", "4Y","4T","4L","4A",
        "5Y","5T","5L","5A", "6Y","6T","6L","6A",
        "7Y","7T","7L","7A", "8Y","8T","8L","8A",
        "9Y","9T","9L","9A", "10Y","10T","10L","10A",
        "11Y","11T","11L","11A", "12Y","12T","12L","12A",
        "13Y","13T","13L","13A"];
    for(i = 0; i < arr.length; i++){//render cards
        document.getElementById('render').style.backgroundImage = `url('./Images/cards/${arr[i]}.jpg')`;
        document.getElementById('render').style.backgroundImage = `url('./Images/cards/oponents/${arr[i]}o.jpg')`;
    }
    document.getElementById('render').style.display = "none";
    var x = Math.floor(Math.random()*arr.length);
    var floorcard = document.getElementById('floor').appendChild(document.createElement('span'));
    floorcard.setAttribute("class", "card");
    floorcard.setAttribute("id", arr[x]);
    floorcard.setAttribute("onclick", "switchcard(this)");
    floorcard.style.backgroundImage = `url('./Images/cards/${arr[x]}.jpg')`;
    floorcard.style.backgroundSize = "cover";
    floorcards.push(arr[x]);
    arr.splice(x,1);
    var pcards = document.getElementById('pcards0');
    for(i = 0; i < 5; i++){
        x = Math.floor(Math.random()*arr.length);
        cardi = pcards.appendChild(document.createElement("span"));
        cardi.setAttribute("class", "card");
        cardi.setAttribute("id", arr[x]);
        cardi.setAttribute("onclick", "pickCard(this)");
        cardi.style.backgroundImage = `url('./Images/cards/${arr[x]}.jpg')`;
        cardi.style.backgroundSize = "cover";
        player0cards.push(arr[x]);
        arr.splice(x,1);
    }
    for(i = 0; i < numoponents; i++){
        for(j = 0; j < 5; j++){
            pcards = document.getElementById('pcards'+(i+1));
            x = Math.floor(Math.random()*arr.length);
            cardi = pcards.appendChild(document.createElement("span"));
            cardi.setAttribute("class", i==1?'card3':'card2');
            cardi.setAttribute("id", arr[x]);
            if(i == 1){
            cardi.style.backgroundImage = `url('./Images/cards/${arr[x]}.jpg')`;
            cardi.style.backgroundSize = "cover";
            }else{
            cardi.style.backgroundImage = `url('./Images/cards/oponents/${arr[x]}o.jpg')`;
            cardi.style.backgroundSize = "cover";
            }
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
    
    sumplayer0 = sumId(player0cards);
    document.getElementById('summsg').innerHTML = 'Hand: '+sumplayer0;
    sumplayer1 = sumId(player1cards);
    sumplayer2 = sumId(player2cards);
    sumplayer3 = sumId(player3cards);

    if(round == 1){ // random player start the first turn on round 1
        turn = Math.floor(Math.random()*(numoponents));
    }
    document.getElementById('player'+(turn)).style.boxShadow = 'inset -5em -3em 3em rgb(0 200 0 / 30%),0em 0em 1em rgba(0, 0, 0, 0.6)';
    if(turn != 0){
        Oponentplay();
    }
    console.log("player1:" + sumplayer1);
    console.log("player2:" + sumplayer2);
    console.log("player3:" + sumplayer3);
    console.log('floor cards:' + floorcards);
    chosenCard = [];
}
function updateSum(){
    if(turn == 0){
        sumplayer0 = sumId(player0cards);
        document.getElementById('summsg').innerHTML = 'Hand: '+sumplayer0;
        if(sumplayer0 <= Number(Scoretoyaniv)){
            var yanivbtn = document.getElementById('yanivbtn');
            yanivbtn.disabled = false;
            document.getElementById('yanivbtnimg').src = "./Images/yanivbtn.png";
            yanivbtn.style.cursor = 'pointer';
            document.getElementById('yanivbtnimg').classList.add("zoomInOut");
        }else{
            document.getElementById('yanivbtn').disabled = true;
            document.getElementById('yanivbtnimg').src = "./Images/yanivbtndis.png";
            document.getElementById('yanivbtn').style.cursor = 'default';
            document.getElementById('yanivbtnimg').classList.remove("zoomInOut");
            document.getElementById('yanivbtn').style.border = "none";
        }
    }else if(turn == 1){
        sumplayer1 = sumId(player1cards);
    }else if(turn == 2){
        sumplayer2 = sumId(player2cards);
    }else if(turn == 3){
        sumplayer3 = sumId(player3cards);
    }
}

function pickCard(card){
    if(chosenCard.length > 0){
        for(i = 0; i < chosenCard.length; i++){
            if(chosenCard[i] === card){
                chosenCard[i].style.bottom = "0px";
                chosenCard.splice(i,1);
                if(chosenCard.length <= 1){
                    chosenbyid = 0;
                    chosenbyseq = 0;
                }
                return;
            }
        }
        if(chosenCard.length == 1){
            if(equalcards(chosenCard[0].id) == equalcards('0B')){
                card.style.bottom = "20px";
                chosenbyseq = 1;
                chosenCard.push(card);
                return;
            }
        }
        if(chosenbyseq == 0){
            for(i = 0; i < chosenCard.length; i++){
                if(equalcards(chosenCard[i].id) == equalcards(card.id)){
                    chosenbyid = 1;
                    card.style.bottom = "20px";
                    chosenCard.push(card);
                    return;
                }
            }
        }
        if(chosenbyid == 0){
            for(i = 0; i < chosenCard.length; i++){
                if(sequence(card) == true){
                    card.style.bottom = "20px";
                    chosenCard.push(card);
                    chosenbyseq = 1;
                    return;
                }
            }
        }
    }else{
        card.style.bottom = "20px";
        chosenCard.push(card);
    }
}
function sequence(card){
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    var temp = [];
    for(i = 0; i < chosenCard.length; i++){
        temp.push(chosenCard[i].id);
    }
    for(i = 0; i < chosenCard.length; i++){
        if((temp.includes('0B') || temp.includes('0R')) && temp.length < 3){
            a = `${(Number(equalcards(chosenCard[i].id)) + 2)}`;
            b = `${(Number(equalcards(chosenCard[i].id)) - 2)}`;
            c = `${(Number(equalcards(chosenCard[i].id)) + 1)}`;
            d = `${(Number(equalcards(chosenCard[i].id)) - 1)}`;
            if(a.concat((chosenCard[i].id)[chosenCard[i].id.length - 1]) == card.id ||
               b.concat((chosenCard[i].id)[chosenCard[i].id.length - 1]) == card.id ||
               c.concat((chosenCard[i].id)[chosenCard[i].id.length - 1]) == card.id ||
               d.concat((chosenCard[i].id)[chosenCard[i].id.length - 1]) == card.id ||
               card.id == '0R' || card.id == '0B'){
                return true;
            }
        }else{
            a = `${(Number(equalcards(chosenCard[i].id)) + 1)}`;
            b = `${(Number(equalcards(chosenCard[i].id)) - 1)}`;
            if(a.concat((chosenCard[i].id)[chosenCard[i].id.length - 1]) == card.id || b.concat((chosenCard[i].id)[chosenCard[i].id.length - 1]) == card.id || card.id == '0R' || card.id == '0B'){
                return true;
            }
        }
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
    if(chosenbyseq == 1){
        if(chosenCard.length < 3){
            return;
        }
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
            nfc.style.backgroundImage = `url('./Images/cards/${chosenCard[i].id}.jpg')`;
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
        chosenbyid = 0;
        chosenbyseq = 0;
        while (pc.firstChild) {
            pc.removeChild(pc.firstChild);
        }
        for(i = 0; i < player0cards.length; i++){
            var npc = pc.appendChild(document.createElement('span'));
            npc.setAttribute('class', 'card');
            npc.setAttribute('id', player0cards[i]);
            npc.setAttribute('onclick', 'pickCard(this)');
            npc.style.backgroundImage = `url('./Images/cards/${player0cards[i]}.jpg')`;
        }
        var x = Math.floor(Math.random()*arr.length);
        var pcards = document.getElementById('pcards0');
        cardi = pcards.appendChild(document.createElement("span"));
        cardi.setAttribute("class", "card");
        cardi.setAttribute("id", arr[x]);
        cardi.setAttribute("onclick", "pickCard(this)");
        cardi.style.backgroundImage = `url('./Images/cards/${arr[x]}.jpg')`
        player0cards.push(arr[x])
        updateSum();
        arr.splice(x,1);
        turn += 1;
        document.getElementById('choosecardaudio').play();
        Oponentplay();
    }
}
function switchcard(card){
    if(chosenCard.length <= 0){
        return;
    }
    if(chosenbyseq == 1){
        if(chosenCard.length < 3){
            return;
        }
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
        newdeckcard.style.backgroundImage = `url('./Images/cards/${card.id}.jpg')`;
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
            newfloorcard.style.backgroundImage = `url('./Images/cards/${chosenCard[i].id}.jpg')`;
            floorcards.push(chosenCard[i].id);
        }
        chosenCard = [];
        chosenbyid = 0;
        chosenbyseq = 0;
        updateSum();
        console.log('player cards array:' + player0cards);
        console.log('floor cards:' + floorcards);
        turn += 1;
        document.getElementById('choosecardaudio').play();
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
function sumId(array){
    var sum = 0;
    for(i = 0; i < array.length; i++){
        sum += Number(cardNum(array[i]));
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
        if(player1out == 1){
            document.getElementById('player'+(turn-1)).style.boxShadow = 'none';
            turn+=1;
            if(numoponents < turn){
                turn = 0;
            }
        }else{
            document.getElementById('player'+turn).style.boxShadow = 'inset -5em -3em 3em rgb(0 200 0 / 30%),0em 0em 1em rgba(0, 0, 0, 0.6)';
            document.getElementById('player'+(turn-1)).style.boxShadow = 'none';
            document.getElementById('player0').style.boxShadow = 'none';
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
                for(i = 0; i < comboid.length; i++){
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
                            fc.style.backgroundImage = `url('./Images/cards/${combo[i]}.jpg')`;
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
                            nc.style.backgroundImage = `url('./Images/cards/oponents/${player1cards[i]}o.jpg')`;
                        }
                        var x = Math.floor(Math.random()*arr.length);
                        nc = playerdeck.appendChild(document.createElement("span"));
                        nc.setAttribute("class", "card2");
                        nc.setAttribute("id", arr[x]);
                        nc.style.backgroundImage = `url('./Images/cards/oponents/${arr[x]}o.jpg')`;
                        player1cards.push(arr[x])
                        arr.splice(x,1);  
                        updateSum();
                        document.getElementById('choosecardaudio').play();
                        turn += 1
                        if(numoponents < turn){
                            turn = 0;
                        }
                        console.log(turn);
                    }
                }else if(sum(combo) >= min(floornums)){
                    flag1 = 0;
                    // need to check if there is an queal on floor (for hard mode)
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
                        fc.style.backgroundImage = `url('./Images/cards/${combo[i]}.jpg')`;
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
                    nc.style.backgroundImage = `url('./Images/cards/oponents/${player1cards[i]}o.jpg')`;
                    }
                    console.log(floorcards);
                    console.log(player1cards);
                    updateSum();
                    document.getElementById('choosecardaudio').play();
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
                    fc.style.backgroundImage = `url('./Images/cards/${maxhandId}.jpg')`;

                    while (playerdeck.firstChild) {
                        playerdeck.removeChild(playerdeck.firstChild);
                    }
                    player1cards.push(minhandId);
                    for(i = 0; i < player1cards.length; i++){
                        nc = playerdeck.appendChild(document.createElement('span'));
                        nc.setAttribute('class','card2');
                        nc.setAttribute('id', player1cards[i]);
                        nc.style.backgroundImage = `url('./Images/cards/oponents/${player1cards[i]}o.jpg')`;
                    }
                    console.log(floorcards);
                    console.log(player1cards);
                    updateSum();
                    document.getElementById('choosecardaudio').play();
                    turn += 1
                    if(numoponents < turn){
                        turn = 0;
                    }
                    console.log(turn);
                }else{  // take card from deck
                    var maxhand = findMaxInCards(player1cards);
                    if(sumplayer1 <= Number(Scoretoyaniv)){
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
                    nfc.style.backgroundImage = `url('./Images/cards/${maxhandId}.jpg')`;
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
                        npc.style.backgroundImage = `url('./Images/cards/oponents/${player1cards[i]}o.jpg')`;
                    }
                    var x = Math.floor(Math.random()*arr.length);
                    var pcards = document.getElementById('pcards1');
                    nc = pcards.appendChild(document.createElement("span"));
                    nc.setAttribute("class", "card2");
                    nc.setAttribute("id", arr[x]);
                    nc.style.backgroundImage = `url('./Images/cards/oponents/${arr[x]}o.jpg')`;
                    player1cards.push(arr[x])
                    arr.splice(x,1);  
                    updateSum();
                    document.getElementById('choosecardaudio').play();
                    turn += 1
                    if(numoponents < turn){
                        turn = 0;
                    }
                    console.log(turn);
                }
            }
        }
    }
    if(turn == 2){
        if(player2out == 1){
            document.getElementById('player'+(turn-1)).style.boxShadow = 'none';
            turn+=1;
            if(numoponents < turn){
                turn = 0;
            }
        }else{
            document.getElementById('player'+turn).style.boxShadow = 'inset -5em -3em 3em rgb(0 200 0 / 30%),0em 0em 1em rgba(0, 0, 0, 0.6)';
            document.getElementById('player'+(turn-1)).style.boxShadow = 'none';
            document.getElementById('player0').style.boxShadow = 'none';
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
                            fc.style.backgroundImage = `url('./Images/cards/${combo[i]}.jpg')`;
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
                            nc.style.backgroundImage = `url('./Images/cards/${player2cards[i]}.jpg')`;
                        }
                        var x = Math.floor(Math.random()*arr.length);
                        nc = playerdeck.appendChild(document.createElement("span"));
                        nc.setAttribute("class", "card3");
                        nc.setAttribute("id", arr[x]);
                        nc.style.backgroundImage = `url('./Images/cards/${arr[x]}.jpg')`;
                        player2cards.push(arr[x])
                        arr.splice(x,1);  
                        updateSum();
                        document.getElementById('choosecardaudio').play();
                        turn += 1
                        if(numoponents < turn){
                            turn = 0;
                        }
                        console.log(turn);
                    }
                }else if(sum(combo) >= min(floornums)){
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
                        fc.style.backgroundImage = `url('./Images/cards/${combo[i]}.jpg')`;
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
                    nc.style.backgroundImage = `url('./Images/cards/${player2cards[i]}.jpg')`;
                    }
                    console.log(floorcards);
                    console.log(player2cards);
                    updateSum();
                    document.getElementById('choosecardaudio').play();
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
                    fc.style.backgroundImage = `url('./Images/cards/${maxhandId}.jpg')`;

                    while (playerdeck.firstChild) {
                        playerdeck.removeChild(playerdeck.firstChild);
                    }
                    player2cards.push(minhandId);
                    for(i = 0; i < player2cards.length; i++){
                        nc = playerdeck.appendChild(document.createElement('span'));
                        nc.setAttribute('class','card3');
                        nc.setAttribute('id', player2cards[i]);
                        nc.style.backgroundImage = `url('./Images/cards/${player2cards[i]}.jpg')`;
                    }
                    console.log(floorcards);
                    console.log(player2cards);
                    updateSum();
                    document.getElementById('choosecardaudio').play();
                    turn += 1
                    if(numoponents < turn){
                        turn = 0;
                    }
                    console.log(turn);
                }else{  // take card from deck
                    var maxhand = findMaxInCards(player2cards);
                    if(sumplayer2 <= Number(Scoretoyaniv)){
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
                    nfc.style.backgroundImage = `url('./Images/cards/${maxhandId}.jpg')`;
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
                        npc.style.backgroundImage = `url('./Images/cards/${player2cards[i]}.jpg')`;
                    }
                    var x = Math.floor(Math.random()*arr.length);
                    var pcards = document.getElementById('pcards2');
                    nc = pcards.appendChild(document.createElement("span"));
                    nc.setAttribute("class", "card3");
                    nc.setAttribute("id", arr[x]);
                    nc.style.backgroundImage = `url('./Images/cards/${arr[x]}.jpg')`;
                    player2cards.push(arr[x])
                    arr.splice(x,1);  
                    updateSum();
                    document.getElementById('choosecardaudio').play();
                    turn += 1
                    if(numoponents < turn){
                        turn = 0;
                    }
                    console.log(turn);
                }
            }
        }
    }
    if(turn == 3){
        if(player3out == 1){
            document.getElementById('player'+(turn-1)).style.boxShadow = 'none';
            turn+=1;
            if(numoponents < turn){
                turn = 0;
            }
        }else{
            document.getElementById('player'+turn).style.boxShadow = 'inset -5em -3em 3em rgb(0 200 0 / 30%),0em 0em 1em rgba(0, 0, 0, 0.6)';
            document.getElementById('player'+(turn-1)).style.boxShadow = 'none';
            document.getElementById('player0').style.boxShadow = 'none';
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
                            fc.style.backgroundImage = `url('./Images/cards/${combo[i]}.jpg')`;
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
                            nc.style.backgroundImage = `url('./Images/cards/oponents/${player3cards[i]}o.jpg')`;
                        }
                        var x = Math.floor(Math.random()*arr.length);
                        nc = playerdeck.appendChild(document.createElement("span"));
                        nc.setAttribute("class", "card2");
                        nc.setAttribute("id", arr[x]);
                        nc.style.backgroundImage = `url('./Images/cards/oponents/${arr[x]}o.jpg')`;
                        player3cards.push(arr[x])
                        arr.splice(x,1);  
                        updateSum();
                        document.getElementById('choosecardaudio').play();
                        turn += 1;
                        if(numoponents < turn){
                            turn = 0;
                        }
                        console.log(turn);
                    }
                }else if(sum(combo) >= min(floornums)){
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
                        fc.style.backgroundImage = `url('./Images/cards/${combo[i]}.jpg')`;
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
                    nc.style.backgroundImage = `url('./Images/cards/oponents/${player3cards[i]}o.jpg')`;
                    }
                    console.log(floorcards);
                    console.log(player3cards);
                    updateSum();
                    document.getElementById('choosecardaudio').play();
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
                    fc.style.backgroundImage = `url('./Images/cards/${maxhandId}.jpg')`;

                    while (playerdeck.firstChild) {
                        playerdeck.removeChild(playerdeck.firstChild);
                    }
                    player3cards.push(minhandId);
                    for(i = 0; i < player3cards.length; i++){
                        nc = playerdeck.appendChild(document.createElement('span'));
                        nc.setAttribute('class','card2');
                        nc.setAttribute('id', player3cards[i]);
                        nc.style.backgroundImage = `url('./Images/cards/oponents/${player3cards[i]}o.jpg')`;
                    }
                    console.log(floorcards);
                    console.log(player3cards);
                    updateSum();
                    document.getElementById('choosecardaudio').play();
                    turn += 1;
                    if(numoponents < turn){
                        turn = 0;
                    }
                    console.log(turn);
                }else{  // take card from deck
                    var maxhand = findMaxInCards(player3cards);
                    if(sumplayer3 <= Number(Scoretoyaniv)){
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
                    nfc.style.backgroundImage = `url('./Images/cards/${maxhandId}.jpg')`;
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
                        npc.style.backgroundImage = `url('./Images/cards/oponents/${player3cards[i]}o.jpg')`;
                    }
                    var x = Math.floor(Math.random()*arr.length);
                    var pcards = document.getElementById('pcards3');
                    nc = pcards.appendChild(document.createElement("span"));
                    nc.setAttribute("class", "card2");
                    nc.setAttribute("id", arr[x]);
                    nc.style.backgroundImage = `url('./Images/cards/oponents/${arr[x]}o.jpg')`;
                    player3cards.push(arr[x])
                    arr.splice(x,1);  
                    updateSum();
                    document.getElementById('choosecardaudio').play();
                    turn += 1;
                    if(numoponents < turn){
                        turn = 0;
                    }

                    console.log(turn);
                }
                
            }
        }
    }
    if(turn == 0){
        document.getElementById('player'+(turn)).style.boxShadow = 'inset -5em -3em 3em rgb(0 200 0 / 30%),0em 0em 1em rgba(0, 0, 0, 0.6)';
        document.getElementById('player'+(numoponents)).style.boxShadow = 'none';
    }
}
function checkOponentsCards(player,playernum){ // check assaf
    var min = sumId(player);
    var winner = playernum;
    flag = 0;
    var temp = 0
    for(i = 0; i <= numoponents; i++){
        if(i == playernum){
            continue;
        }
        switch(i){
            case 0:
                temp = sumplayer0;
                if(min >= temp){
                    min = temp;
                    winner = i;
                    flag = 1;
                }
                continue;
            case 1:
                temp = sumplayer1;
                if(min >= temp){
                    min = temp;
                    winner = i;
                    flag = 1;
                }
                continue;
            case 2:
                temp = sumplayer2;
                if(min >= temp){
                    min = temp;
                    winner = i;
                    flag = 1;
                }
                continue;
            case 3:
                temp = sumplayer3;
                if(min >= temp){
                    min = temp;
                    winner = i;
                    flag = 1;
                }
                continue;
        }
    }
    if(flag == 1){
        setTimeout(function(){
            document.getElementById('assafaudio').play();
        }, 1000);
        var winnermsg = document.getElementById(`player${winner}msg`);
        winnermsg.style.display = 'block';
        winnermsg.innerHTML = 'ASSAF';
        winnermsg.style.fontWeight = '800';
        winnermsg.style.textShadow = '2px 2px black';
        winnermsg.style.color = 'red';
        switch(playernum){
            case 0:
                sumplayer0 = 30;
                break;
            case 1:
                sumplayer1 = 30;
                break;
            case 2:
                sumplayer2 = 30;
                break;
            case 3:
                sumplayer3 = 30;
                break;
        }
    }
    return winner;
}
function oponentyaniv(){
    if(turn == 1){
        document.getElementById('yanivaudio').play();
        document.getElementById(`player1msg`).style.display = 'block';
        document.getElementById(`player1msg`).innerHTML = 'YANIV';
        document.getElementById(`player1msg`).style.color = 'rgb(248, 232, 0)';
        document.getElementById(`player1msg`).style.fontWeight = '800';
        document.getElementById(`player1msg`).style.textShadow = '2px 2px black';
        finish(checkOponentsCards(player1cards,1));
    }else if(turn == 2){
        document.getElementById('yanivaudio').play();
        document.getElementById(`player2msg`).style.display = 'block';
        document.getElementById(`player2msg`).innerHTML = 'YANIV';
        document.getElementById(`player2msg`).style.color = 'rgb(248, 232, 0)';
        document.getElementById(`player2msg`).style.fontWeight = '800';
        document.getElementById(`player2msg`).style.textShadow = '2px 2px black';
        finish(checkOponentsCards(player2cards,2));
    }else if(turn == 3){
        document.getElementById('yanivaudio').play();
        document.getElementById(`player3msg`).style.display = 'block';
        document.getElementById(`player3msg`).innerHTML = 'YANIV';
        document.getElementById(`player3msg`).style.color = 'rgb(248, 232, 0)';
        document.getElementById(`player3msg`).style.fontWeight = '800';
        document.getElementById(`player3msg`).style.textShadow = '2px 2px black';
        finish(checkOponentsCards(player3cards,3));
    }
}
function yaniv(){
    if(turn == 0){
        if(sumplayer0 <= Number(Scoretoyaniv)){
            document.getElementById('yanivaudio').play();
            document.getElementById('yanivbtn').disabled = true;
            document.getElementById('yanivbtnimg').src = "./Images/yanivbtndis.png"
            document.getElementById('yanivbtnimg').classList.remove("zoomInOut");
            document.getElementById('yanivbtn').style.cursor = "default";
            document.getElementById('yanivbtn').style.border = "none";
            document.getElementById(`player0msg`).style.display = 'block';
            document.getElementById(`player0msg`).innerHTML = 'YANIV';
            document.getElementById(`player0msg`).style.color = 'rgb(248, 232, 0)';
            document.getElementById(`player0msg`).style.fontWeight = '800';
            document.getElementById(`player0msg`).style.textShadow = '2px 2px black';
            finish(checkOponentsCards(player0cards,0));
        }
    }
}

function updateScore(winner){
    var p0 = document.getElementById('player0score');
    var p1 = document.getElementById('player1score');
    var p2 = document.getElementById('player2score');
    var p3 = document.getElementById('player3score');
    var sum0 = sumplayer0;
    var sum1 = sumplayer1;
    var sum2 = sumplayer2;
    var sum3 = sumplayer3;
    var score0 = scoreplayer0;
    var score1 = scoreplayer1;
    var score2 = scoreplayer2;
    var score3 = scoreplayer3;
    var dscore0 = scoreplayer0;
    var dscore1 = scoreplayer1;
    var dscore2 = scoreplayer2;
    var dscore3 = scoreplayer3;
    for(i = 0; i < Number(Pointtoslose); i++){ //real score
        if(winner != 0 && scoreplayer0 != (score0 + sumplayer0)){
            scoreplayer0 += 1;
        }
        if(player1out == 0){
            if(winner != 1 && scoreplayer1 != (score1 + sumplayer1)){
                scoreplayer1 += 1;
            }
        }
        if(player2out == 0){
            if(winner != 2 && scoreplayer2 != (score2 + sumplayer2)){
                scoreplayer2 += 1;
            }
        }
        if(player3out == 0){
            if(winner != 3 && scoreplayer3 != (score3 + sumplayer3)){
                scoreplayer3 += 1;
            }   
        }
    }
    Intreval0 = setInterval(() => { // draw score
        if(winner != 0){
            dscore0 += 1;
            p0.innerHTML = dscore0;
            if(dscore0 === (score0+sum0)){
                clearInterval(Intreval0);
            }
        if(winner == 0){
            clearInterval(Intreval0);
        }
        }
    },150);
    if(player1out == 0){
        Intreval1 = setInterval(() => {
            if(winner != 1){
                dscore1 += 1;
                p1.innerHTML = dscore1;
                if(dscore1 === (score1+sum1)){
                    clearInterval(Intreval1);
                }
            }
            if(winner == 1){
                clearInterval(Intreval1);
            }
        },150);
    }
    if(player2out == 0){
        Intreval2 = setInterval(() => {
            if(winner != 2){
                dscore2 += 1;
                p2.innerHTML = dscore2;
                if(dscore2 === (score2+sum2)){
                    clearInterval(Intreval2);
                }
            }
            if(winner == 2){
                clearInterval(Intreval2);
            }
        },150);
    }
    if(player3out == 0){
        Intreval3 = setInterval(() => {
            if(winner != 3){
                dscore3 += 1;
                p3.innerHTML = dscore3;
                if(dscore3 === (score3+sum3)){
                    clearInterval(Intreval3);
                }
            }
            if(winner == 3){
                clearInterval(Intreval3);
            }
        },150);
    }
}
function finish(winner){
    updateScore(winner);
    console.log('playerscore0: '+ scoreplayer0);
    console.log('playerscore1: '+ scoreplayer1);
    console.log('playerscore2: '+ scoreplayer2);
    console.log('playerscore3: '+ scoreplayer3);
    fs = document.getElementById('fs');
    fs.style.animation = "0.3s SettingsZoomin ease-in-out";
    fmsg = document.getElementById('fmsg');
    console.log(scoreplayer1);
    console.log(scoreplayer2);
    console.log(scoreplayer3);
    if(scoreplayer1 >= Number(Pointtoslose)){
        console.log('dsa');
        player1out = 1;
    }
    if(scoreplayer2 >= Number(Pointtoslose)){
        player2out = 1;
    }
    if(scoreplayer3 >= Number(Pointtoslose)){
        player3out = 1;
    }
    if(player1out == 1 && player2out == 1 && player3out == 1){
        setTimeout(() => {
            if(level == 3){ // if its comp play
                fs.style.display = "block";
                fmsg.innerHTML = "You Won<br>Round: " + round;
                fmsg.style.top = "-24%";
                fmsg.style.left = "31%";
                fmsg.style.color = "rgb(0, 223, 0)";
                fmsg.style.fontWeight = "800";
                document.getElementById('newrndbtn').style.display = "block";
                document.getElementById('newrndbtn').innerHTML = "Keep Play";
                oponentname = ['Eyal', 'Ron', 'Omer', 'Tuval', 'Shlomi', 'Yael', 'Maya', ' Noa'];
                oponentavatar = ['avatar1','avatar2','avatar3','avatar4','avatar5','avatar6','avatar7','avatar8','avatar9','avatar10','avatar11'];
                numoponents = 3;
                round = 0;
                Tgames += 1;
                document.getElementById('fsroundsdet').style.display = "block";
                document.getElementById('fsgamedet').style.display = "block";
                document.getElementById('fsroundsdet').innerHTML = 'Rounds: ' + Trounds;
                document.getElementById('fsgamedet').innerHTML = 'Games: ' + Tgames;
                document.getElementById('quitgamebtn').style.display = "none";
                scoreplayer0 = 0;
                scoreplayer1 = 0;
                scoreplayer2 = 0;
                scoreplayer3 = 0;
            }else{
                fs.style.display = "block";
                fmsg.innerHTML = "You Won<br>Round: " + round;
                fmsg.style.top = "-24%";
                fmsg.style.left = "31%";
                fmsg.style.color = "rgb(0, 223, 0)";
                fmsg.style.fontWeight = "800";
                document.getElementById('newrndbtn').style.display = "none";
                document.getElementById('quitgamebtn').style.display = "block";
                document.getElementById('fsroundsdet').style.display = "none";
                document.getElementById('fsgamedet').style.display = "none";
            }
                round += 1;
        }, 2000);
    }else if(scoreplayer0 >= Number(Pointtoslose)){
        setTimeout(() => {
            if(level == 3){ // if its comp play
                fs.style.display = "block";
                fmsg.innerHTML = "You lost<br>Round: " + round;
                fmsg.style.top = "-24%";
                fmsg.style.left = "31%";
                fmsg.style.color = "red";
                fmsg.style.fontWeight = "800";
                document.getElementById('newrndbtn').style.display = "none";
                document.getElementById('fsroundsdet').style.display = "block";
                document.getElementById('fsgamedet').style.display = "block";
                document.getElementById('quitgamebtn').style.display = "block";
                document.getElementById('fsroundsdet').innerHTML = 'Rounds: ' + Trounds;
                document.getElementById('fsgamedet').innerHTML = 'Games: ' + Tgames;
                axios.get('/api').then(response => {
                    leaders = response.data;
                    leaders.sort(dynamicSort("GameCounts"));
                    leaders.reverse();
                    if(Tgames < leaders[leaders.length - 1].GameCounts || leaders.length < 10){
                        axios.post('/addplayer', {name: playername, TotalRounds: Trounds, GameCounts: Tgames});
                    }
                }).catch(error => {
                    console.error(error);
                });
            }else{
                fs.style.display = "block";
                fmsg.innerHTML = "You lost<br>Round: " + round;
                fmsg.style.top = "-24%";
                fmsg.style.left = "31%";
                fmsg.style.color = "red";
                fmsg.style.fontWeight = "800";
                document.getElementById('newrndbtn').style.display = "none";
                document.getElementById('quitgamebtn').style.display = "block";
                document.getElementById('fsroundsdet').style.display = "none";
                document.getElementById('fsgamedet').style.display = "none";
            }
            round += 1;
        }, 2000);
    }else{
        setTimeout(() => {
            if(level == 3){
                document.getElementById('fsroundsdet').style.display = "block";
                document.getElementById('fsgamedet').style.display = "block";
                document.getElementById('fsroundsdet').innerHTML = 'Rounds: ' + Trounds;
                document.getElementById('fsgamedet').innerHTML = 'Games: ' + Tgames;
                Trounds += 1;
            }else{
                document.getElementById('newrndbtn').innerHTML = "New Round";
                document.getElementById('fsroundsdet').style.display = "none";
                document.getElementById('fsgamedet').style.display = "none";
            }
            fs.style.display = "block";
            document.getElementById('fmsg').innerHTML = "Round: " + round;
            fmsg.style.top = "-16%";
            fmsg.style.left = "31.5%";
            document.getElementById('quitgamebtn').style.display = "none";
            document.getElementById('newrndbtn').style.display = "block";
            round += 1;
        }, 2000);
    }
    document.getElementById('quitgamebtn2').disabled = true;
    turn = winner;
    chosenCard = [];
    player0cards = [];
    player1cards = [];
    player2cards = [];
    player3cards = [];
    sumplayer0 = 0;
    sumplayer1 = 0;
    sumplayer2 = 0;
    sumplayer3 = 0;
    chosenbyid = 0;
    chosenbyseq = 0;
    arr = [];
    firstgame = false;
    floorcards = [];
}
async function quitGame(){
    massage = document.getElementById('mainmsg').style.display = "none";
    document.getElementById('maincont').style.display = "block";
    document.getElementById('maincont').style.animation = "0.5s screendown ease-in-out";
    setTimeout(() => {
        document.getElementById('gamecont').style.display = "none";
    
    fs.style.animation = "0.3s SettingsZoomout ease-in-out";
    document.getElementById('fs').style.display = "none";
    for(i = 1; i < 4; i++){
        document.getElementById('player'+i).style.display = "none";
        document.getElementById('pcards'+i).style.display = "none";
        document.getElementById(`player${i}score`).style.display = "none";
    }
    document.getElementById('quitgamebtn2').style.display = "none";
    document.getElementById('imgboard4').style.display = "none";
    document.getElementById('player0name').style.display = "none";
    document.getElementById('player1name').style.display = "none";
    document.getElementById('player2name').style.display = "none";
    document.getElementById('player3name').style.display = "none";
    }, 450);
    round = 1;
    level = 0;
    playername;
    playercards;
    numoponents;
    massage;
    turn = 0;
    beg;
    hard;
    comp;
    chosenCard = [];
    player0cards = [];
    player1cards = [];
    player2cards = [];
    player3cards = [];
    sumplayer0 = 0;
    sumplayer1 = 0;
    sumplayer2 = 0;
    sumplayer3 = 0;
    scoreplayer0 = 0;
    scoreplayer1 = 0;
    scoreplayer2 = 0;
    scoreplayer3 = 0;
    player1out = 1;
    player2out = 1;
    player3out = 1;
    arr;
    floorcards = [];
    chosenbyid = 0;
    chosenbyseq = 0;
    allowtostart = 0;
    Tgames;
    Trounds;
    firstgamecomp = 0;
    oponentname = ['Eyal', 'Ron', 'Omer', 'Tuval', 'Shlomi', 'Yael', 'Maya', ' Noa'];
    oponentavatar = ['avatar1','avatar2','avatar3','avatar4','avatar5','avatar6','avatar7','avatar8','avatar9','avatar10','avatar11'];
    document.getElementById('lobbyaudio').currentTime = 0;
    document.getElementById('lobbyaudio').play();
    document.getElementById('gameaudio').pause();
}
function resize(){
    if(document.body.style.zoom == "100%"){
    document.body.style.zoom = "125%";
    document.getElementById('resize').innerHTML = "<i class='fas fa-compress' style='font-size:24px'></i>";
    document.getElementById('resize2').innerHTML = "<i class='fas fa-compress' style='font-size:24px'></i>";
    }else{
        document.body.style.zoom = "100%";
        document.getElementById('resize').innerHTML = "<i class='fas fa-expand' style='font-size:24px'></i>";
        document.getElementById('resize2').innerHTML = "<i class='fas fa-expand' style='font-size:24px'></i>";
    }
}
function Settings(){
    console.log("dsadsa");
    document.querySelector('.Settingscont').style.animation = "0.3s SettingsZoomin ease-in-out";
    document.querySelector('.Settingscont').style.display = "block";
    document.querySelector('.leadbtn').disabled = true;
    document.querySelector('.startgamebtn').disabled = true;
    document.querySelector('.Settingsbtn').disabled = true;
}
function exitsettings(){
    document.querySelector('.Settingscont').style.animation = "0.3s SettingsZoomout ease-in-out";
    document.querySelector('.Settingscont').style.display = "none";
    document.querySelector('.leadbtn').disabled = false;
    document.querySelector('.startgamebtn').disabled = false;
    document.querySelector('.Settingsbtn').disabled = false;
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
function lead(){
    while(document.getElementById('feed').firstChild){
        document.getElementById('feed').removeChild(document.getElementById('feed').firstChild);
    }
    axios.get('/api').then(response => {
    arr = response.data;
    arr.sort(dynamicSort("GameCounts"));
    arr.reverse();
    console.log(arr);
    for(i = 0; i < arr.length; i++){ // render the players
        if(i == 10){
            break; // draw 10 players
        }
        var playerfeed = document.getElementById('feed').appendChild(document.createElement('div'));
        playerfeed.setAttribute('class', 'playerfeed');
        var playerrank = playerfeed.appendChild(document.createElement('span'));
        playerrank.setAttribute('class', 'rank');
        if(i < 3){
            playerrank.innerHTML = `<img src='./Images/${i+1}.png' width='24px'>`;
        }
        var playername = playerfeed.appendChild(document.createElement('span'));
        playername.setAttribute('class', 'playerfeedname');
        playername.innerHTML = arr[i].name;
        var playerrounds = playerfeed.appendChild(document.createElement('span'));
        playerrounds.setAttribute('class', 'playerfeedrounds');
        playerrounds.innerHTML = arr[i].TotalRounds;
        var playergames = playerfeed.appendChild(document.createElement('span'));
        playergames.setAttribute('class', 'playerfeedGame');
        playergames.innerHTML = arr[i].GameCounts;
        if(i >= 3){
            playername.style.marginLeft = "44px";
            playerrounds.style.marginLeft = "197px";
            playergames.style.marginLeft = "344px";
        }
    }
    }).catch(error => {
        console.error(error);
    });
    document.getElementById('maincont').style.animation = "0.5s screenleft ease-in-out";
    document.getElementById('maincont').style.display = "none";
    document.getElementById('leadcont').style.display = "block";
}
function leadmainmenu(){
    document.getElementById('maincont').style.animation = "0.5s screenright ease-in-out";
    document.getElementById('maincont').style.display = "block";
    setTimeout(() => {
        document.getElementById('leadcont').style.display = "none";
    }, 450);
}
function ShowOponents(){
    document.getElementById('gamedetOponents').style.display = "inline-block";
    document.getElementById('numoponents').style.display = "inline-block";
}
function hideOponents(){
    document.getElementById('gamedetOponents').style.display = "none";
    document.getElementById('numoponents').style.display = "none";
}