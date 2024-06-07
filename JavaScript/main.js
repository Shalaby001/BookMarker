var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var addBtn = document.getElementById('addbtn');
var userBookmarks = document.getElementById('userBookmarks');
var validCard = document.getElementById('validCard');
var closeValidCardBtn = document.getElementById('closeValidCard');


var Sites = JSON.parse(localStorage.getItem('Sites'));


displaybookmark();


siteName.addEventListener('input', function () {
    if (siteName.value.trim() === '') {
        siteName.classList.add('is-invalid');
    } else {
        siteName.classList.remove('is-invalid');
    }
});


siteUrl.addEventListener('input', function () {
    if (!validateUrl(siteUrl.value)) {
        siteUrl.classList.add('is-invalid');
    } else {
        siteUrl.classList.remove('is-invalid');
    }
});

function saveBookmark(e) {
    e.preventDefault();
    var site = {
        Sname: siteName.value,
        SUrl: siteUrl.value
    };

    if (!validateUrl(site.SUrl)) {
        validCard.classList.replace('d-none', 'd-flex');
        return;
    }

    if (siteName.value.trim() === '') {
        siteName.classList.add('is-invalid');
        return;
    }

    validCard.classList.replace('d-flex', 'd-none');

    Sites.push(site);

    displaybookmark();
    clearInput();


    localStorage.setItem('Sites', JSON.stringify(Sites));
}

function validateUrl(url) {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    return !!urlPattern.test(url);
}

function displaybookmark() {
    var cartona = '';
    for (var i = 0; i < Sites.length; i++) {
        cartona += `<tr>
            <td>${i + 1}</td>
            <td>${Sites[i].Sname}</td>
            <td><a class="btn btn-outline-primary" target="_blank" href="${Sites[i].SUrl}"><i class="fas fa-eye"></i> Visit</a></td>
            <td><a onclick="deleteBookmark(${i})" class="btn btn-outline-danger" href="#"><i class="fas fa-trash-alt"></i> Delete</a></td>
        </tr>`;
    }
    userBookmarks.innerHTML = cartona;
}

addBtn.addEventListener('click', saveBookmark);

function clearInput() {
    siteName.value = '';
    siteUrl.value = '';
    siteName.classList.remove('is-invalid');
    siteUrl.classList.remove('is-invalid');
}

function deleteBookmark(id) {
    Sites.splice(id, 1);
    displaybookmark();
    localStorage.setItem('Sites', JSON.stringify(Sites));
}

closeValidCardBtn.addEventListener('click', function () {
    validCard.classList.replace('d-flex', 'd-none');
});

validCard.addEventListener('click', function (event) {
    if (event.target === validCard) {
        validCard.classList.replace('d-flex', 'd-none');
    }
});
