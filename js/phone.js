const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data  = await res.json();
    // console.log(data.data);
    // also do the same thing with.......
    const phones = data.data
    // console.log(phone)
    displayPhones(phones);
}

const displayPhones = phones =>{
    // console.log(phones);
    // 1. find the class/ID where we want to set the create element 
    const phoneContainer = document.getElementById('phone-container');

    // clear phone container cards before new card/search result add
    phoneContainer.textContent = '';

    // display (Show All Phones) button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // display only first 12 phones
    phones = phones.slice(0,12);
    phones.forEach(phone => {
        console.log(phone);
        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-slate-300 p-4 shadow-xl`;
        // 3. set innerHTML
        phoneCard.innerHTML = `
        <figure>
                <img src="${phone.image}"
                    alt="Phones" />
        </figure>
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>${phone.slug}</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>   
        `;
        // append child
        phoneContainer.appendChild(phoneCard);
    })
}

// handle seaerch button 
const handleSearch =()=>{
    const searchField = document.getElementById('serach-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}

// loadPhone();