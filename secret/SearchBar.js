## Case24 : Search bar
Q. 검색 리스트를 드랍다운 메뉴로 표기하고, 메뉴를 선택하면 선택한 이미지를 화면에 표기합니다.


### 기능 요구사항
1. 이미지 API : https://unsplash.com/documentation#search-photos
2. debounce : https://lodash.com/docs/4.17.15#debounce

### 문제
q1. 문제 상황에 대하여 javaScript로 동작을 구현시킬 수 있는 코드를 작성해보세요
1. 검색 이미지 리스트 가져오기
2. 하나의 이미지 정보만 가져오기
3. 검색 드랍다운 표기
4. 검색 드랍다운 리스트 표기
5. 선택한 이미지 정보 표기

q2. 문제 상황에 대하여 jQuery로 동작을 구현시킬 수 있는 코드를 작성해보세요
1. JavaScript로 짠 코드를 jQuery로 전환
2. Data 속성 활용


### 주요 학습 키워드
- 검색어 입력에 따른 API 호출을 제어하는 방법을 학습하게 됩니다.
- axios 라이브러리와 async, await를 이용한 API호출
- lodash 라이브러리의 debounce()를 사용하여 불필요한 호출 줄이기
- 반복문을 통해 createElement, innerHTML, appendChild를 사용하여 리스트 표기
- jQuery의 data- 속성 활용

### 문제 풀이
```javascript
// unsplash : https://unsplash.com/documentation#search-photos
// debounce : https://lodash.com/docs/4.17.15#debounce
const accessKey = "hPyF-tz9tHnxeaoTwb7q0GTw10Wxwr85cD63lk7d7UE";
const $input = $('input');
const $dropdownMenu = $('.dropdown-menu');
const $imageInfo = $('.image-info');

const fetchImages = async search => {
    const res = await axios.get('https://api.unsplash.com/search/photos/', {
        params: {
            client_id: accessKey,
            query: search
        }
    });
    return res.data.results;
};
const fetchImage = async id => {
    const res = await axios.get(`https://api.unsplash.com/photos/${id}`, {
        params: {
            client_id: accessKey,
        }
    });

    return res.data;
}

/*
const onSearch = async e => {
    const images = await fetchImages(e.target.value);
    if(!images.length) {
        $dropdownMenu.removeClass('show');
        return;
    }
    $dropdownMenu.addClass('show');
    $dropdownMenu.empty();
    listTemplate(images);
}

const listTemplate = (images) => {
    $.each(images, (index, image) => {

        const {id, alt_description, urls} = image;
        const $li = $(`<li class="dropdown-item"><img src="${urls.regular}" alt="${alt_description}"><span>${alt_description}</span></li>`);
        $dropdownMenu.append($li);

        $li.on('click', async () => {
            $dropdownMenu.removeClass('show');
            $input.val(alt_description);
            imageTemplate(await fetchImage(id));
        })
    })
}

const imageTemplate = (image) => {
    const {urls, alt_description} = image;
    $imageInfo.attr('src', urls.regular);
    $imageInfo.attr('alt', alt_description);
}

$input.on('input', _.debounce(onSearch, 600));
*/



// data 속성 활용
/*
const listTemplate = (images) => {
    $.each(images, (index, image) => {
        const {id, alt_description, urls} = image;
        const $li = $(`<li class="dropdown-item" data-image='${JSON.stringify({id, alt_description})}'><img src="${urls.regular}" alt="${alt_description}"><span>${alt_description}</span></li>`);
        $dropdownMenu.append($li);
    })
}

$(document).on('click', '.dropdown-item', async function() {
    const image = $(this).data('image');
    const {id, alt_description} = image;
    $dropdownMenu.removeClass('show');
    $input.val(alt_description);
    imageTemplate(await fetchImage(id));
})
*/
```
