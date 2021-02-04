// [엘리먼트 변수]
const inputNewTweet = document.querySelector('#newTweetSection');
const btnNewTweet = document.querySelector('.btn-register');
const userName = document.querySelector('#username');
const newTweetContent = document.querySelector('#newTweetContent');
const refresh = document.querySelector('.refresh');


// ----------------------------------------기존의 트윗을 보여줍니다.----------------------
const readingArea = document.querySelector('#tweets');
function printTweets(){
    DATA.forEach(printTweet);
}
function printTweet(DATA){
    let tweetElement = makeTweetElement(DATA);
    readingArea.prepend(tweetElement);
}
function makeTweetElement(DATA){
    //tweet li --
    let liElement = document.createElement('li');
    liElement.classList.add('tweet', 'row', 'pl-15', 'pr-15', 'pt-10');
    //image-section div --
    let imgDivElement = document.createElement('div');
    imgDivElement.classList.add('image-section', 'mr-10');
    liElement.appendChild(imgDivElement);
    //profile_image div --
    let profileImg = document.createElement('div');
    profileImg.classList.add('profile_image');
    imgDivElement.appendChild(profileImg);
    //text-section div --
    let txtDivElement = document.createElement('div');
    txtDivElement.classList.add('text-section', 'col', 'pb-10');
    liElement.appendChild(txtDivElement);
    //row div --
    let twtInfoElement = document.createElement('div');
    twtInfoElement.classList.add('row');
    txtDivElement.appendChild(twtInfoElement);
    //user name span --
    let usernameElement = document.createElement('span');
    usernameElement.classList.add('username');
    usernameElement.textContent = DATA.user;
    twtInfoElement.appendChild(usernameElement);
    //time span --
    let timeElement = document.createElement('span');
    timeElement.classList.add('time');
    timeElement.textContent = DATA.created_at;
    twtInfoElement.appendChild(timeElement);
    //content p (트윗 내용) --
    let contentElement = document.createElement('p');
    contentElement.classList.add('content');
    contentElement.textContent = DATA.message;
    txtDivElement.appendChild(contentElement);
    return liElement;
}

//함수 실행.
printTweets();

// DATA는 이미 작성된 트윗을 표시합니다.
console.log(DATA)
// generateNewTweet을 호출할 때마다 새로운 트윗을 생성합니다.
console.log(generateNewTweet());

// --------------------------새로운 트윗을 생성합니다.------------------------------

function makeNewTweetElement() {
    console.log('click')
    // 새로 입력받은 트윗을 객체로 만들어서 DATA 배열에 추가해주자
    // 객체 속성은 user, message, created_at
    // 객체를 새로 만들고
    // 객체에 속성을 추가하고
    let newTweet = {};
    newTweet.user = userName.value;
    newTweet.message = newTweetContent.value;
    newTweet.created_at = new Date();
    // 그 객체를 DATA에 unshift하자
    DATA.push(newTweet);
    // 추가된 트윗을 보여주자
    printTweet(DATA[DATA.length-1]);
    // 입력하는 칸을 비우자
    userName.value = '';
    newTweetContent.value = '';
    // 트윗 버튼을 비활성화시키자
    btnNewTweet.disabled = 'disabled';
    btnNewTweet.classList.remove('active');
}
// [엘리먼트와 이벤트 핸들러의 연결]
btnNewTweet.onclick = makeNewTweetElement;


// --------------------------트윗을 필터링할거에요! 클릭한 트윗 주인의 탐라를 보여주세요!------------------------
readingArea.addEventListener('click', function (event) {
    const target = event.target;
    console.log(target.classList[0]);

    if (target.classList[0] === 'username') {
        // printTweets을 실행하되, target.textContent가 DATA.user === target.textContent
        let tweetList = DATA.filter(function(tweet){
            return tweet.user === target.textContent;
        });
        console.log(tweetList)
    
        //readingArea.innerHTML = '';
        while (readingArea.firstChild) {
            readingArea.removeChild(readingArea.firstChild);
        }
        tweetList.forEach(printTweet);
    }
});
// -----------------------다시 전체 트윗을 보여주세요!!--------------------------------------------------
refresh.addEventListener('click', function (event) {
    while (readingArea.firstChild) {
        readingArea.removeChild(readingArea.firstChild);
    }
    DATA.forEach(printTweet);
});

// ----------------------------Tweet Button 활성화---------------------
inputNewTweet.addEventListener('keyup', function (event) {
    if (userName.value.length !== 0 && newTweetContent.value.length !== 0) {
        btnNewTweet.disabled = false;
        btnNewTweet.classList.add('active');
    } else {
        btnNewTweet.disabled = 'disabled';
        btnNewTweet.classList.remove('active');
    }
})

// textarea 높이 자동조절
function resize(obj) {
    obj.style.height = '1px';
    obj.style.height = (12 + obj.scrollHeight) + 'px';
}

// DATA는 이미 작성된 트윗을 표시합니다.
console.log(DATA)

// generateNewTweet을 호출할 때마다 새로운 트윗을 생성합니다.
console.log(generateNewTweet());

document.getElementById('test').innerHTML = 'hello twittler, check developer console!';