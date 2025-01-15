const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data  = await res.json();
    // console.log(data.data);
    // also do the same thing with.......
    const phones = data.data
    // console.log(phone)
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) =>{
    // console.log(phones);
    // 1. find the class/ID where we want to set the create element 
    const phoneContainer = document.getElementById('phone-container');

    // clear phone container cards before new card/search result add
    phoneContainer.textContent = '';

    // display (Show All Phones) button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // console.log('is show all', isShowAll);
    // display only first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-slate-300 p-2 shadow-xl`;
        // 3. set innerHTML
        phoneCard.innerHTML = `
        <figure>
                <img src="${phone.image}"
                    alt="Phones" />
        </figure>
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p class="my-3">This is the image of this phone. Click show details for get the important information about the phone.</p>
                    <div class="card-actions justify-center">
                        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                    </div>
                </div>   
        `;
        // append child
        phoneContainer.appendChild(phoneCard);
    })
    // remove loading spinner
    toggleLoadingSpinner(false);
}

// handle show details button

const handleShowDetails = async(id)=>{
    // console.log('it is for testing show details button', id);
    // load individual data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;

    showPhoneDetails(phone);
}

const showPhoneDetails =(phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <div class="flex justify-center items-center my-5"> <img src="${phone.image}" alt="" /> </div>
        <p class="text-xl my-2"><span class="font-bold">Storage: </span> ${phone?.mainFeatures?.storage}</p>
        <p class="text-xl my-2"><span class="font-bold">Display Size: :</span> ${phone?.mainFeatures?.displaySize || 'No display size available'}</p>
        <p class="text-xl my-2"><span class="font-bold">GPS: </span> ${phone?.others?.GPS || 'No GPS Available'}</p>
        <p class="text-xl my-2"><span class="font-bold">Release Date: :</span> ${phone?.releaseDate || 'No release date available'}</p>
    `
    // show the modal
    show_deatils_modal.showModal();

}

// handle seaerch button 
const handleSearch =(isShowAll)=>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('serach-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading)=>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all button
const handleShowAll =()=>{
    handleSearch(true);
}

// loadPhone();