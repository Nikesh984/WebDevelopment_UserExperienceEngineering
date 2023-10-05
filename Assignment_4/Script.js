var missRadio = document.getElementById("miss");
var mrRadio = document.getElementById("mr");
var mrsRadio = document.getElementById("mrs");
var spans = document.getElementsByClassName("validation-message");
var titleSpan = document.getElementById("titleSpan");
var submitBtn = document.getElementById("submit");
var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var firstNameSpan = document.getElementById("firstNameSpan");
var lastNameSpan = document.getElementById("lastNameSpan");
var email = document.getElementById("emailId");
var emailIDSpan = document.getElementById("emailIDSpan");
var phoneNumber = document.getElementById("phoneNumber");
var phoneNumberSpan = document.getElementById("phoneNumberSpan");
var streetAddress1 = document.getElementById("streetAddress1");
var zipcode = document.getElementById("zipcode");
var comments = document.getElementById("comments");
var streetAddress1Span = document.getElementById("streetAddress1Span");
var zipcodeSpan = document.getElementById("zipcodeSpan");
var commentsSpan = document.getElementById("commentsSpan");
var facebookChckBox = document.getElementById("facebook");
var googleChckBox = document.getElementById("google");
var yelpChckBox = document.getElementById("yelp");
var sourceSpan = document.getElementById("sourceSpan");
var rating = document.getElementById("rating");
var review = document.getElementById("review");
var additionalReview = document.getElementById("additionalReview");
var yesChckBox = document.getElementById("yes");
var ratingSpan = document.getElementById("ratingSpan");
var city = document.getElementById("city");
var citySpan = document.getElementById("citySpan");
var state = document.getElementById("state");
var stateSpan = document.getElementById("stateSpan");
var streetAddress2 = document.getElementById("streetAddress2");

missRadio.addEventListener('change', validateFields);
mrRadio.addEventListener('change',validateFields);
mrsRadio.addEventListener('change', validateFields);
firstName.addEventListener('input', validateFields);
lastName.addEventListener('input', validateFields);
email.addEventListener('input', validateFields);
phoneNumber.addEventListener('input', validateFields);
streetAddress1.addEventListener('input', validateFields);
zipcode.addEventListener('input', validateFields);
comments.addEventListener('input', validateFields);
facebookChckBox.addEventListener('change', validateFields);
googleChckBox.addEventListener('change', validateFields);
yelpChckBox.addEventListener('change', validateFields);
city.addEventListener('input', validateFields);
state.addEventListener('input', validateFields);
rating.addEventListener('change', displayRemainingFields);
yesChckBox.addEventListener('change', displayRemainingFields);


const regExEmail = /^[a-zA-Z.]+@([a-z]+\.)?northeastern\.edu$/;
const regExPhone = /\d{3}-?\d{3}-\d{4}$/;
const regExZipcode = /^[0-9]{5}$/;
const regExName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

function onLoad(){
    
    for(var i=0; i<spans.length;i++)
    {
        spans[i].style.display = '';
    }

    // document.getElementById("review").style.display = 'none';
    review.style.display = 'none';
    additionalReview.style.display = 'none';

    // for(var i=0; i<yesNoCheckbox.length; i++){
    //     yesNoCheckbox[i].style.display = 'none';
    // }
    yesChckBox.style.display = 'none';

    submitBtn.disabled = true;


}

onLoad();

function validateFields(){
    //RadioButton Validation
    if(!missRadio.checked && !mrRadio.checked && !mrsRadio.checked){
        titleSpan.style.display = '';
    }
    else{
        titleSpan.style.display = 'none';
    }

    //FirstName Validation
    if(firstName.value != null && firstName.value.length >2 && firstName.value.match(regExName)){
        firstNameSpan.style.display = 'none';
    }
    else{
        firstNameSpan.style.display = '';
    }

    //LastName Validation
    if(lastName.value != null && lastName.value.length > 2 && lastName.value.match(regExName)){
        lastNameSpan.style.display = 'none';
    }
    else{
        lastNameSpan.style.display = '';
    }

    //Email Validation
    if(email.value.match(regExEmail)){
        emailIDSpan.style.display = 'none';
    }
    else emailIDSpan.style.display = '';

    //PhoneNumber Validation
    if(phoneNumber.value.match(regExPhone)) 
        phoneNumberSpan.style.display = 'none';
    else phoneNumberSpan.style.display = '';

    //StreetAddress1 Validation
    if(streetAddress1.value !=null && streetAddress1.value.length > 6)
        streetAddress1Span.style.display = 'none';
    else streetAddress1Span.style.display = '';

    //City Validation
    if(city.value !=null && city.value.length >4)
        citySpan.style.display = 'none';
    else citySpan.style.display = '';

    //State Validation
    if(state.value != null && state.value.length >1 )
        stateSpan.style.display = 'none';
    else stateSpan.style.display = '';

    //ZipCode Validation
    if(zipcode.value.match(regExZipcode))
        zipcodeSpan.style.display = 'none';
    else {
        zipcodeSpan.style.display = '';
    }

    //Comments Validation
    if(comments.value !=null && comments.value.length >8)
        commentsSpan.style.display = 'none';
    else commentsSpan.style.display = '';

    //CheckBox Validation
    if(facebookChckBox.checked || googleChckBox.checked || yelpChckBox.checked)
        sourceSpan.style.display = 'none';
    else sourceSpan.style.display = '';

    enableSubmitButton();

}

function displayRemainingFields(){
    var ratingValue = rating.value;

    if(ratingValue!=''){
        ratingSpan.style.display = 'none';
        review.style.display = '';
        yesChckBox.style.display = '';
        if(yesChckBox.checked)
            additionalReview.style.display = '';
        else
           additionalReview.style.display = 'none';
    }
    else{
        ratingSpan.style.display = '';
        review.style.display = 'none';
        yesChckBox.style.display = 'none';
    }

    enableSubmitButton();
}

function enableSubmitButton(){
    var count = 0;
    for(var i=0; i<spans.length; i++){
        if(spans[i].style.display == 'none')
        count++;
    }
    if(count == spans.length)
        submitBtn.disabled = false;
    else
        submitBtn.disabled = true;
}

function getTitle(){
    if(missRadio.checked)
        return missRadio.value;
    else if(mrRadio.checked)
        return mrRadio.value;
    else return mrsRadio;
}

function populateTable(event){
    event.preventDefault();

    var title = getTitle();
    var name = title+firstName.value +' '+lastName.value;
    var emailID = email.value;
    var phone = phoneNumber.value;
    var address1 = streetAddress1.value;
    var address2 = streetAddress2.value;
    var cityName = city.value;
    var stateName = state.value;
    var ZipCode = zipcode.value;
    var Comments = comments.value;
    var Rating = rating.value;
    var AdditionalReview = additionalReview.value;

    var table = document.getElementById("myTable");

    var trNode = document.createElement('tr');

    var tdName = document.createElement('td');
    tdName.innerHTML = name;
    
    var tdEmail = document.createElement('td');
    tdEmail.innerHTML = emailID;

    var tdPhone = document.createElement('td');
    tdPhone.innerHTML = phone;

    var tdAddress1 = document.createElement('td');
    tdAddress1.innerHTML = address1;

    var tdAddress2 = document.createElement('td');
    tdAddress2.innerHTML = address2;

    var tdCity = document.createElement('td');
    tdCity.innerHTML = cityName;

    var tdState = document.createElement('td');
    tdState.innerHTML = stateName;

    var tdZipCode = document.createElement('td');
    tdZipCode.innerHTML = ZipCode;

    var tdComments = document.createElement('td');
    tdComments.innerHTML = Comments;

    var tdRating = document.createElement('td');
    tdRating.innerHTML = Rating;

    var tdAdditionalReview = document.createElement('td');
    tdAdditionalReview.innerHTML = AdditionalReview;

    trNode.appendChild(tdName);
    trNode.appendChild(tdEmail);
    trNode.appendChild(tdPhone);
    trNode.appendChild(tdAddress1);
    trNode.appendChild(tdAddress2);
    trNode.appendChild(tdCity);
    trNode.appendChild(tdState);
    trNode.appendChild(tdZipCode);
    trNode.appendChild(tdComments);
    trNode.appendChild(tdRating);
    trNode.appendChild(tdAdditionalReview);

    table.appendChild(trNode);
    onLoad();
    resetForm();
}

function resetForm(){
    missRadio.checked = false;
    mrRadio.checked = false;
    mrsRadio.checked = false;
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    phoneNumber.value = '';
    streetAddress1.value = '';
    streetAddress2.value = '';
    city.value = '';
    state.value = '';
    zipcode.value = '';
    facebookChckBox.checked = false;
    googleChckBox.checked = false;
    yelpChckBox.checked = false;
    comments.value = '';
    rating.value = '';
    yesChckBox.checked = false;
    additionalReview.value = ''; 
}











