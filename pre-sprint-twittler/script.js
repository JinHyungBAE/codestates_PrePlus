/* [엘리먼트 변수] */
const inputNewTweet = document.querySelector('#newTweetSection');
const btnNewTweet = document.querySelector('.btn-register');
const userName = document.querySelector('#username');
const newTweetContent = document.querySelector('#newTweetContent');
const refresh = document.querySelector('.refresh');
const readingArea = document.querySelector('#tweets');
const searchInput = document.querySelector('#search'); // 검색창
const resultMessage = document.querySelector('.resultMessage'); //검색결과 없을 시 안내 메시지

/* 이벤트 핸들링 */
// [Tweet 버튼 클릭 이벤트 >> 새로운 트윗 등록]
btnNewTweet.addEventListener('click', function (event) {
    makeNewTweetElement(); // 새로운 트윗을 li로 만들어주자
    userArray.push(DATA[DATA.length-1].user);
    messageArray.push(DATA[DATA.length-1].message);
    created_atArray.push(DATA[DATA.length-1].created_at);
})
// [유저네임 클릭 이벤트 >> 필터링 함수] ----트윗을 필터링할거에요! 클릭한 트윗 주인의 탐라를 보여주세요!----
readingArea.addEventListener('click', function (event) {
    const target = event.target;
    console.log(target.classList[0]);

    if (target.classList[0] === 'username') {
        // printTweets을 실행하되, target.textContent가 DATA.user === target.textContent
        let tweetList = DATA.filter(function (tweet) {
            return tweet.user === target.textContent;
        });
        console.log(tweetList)

        removeTweets();
        tweetList.forEach(printTweet);
    }
});
// [refresh 버튼 클릭이벤트 핸들링] --------다시 전체 트윗을 보여주세요!!---------
refresh.addEventListener('click', function (event) {
    removeTweets();
    DATA.forEach(printTweet);
    resultMessage.classList.add('hidden');
});

// [ASIDE 영역에 있는 검색창에 입력한 값과 일치(일부일치)하는 유저의 트윗만 보여주는 함수]
// ----------------[검색창으로 필터 구현]----------------------
searchInput.addEventListener('keyup', function (event) {
    const target = event.target;
    console.log(typeof target.value);
    console.log(event.code);

    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        let searchResult = DATA.filter(function (tweet) {
            let userToUpperCase = tweet.user.toUpperCase();
            let searchValueToUpperCase = target.value.toUpperCase();
            return userToUpperCase.includes(searchValueToUpperCase);
        })
        if (searchResult.length !== 0) {
            removeTweets();
            searchResult.forEach(printTweet);
            resultMessage.classList.add('hidden');
        } else {
            resultMessage.classList.remove('hidden');
        }
        target.value = '';
    }
});

/* [함수] 모음 */
// [타임스탬프 포맷 함수]
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

// [새로운 트윗 생성 함수]
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
    newTweet.created_at = createdTimeToFormatted();
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

// [화면의 트윗을 모두 지워주는 함수]
function removeTweets() {
    while (readingArea.firstChild) {
        readingArea.removeChild(readingArea.firstChild);
    }
}

// [화면에 DATA의 모든 트윗들을 뿌려주는 함수]
function printTweets() {
    DATA.forEach(printTweet);
}

// [화면에 트윗 한개를 프린트하는 함수]
function printTweet(DATA) {
    let tweetElement = makeTweetElement(DATA);
    readingArea.prepend(tweetElement);
}

// [DATA 배열 내의 객체의 정보를 받아와 html 엘리먼트로 만들어주는 함수]
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

// [textarea 높이 자동조절 함수]
function resize(obj) {
    obj.style.height = '1px';
    obj.style.height = (12 + obj.scrollHeight) + 'px';
}

//함수 실행.
printTweets();


// TODO:::::: 완성하지 못한 기능들

// [검색창 onfocus 이벤트]
searchInput.addEventListener('onfocus', function (event) {
    const target = event.target;
    console.log(target)
})

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

// 안됨... 왜???
// newTweetContent.addEventListener('keyup', function (event) {
//     const target = event.target;
//     target.style.height = '1px';
//     target.style.height = (12 + obj.scrollHeight) + 'px';
// })

// [엘리먼트와 이벤트 핸들러의 연결]
// btnNewTweet.onclick = makeNewTweetElement;
// 이것도 안됨... 왜???
// newTweetContent.keydown = resize(target);
// newTweetContent.keyup = resize(target);

// DATA는 이미 작성된 트윗을 표시합니다.
console.log(DATA)

// generateNewTweet을 호출할 때마다 새로운 트윗을 생성합니다.
console.log(generateNewTweet());
