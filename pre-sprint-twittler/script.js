// [엘리먼트 변수]
const inputNewTweet = document.querySelector('#newTweetSection');
const btnNewTweet = document.querySelector('.btn-register');
const userName = document.querySelector('#username');
const newTweetContent = document.querySelector('#newTweetContent');
const refresh = document.querySelector('.refresh');
const readingArea = document.querySelector('#tweets');

// ----작성시간을 입력받아 작성한 시점으로부터 현재시간까지 얼마나 지났는지를 반환해주는 함수입니다.-----------
function createdTimeToFormatted(time) {
    let now = new Date(); // 현재 날짜 정보를 now 객체로 만듭니다.
    let createdTime = new Date(time); // 작성날짜 정보를 인자로 받아와 작성날짜에 대한 정보를 createdTime 객체로 만듭니다
	let year = createdTime.getFullYear().toString();
  	let month = (createdTime.getMonth() + 1).toString().padStart(2, '0');
  	let date = createdTime.getDate().toString().padStart(2, '0');
    // 트윗을 작성한 시각부터 현재까지의 시간을 계산하기 위해 날짜정보를 밀리초로 가져오는 getTime() 함수를 사용합시다.
    let toNow = now.getTime(); // 현재 날짜 정보를 밀리초로 바꿈
    let toCreated = createdTime.getTime(); // 작성한 날짜 정보를 밀리초로 바꿈
    let passedTime = toNow - toCreated; // 트윗을 작성한 시점부터 현재까지 흐른 시간(밀리초로 바꿈)
    let passedSec = Math.round(passedTime / 1000);
    let passedMin = Math.round(passedTime / (1000 * 60));
    let passedHour = Math.round(passedTime / (1000 * 60 * 60));
    let passedDay = Math.round(passedTime / (1000 * 60 * 60 * 24));
    // 화면에 표시할 기준을 잡아봅시다.
    // 1분 미만이면 '방금'
    // 1분 이상 1시간 미만이면 `${min}분 전`
    // 1시간 이상 1일 미만이면 `${hour}시간 전`
    // 1일 이상일 경우 `${yyyy}.${mm}.${dd}` 으로 표시해줍시다.
    if (passedDay > 0) {
        return `${year}.${month}.${date}`;
    } else if (passedHour > 0) {
        return `${passedHour}시간 전`;
    } else if (passedMin > 0) {
        return `${passedMin}분 전`;
    } else {
        return '방금';
    }
}

// ----------------------------------------기존의 트윗을 보여줍니다.----------------------
function printTweets() {
    DATA.forEach(printTweet);
}
function printTweet(DATA) {
    let tweetElement = makeTweetElement(DATA);
    readingArea.prepend(tweetElement);
}
function makeTweetElement(DATA) {
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
    timeElement.textContent = createdTimeToFormatted(DATA.created_at);
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
    printTweet(DATA[DATA.length - 1]);
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
        let tweetList = DATA.filter(function (tweet) {
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